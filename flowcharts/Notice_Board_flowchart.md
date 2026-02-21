# Notice Board 프로젝트 플로우차트

## 전체 시스템 아키텍처

```mermaid
graph TB
    User[사용자] --> JSP[JSP Pages]
    
    subgraph "Servlet Layer"
        JSP --> LoginServlet[Login Servlet]
        JSP --> SignupServlet[Signup Servlet]
        JSP --> CreatePostServlet[CreatePost Servlet]
        JSP --> ContentListServlet[ContentList Servlet]
        JSP --> ContentDetailServlet[ContentDetail Servlet]
        JSP --> CommentServlet[Comment Servlets]
        JSP --> UpdateServlet[Update Servlets]
        JSP --> DeleteServlet[Delete Servlets]
    end
    
    subgraph "Data Layer"
        LoginServlet --> ProfileDAO[Profile DAO]
        SignupServlet --> ProfileDAO
        CreatePostServlet --> ProfileDAO
        ContentListServlet --> ProfileDAO
        ContentDetailServlet --> ProfileDAO
        CommentServlet --> ProfileDAO
        
        ProfileDAO --> DB[(Database)]
    end
    
    subgraph "File Storage"
        CreatePostServlet --> Upload[Upload Directory]
        UpdateServlet --> Upload
    end
    
    subgraph "기술 스택"
        Tech1[Java Servlet]
        Tech2[JSP]
        Tech3[JDBC]
        Tech4[MultipartRequest]
    end
```

## 사용자 인증 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant JSP as JSP Page
    participant Servlet as Login Servlet
    participant DAO as Profile DAO
    participant DB as Database
    
    User->>JSP: 로그인 정보 입력
    JSP->>Servlet: ID/PW 전송
    Servlet->>DAO: 인증 요청
    DAO->>DB: SELECT 쿼리
    DB-->>DAO: 사용자 정보
    DAO-->>Servlet: 인증 결과
    
    alt 로그인 성공
        Servlet->>Servlet: 세션 생성
        Servlet-->>JSP: index.jsp 이동
    else 비밀번호 오류
        Servlet-->>JSP: 에러 코드 -1
    else 아이디 없음
        Servlet-->>JSP: 에러 코드 -2
    end
```

## 게시글 작성 플로우

```mermaid
graph TB
    A[게시글 작성 시작] --> B[MultipartRequest 처리]
    B --> C{이미지 첨부?}
    
    C -->|Yes| D[이미지 업로드]
    C -->|No| E[기본 이미지 설정]
    
    D --> F[파일명 저장]
    E --> F
    
    F --> G[게시글 정보 수집]
    G --> H[profile_id]
    G --> I[title]
    G --> J[category]
    G --> K[content]
    G --> L[contents_img]
    
    H --> M[DB INSERT]
    I --> M
    J --> M
    K --> M
    L --> M
    
    M --> N{성공?}
    N -->|Yes| O[작성 완료]
    N -->|No| P[에러 처리]
    
    style M fill:#f9f,stroke:#333
```

## 게시글 목록 조회 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Servlet as ContentList Servlet
    participant DAO as Profile DAO
    participant DB as Database
    
    User->>Servlet: 카테고리 선택
    Servlet->>DAO: 전체 게시글 수 조회
    DAO->>DB: COUNT 쿼리
    DB-->>DAO: 게시글 수
    DAO-->>Servlet: lastId 반환
    
    Servlet->>Servlet: 페이지 번호 계산
    Servlet->>DAO: 페이지별 목록 요청
    DAO->>DB: SELECT with LIMIT
    DB-->>DAO: 게시글 목록
    DAO-->>Servlet: ArrayList 반환
    Servlet-->>User: list.jsp 표시
```

## 댓글 관리 플로우

```mermaid
graph LR
    A[댓글 작성] --> B[editComment Servlet]
    B --> C[DB INSERT]
    C --> D[작성 완료]
    
    E[댓글 조회] --> F[getComment Servlet]
    F --> G[boardId로 조회]
    G --> H[댓글 목록 반환]
    
    I[댓글 수정] --> J[updateComment Servlet]
    J --> K[commentId로 UPDATE]
    K --> L[수정 완료]
    
    M[댓글 삭제] --> N[deleteComment Servlet]
    N --> O[commentId로 DELETE]
    O --> P[삭제 완료]
    
    style C fill:#bbf,stroke:#333
    style K fill:#bbf,stroke:#333
    style O fill:#f96,stroke:#333
```

## 게시글 수정/삭제 플로우

```mermaid
graph TB
    A[게시글 수정] --> B[updatePost Servlet]
    B --> C[기존 게시글 조회]
    C --> D{이미지 변경?}
    
    D -->|Yes| E[기존 이미지 삭제]
    D -->|No| F[내용만 수정]
    
    E --> G[새 이미지 업로드]
    G --> H[DB UPDATE]
    F --> H
    
    I[게시글 삭제] --> J[deleteContent Servlet]
    J --> K[게시글 정보 조회]
    K --> L[첨부 이미지 삭제]
    L --> M[DB DELETE]
    M --> N[삭제 완료]
    
    style H fill:#9f9,stroke:#333
    style M fill:#f96,stroke:#333
```

## 주요 기능
- Java Servlet 기반 게시판
- JSP를 활용한 뷰 렌더링
- JDBC 직접 연결 방식
- MultipartRequest를 통한 파일 업로드
- 카테고리별 게시글 분류
- 페이지네이션 (5개씩)
- 댓글 CRUD 기능
- 세션 기반 사용자 인증
- 이미지 업로드 및 관리
