# 포트폴리오 사이트 (Nan-Navi-60)

## 개요
- **사이트명**: Nan-Navi-60 Portfolio
- **기술 스택**: Next.js 14, React, CSS (반응형), GitHub Actions, GitHub Pages
- **배포 방식**: GitHub Actions → 정적 빌드(output: 'export') → GitHub Pages

## 사이트 구조
- 메인 페이지 (`/`): 프로필, 기술 스택, 프로젝트 목록
- 프로젝트 상세 페이지 (`/projects/[id]`): 각 프로젝트 상세 설명
- 채팅 페이지 (`/chat`): AI 포트폴리오 도우미 전용 페이지

## AI 채팅 기능 구조

### 컴포넌트 구성
- `ChatButton.jsx`: 모든 페이지 우하단에 고정된 플로팅 버튼. 클릭 시 `/chat` 페이지로 이동 (Next.js Link)
- `ChatPageClient.jsx`: `/chat` 전용 풀페이지 채팅 UI (use client)
- `ChatMessage.jsx`: 말풍선 컴포넌트. role이 'user'면 오른쪽, 'assistant'면 왼쪽 정렬
- `ChatWindow.jsx`: 레거시 모달 방식 채팅창 (현재 미사용)

### ChatPageClient 동작 방식
- 좌측 사이드바: AI 아바타, 추천 질문 4개 버튼, 안내 텍스트
- 우측 메인: 메시지 영역 + 입력창
- 첫 진입 시 빈 화면에 웰컴 메시지 표시 (isEmpty 상태)
- 추천 질문 버튼 클릭 시 해당 텍스트로 바로 sendMessage 호출
- textarea 높이 자동 조절 (최대 120px)
- Enter 전송 / Shift+Enter 줄바꿈

### 추천 질문 목록
- '어떤 프로젝트를 진행했나요?'
- '사용할 수 있는 기술 스택은?'
- 'JicBak 프로젝트가 뭔가요?'
- '연락은 어떻게 하나요?'

### RAG API 연동
- 엔드포인트: `POST /api/v1/rag/query`
- 요청 body: `{ query: string }`
- 응답 파싱: `result.data?.answer`
- API URL: `NEXT_PUBLIC_RAG_API_URL` 환경변수 기반
  - 로컬: `.env` 파일 → `http://localhost:8080`
  - 배포: GitHub Variables `RAG_API_URL` → 실제 서버 주소

## 디자인 시스템
- 컬러: Navy `#28293e`, Orange `#ef6d58`, White
- 폰트: GMarketSans (CDN)
- 반응형: `clamp()` 함수 + 미디어 쿼리
  - PC: body width 70vw
  - 태블릿: 85vw
  - 모바일: 100vw
- 채팅 페이지 모바일: 사이드바가 상단 가로 스크롤 추천 질문 바로 전환

## 배포 파이프라인 (GitHub Actions)
1. main 브랜치 push 시 자동 실행
2. Node.js 20 환경에서 `npm install` + `npm run build`
3. `NEXT_PUBLIC_RAG_API_URL`은 GitHub Variables(`RAG_API_URL`)에서 빌드 시 주입
4. 빌드 결과물(`./out`) → GitHub Pages 배포
5. 배포 완료 후 RAG 문서 자동 업로드 (`flowcharts/*.md`, `docs/rag-chunks/*.md`)

## 환경변수 주의사항
- `.env` 파일은 `.gitignore`에 포함되어 배포 환경에 전달되지 않음
- 배포 시 반드시 GitHub 레포 Settings → Variables → `RAG_API_URL` 등록 필요
- 값이 없으면 채팅 API가 상대경로(`/api/v1/rag/query`)로 요청되어 GitHub Pages에서 실패
