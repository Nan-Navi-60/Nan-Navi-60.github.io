'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const RAG_QUERY_URL = process.env.NEXT_PUBLIC_RAG_API_URL
  ? `${process.env.NEXT_PUBLIC_RAG_API_URL}/api/v1/rag/query`
  : '/api/v1/rag/query';

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 포트폴리오에 대해 궁금한 점을 물어보세요 😊',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(RAG_QUERY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

      const data = await res.json();
      const answer = data.answer ?? data.response ?? data.result ?? '응답을 받지 못했습니다.';

      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '죄송합니다. 응답을 가져오는 중 오류가 발생했습니다.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-window">
      {/* 헤더 */}
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">AI</div>
          <div>
            <p className="chat-header-title">포트폴리오 도우미</p>
            <p className="chat-header-sub">무엇이든 물어보세요</p>
          </div>
        </div>
        <button onClick={onClose} className="chat-close-btn" aria-label="채팅 닫기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* 메시지 영역 */}
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="chat-typing">
            <span /><span /><span />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 입력 영역 */}
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          rows={1}
          disabled={loading}
        />
        <button
          className="chat-send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          aria-label="전송"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
