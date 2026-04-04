'use client';

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

const RAG_QUERY_URL = process.env.NEXT_PUBLIC_RAG_API_URL
  ? `${process.env.NEXT_PUBLIC_RAG_API_URL}/api/v1/rag/query`
  : '/api/v1/rag/query';

const SUGGESTIONS = [
  '어떤 프로젝트를 진행했나요?',
  '사용할 수 있는 기술 스택은?',
  '연락은 어떻게 하나요?',
];

export default function ChatPageClient() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (!loading && lastMsg.role === 'assistant') {
        const el = document.getElementById(`chat-msg-${messages.length - 1}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // textarea 높이 자동 조절
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [input]);

  const sendMessage = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(RAG_QUERY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

      const result = await res.json();
      const answer = result.data?.answer ?? '응답을 받지 못했습니다.';
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
    } catch {
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

  const isEmpty = messages.length === 0;

  return (
    <div className="cp-root">
      {/* 사이드 패널 */}
      <aside className="cp-sidebar">
        <div className="cp-sidebar-brand">
          <div className="cp-sidebar-avatar">AI</div>
          <div>
            <p className="cp-sidebar-title">포트폴리오 도우미</p>
            <p className="cp-sidebar-sub">이강산의 AI 어시스턴트</p>
          </div>
        </div>

        <div className="cp-sidebar-divider" />

        <p className="cp-sidebar-label">추천 질문</p>
        <div className="cp-suggestions">
          {SUGGESTIONS.map((s) => (
            <button key={s} className="cp-suggestion-btn" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>

        <div className="cp-sidebar-divider" />

        <p className="cp-sidebar-label">안내</p>
        <p className="cp-sidebar-desc">
          포트폴리오, 프로젝트, 기술 스택 등 궁금한 점을 자유롭게 물어보세요.
        </p>
      </aside>

      {/* 메인 채팅 영역 */}
      <main className="cp-main">
        {/* 메시지 영역 */}
        <div className="cp-messages">
          {isEmpty ? (
            <div className="cp-empty">
              <div className="cp-empty-avatar">AI</div>
              <p className="cp-empty-title">안녕하세요 👋</p>
              <p className="cp-empty-desc">
                포트폴리오에 대해 궁금한 점을 물어보세요.<br />
                왼쪽 추천 질문을 눌러도 됩니다.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} id={`chat-msg-${i}`}>
                <ChatMessage role={msg.role} content={msg.content} />
              </div>
            ))
          )}
          {loading && (
            <div className="chat-typing">
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 입력 영역 */}
        <div className="cp-input-wrap">
          <div className="cp-input-box">
            <textarea
              ref={textareaRef}
              className="cp-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
              rows={1}
              disabled={loading}
            />
            <button
              className="cp-send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="전송"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="cp-input-hint">Enter로 전송 · Shift+Enter로 줄바꿈</p>
        </div>
      </main>
    </div>
  );
}
