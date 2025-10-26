import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  userAnswer: string;
  setUserAnswer: (value: string) => void;
  checkAnswer: () => void;
  isLoading: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

const AnswerForm = ({ userAnswer, setUserAnswer, checkAnswer, isLoading, inputRef }: Props) => (
  <div className="mt-8 flex items-center space-x-2">
    
    {/* 回答入力フィールド */}
    <TextField
      label="あなたの回答"
      variant="outlined"
      value={userAnswer}
      onChange={(e) => setUserAnswer(e.target.value)}
      disabled={isLoading}
      size="medium"
      className="min-w-[240px]"
      inputRef={inputRef}
      onKeyDown={(e) => {
        if (
          e.key === "Enter" &&
          !isLoading &&
          userAnswer.trim() !== ""
        ) {
          checkAnswer();
        }
      }}
    />

    {/* 送信ボタン */}
    <IconButton
      color="primary"
      onClick={checkAnswer}
      disabled={isLoading || !userAnswer}
      className="h-10 w-10 ml-1 mt-[7px] border border-[#1976d2] bg-[#f5faff] flex items-center justify-center"
    >
      <SendIcon className="text-[28px] align-middle" />
    </IconButton>
  </div>
);

export default AnswerForm;
