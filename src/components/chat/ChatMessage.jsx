'use client';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`chat-msg-row ${isUser ? 'chat-msg-row--user' : 'chat-msg-row--assistant'}`}>
      {!isUser && <div className="chat-msg-avatar">AI</div>}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--assistant'}`}>
        {isUser ? (
          content
        ) : (
          <div className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
