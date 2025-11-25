import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '20px',
                    backgroundColor: '#f3f4f6'
                }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1f2937' }}>
                        エラーが発生しました
                    </h1>
                    <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                        アプリケーションの読み込み中にエラーが発生しました。
                    </p>
                    <details style={{ marginBottom: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '8px', maxWidth: '600px' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '8px' }}>
                            エラー詳細
                        </summary>
                        <pre style={{ fontSize: '12px', overflow: 'auto', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                            {this.state.error?.toString()}
                        </pre>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        ページを再読み込み
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
