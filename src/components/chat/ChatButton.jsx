'use client';

import Link from 'next/link';

export default function ChatButton() {
  return (
    <Link
      href="/chat"
      className="chat-float-btn"
      aria-label="포트폴리오 챗봇 열기"
      title="포트폴리오에 대해 물어보세요"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </Link>
  );
}
