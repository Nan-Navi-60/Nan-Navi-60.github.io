'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const RAG_QUERY_URL = process.env.NEXT_PUBLIC_RAG_API_URL
  ? `${process.env.NEXT_PUBLIC_RAG_API_URL}/api/v1/rag/query`
  : '/api/v1/rag/query';

export default function ProjectSummary({ projectName }) {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch(RAG_QUERY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: `${projectName} 프로젝트에 대해 3~4줄로 명확하게 핵심 기능과 성과 위주로 요약해줘.` }),
                });

                if (!res.ok) throw new Error(`서버 오류: ${res.status}`);

                const result = await res.json();
                const answer = result.data?.answer ?? '응답을 받지 못했습니다.';
                setSummary(answer);
            } catch (error) {
                setSummary('프로젝트 요약을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [projectName]);

    return (
        <div className="ai-summary-container">
            <div className="ai-summary-header">
                <span className="ai-summary-icon">✨</span>
                <span className="ai-summary-title">AI 프로젝트 요약</span>
            </div>
            <div className="ai-summary-content">
                {loading ? (
                    <div className="ai-loading">
                        <span className="ai-loading-text">AI가 프로젝트 내용을 요약하고 있습니다...</span>
                        <div className="chat-typing inline-typing">
                            <span /><span /><span />
                        </div>
                    </div>
                ) : (
                    <ReactMarkdown>{summary}</ReactMarkdown>
                )}
            </div>
        </div>
    );
}
