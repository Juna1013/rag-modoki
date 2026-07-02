/**
 * 記事Markdownをチャンク分割し、Gemini埋め込みAPIでベクトル化して
 * api/_data/embeddings.json に保存するスクリプト。
 *
 * 実行: npm run embed（.env の GEMINI_API_KEY を使用）
 * 記事（src/content/*.md）を更新したら再実行してコミットする。
 */
import fs from 'node:fs';
import path from 'node:path';
import { GoogleGenAI } from '@google/genai';

const EMBEDDING_MODEL = 'gemini-embedding-001';
const DIMENSIONS = 768;
const MIN_CHUNK_CHARS = 200;   // これ未満のチャンクは前のチャンクへ統合
const MAX_CHUNK_CHARS = 1600;  // これを超えるチャンクは段落単位で分割
const BATCH_SIZE = 20;

const CONTENT_DIR = path.resolve('src/content');
const OUTPUT_PATH = path.resolve('api/_data/embeddings.json');

const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY が設定されていません（.env を確認してください）');
  process.exit(1);
}

/** Markdownを見出し（##・###）単位のチャンクに分割する */
function chunkMarkdown(docId, markdown) {
  const lines = markdown.split('\n');
  let docTitle = docId;
  let h2 = '';
  let h3 = '';
  let inCodeFence = false;
  let buffer = [];
  const sections = [];

  const flush = () => {
    const text = buffer.join('\n').trim();
    buffer = [];
    if (!text) return;
    const heading = [h2, h3].filter(Boolean).join(' › ');
    sections.push({ heading, text });
  };

  for (const line of lines) {
    if (/^```/.test(line.trim())) inCodeFence = !inCodeFence;
    if (!inCodeFence) {
      const h1Match = line.match(/^# (.+)/);
      if (h1Match) {
        docTitle = h1Match[1].trim();
        continue;
      }
      const h2Match = line.match(/^## (.+)/);
      if (h2Match) {
        flush();
        h2 = h2Match[1].trim();
        h3 = '';
        continue;
      }
      const h3Match = line.match(/^### (.+)/);
      if (h3Match) {
        flush();
        h3 = h3Match[1].trim();
        continue;
      }
    }
    buffer.push(line);
  }
  flush();

  // 長すぎるセクションは段落単位で分割
  const sized = sections.flatMap(({ heading, text }) => {
    if (text.length <= MAX_CHUNK_CHARS) return [{ heading, text }];
    const paragraphs = text.split(/\n\n+/);
    const parts = [];
    let current = '';
    for (const p of paragraphs) {
      if (current && (current + '\n\n' + p).length > MAX_CHUNK_CHARS) {
        parts.push(current);
        current = p;
      } else {
        current = current ? current + '\n\n' + p : p;
      }
    }
    if (current) parts.push(current);
    return parts.map((part) => ({ heading, text: part }));
  });

  // 短すぎるセクションは直前のチャンクへ統合
  const merged = [];
  for (const section of sized) {
    const prev = merged[merged.length - 1];
    if (section.text.length < MIN_CHUNK_CHARS && prev && prev.heading.startsWith(section.heading.split(' › ')[0])) {
      prev.text += `\n\n### ${section.heading}\n${section.text}`;
    } else {
      merged.push({ ...section });
    }
  }

  return { docTitle, chunks: merged };
}

/** ベクトルをL2正規化する（768次元では正規化されずに返るため） */
function normalize(vector) {
  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  return vector.map((v) => Number((v / norm).toFixed(6)));
}

async function main() {
  const ai = new GoogleGenAI({ apiKey });

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const allChunks = [];
  for (const file of files) {
    const docId = path.basename(file, '.md');
    const markdown = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
    const { docTitle, chunks } = chunkMarkdown(docId, markdown);
    chunks.forEach((chunk, i) => {
      allChunks.push({
        id: `${docId}#${i}`,
        docId,
        docTitle,
        heading: chunk.heading,
        text: chunk.text,
      });
    });
    console.log(`${file}: ${chunks.length} チャンク`);
  }

  console.log(`合計 ${allChunks.length} チャンクをベクトル化します...`);

  const embeddings = [];
  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const response = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: batch.map((c) => `${c.docTitle} ${c.heading}\n${c.text}`),
      config: {
        taskType: 'RETRIEVAL_DOCUMENT',
        outputDimensionality: DIMENSIONS,
      },
    });
    embeddings.push(...response.embeddings.map((e) => normalize(e.values)));
    console.log(`  ${Math.min(i + BATCH_SIZE, allChunks.length)}/${allChunks.length}`);
  }

  const output = {
    model: EMBEDDING_MODEL,
    dimensions: DIMENSIONS,
    createdAt: new Date().toISOString(),
    chunks: allChunks.map((chunk, i) => ({ ...chunk, embedding: embeddings[i] })),
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output));
  const sizeKb = Math.round(fs.statSync(OUTPUT_PATH).size / 1024);
  console.log(`書き込み完了: ${OUTPUT_PATH} (${sizeKb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
