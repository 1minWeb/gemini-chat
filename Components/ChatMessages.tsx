import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import '../app/globals.css';

interface ChatMessagesProps {
    messages: any[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
    const [copied, setCopied] = React.useState<string | null>(null);

    const handleCopyClick = (code: string) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopied(code);
                setTimeout(() => setCopied(null), 2000); // Reset after 2 seconds
            })
            .catch(err => {
                alert('Failed to copy code: ' + err);
            });
    };

    const renderers = {
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            return !inline && match ? (
                <div className="code-block">
                    <pre className={className} {...props}>
                        <code>{codeString}</code>
                    </pre>
                    <button
                        className="copy-button"
                        onClick={() => handleCopyClick(codeString)}
                    >
                        <FontAwesomeIcon icon={copied === codeString ? faCheckDouble : faCopy} /> {copied === codeString ? 'Copied' : 'Copy'}
                    </button>
                </div>
            ) : (
                <code className={className} {...props}>{children}</code>
            );
        }
    };

    return (
        <div className="chat-messages" id="messages">
            {messages.length === 0 ? (
                <div>Please type your prompt below</div>
            ) : (
                messages.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={renderers}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatMessages;
