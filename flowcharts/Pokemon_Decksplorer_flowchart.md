# Pokemon Decksplorer 프로젝트 플로우차트

## 전체 시스템 아키텍처

```mermaid
graph TB
    User[사용자] --> WebUI[Thymeleaf UI]
    
    subgraph "Spring Boot Backend"
        WebUI --> MainCtrl[Main Controller]
        WebUI --> UserCtrl[User Controller]
        WebUI --> BoardCtrl[Board Controller]
        WebUI --> CardCtrl[Card Controller]
        WebUI --> CommentCtrl[Comment Controller]
        
        UserCtrl --> UserService[User Service]
        BoardCtrl --> BoardService[Board Service]
        CardCtrl --> CardService[Card Service]
        CommentCtrl --> CommentService[Comment Service]
        
        UserService --> UserMapper[User Mapper]
        BoardService --> BoardMapper[Board Mapper]
        CardService --> CardMapper[Card Mapper]
        CommentService --> CommentMapper[Comment Mapper]
        
        UserMapper --> DB[(Database)]
        BoardMapper --> DB
        CardMapper --> DB
        CommentMapper --> DB
    end
    
    subgraph "인증 시스템"
        UserCtrl --> JWT[JWT Util]
        JWT --> Cookie[Cookie 관리]
    end
    
    subgraph "기술 스택"
        Tech1[Spring Boot]
        Tech2[MyBatis]
        Tech3[JWT]
        Tech4[Thymeleaf]
        Tech5[Gradle]
    end
```

## JWT 인증 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Ctrl as User Controller
    participant Service as User Service
    participant JWT as JWT Util
    participant DB as Database
    
    User->>Ctrl: 로그인 요청
    Ctrl->>Service: ID/PW 검증
    Service->>DB: 사용자 조회
    DB-->>Service: 사용자 정보
    Service-->>Ctrl: 인증 성공
    
    Ctrl->>JWT: JWT 토큰 생성
    JWT-->>Ctrl: 토큰 반환
    Ctrl->>JWT: 쿠키에 토큰 저장
    JWT-->>User: 로그인 완료
    
    User->>Ctrl: 인증 필요 요청
    Ctrl->>JWT: 쿠키에서 토큰 추출
    JWT->>JWT: 토큰 검증
    JWT->>JWT: userId 추출
    JWT-->>Ctrl: 인증 정보
    Ctrl-->>User: 요청 처리
```

## 카드 조회 플로우

```mermaid
graph LR
    A[카드 조회 요청] --> B[Card Controller]
    B --> C{카드 타입 선택}
    
    C --> D[포켓몬 카드]
    C --> E[트레이너 카드]
    C --> F[에너지 카드]
    
    D --> G[Card Service]
    E --> G
    F --> G
    
    G --> H[Card Mapper]
    H --> I[(Database)]
    I --> J[카드 목록 반환]
    
    style I fill:#bbf,stroke:#333
```

## 게시글 작성 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Board as Board Controller
    participant JWT as JWT Util
    participant Service as Board Service
    participant DB as Database
    
    User->>Board: 게시글 작성 요청
    Board->>JWT: 쿠키에서 토큰 확인
    
    alt 토큰 없음
        JWT-->>User: 인증 실패
    else 토큰 있음
        JWT->>JWT: userId 추출
        JWT-->>Board: 인증 성공
        
        Board->>Service: 게시글 등록
        Service->>DB: INSERT
        DB-->>User: 작성 완료
    end
```

## 좋아요 기능 플로우

```mermaid
graph TB
    A[좋아요 클릭] --> B[Board Controller]
    B --> C[JWT 토큰 확인]
    
    C --> D{인증 여부}
    D -->|미인증| E[좋아요 실패]
    D -->|인증| F[userId 추출]
    
    F --> G{좋아요 상태}
    G -->|추가| H[좋아요 INSERT]
    G -->|취소| I[좋아요 DELETE]
    
    H --> J[좋아요 수 증가]
    I --> K[좋아요 수 감소]
    
    J --> L[결과 반환]
    K --> L
    
    style H fill:#9f9,stroke:#333
    style I fill:#f96,stroke:#333
```

## 게시판 목록 조회 플로우

```mermaid
graph LR
    A[게시판 목록 요청] --> B[페이지 번호 전달]
    B --> C[Board Service]
    C --> D[Board Mapper]
    D --> E[(Database)]
    
    E --> F[게시글 목록 조회]
    F --> G[페이지네이션 적용]
    G --> H[목록 반환]
    
    I[전체 게시글 수] --> J[COUNT 쿼리]
    J --> E
    E --> K[총 개수 반환]
    
    style E fill:#bbf,stroke:#333
```

## 게시글 삭제 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Board as Board Controller
    participant JWT as JWT Util
    participant Service as Board Service
    participant DB as Database
    
    User->>Board: 게시글 삭제 요청
    Board->>JWT: 토큰에서 userId 추출
    JWT-->>Board: userId 반환
    
    Board->>Service: 삭제 요청 (userId, boardId)
    Service->>DB: 작성자 확인
    DB-->>Service: 작성자 정보
    
    alt 작성자 일치
        Service->>DB: DELETE
        DB-->>User: 삭제 완료
    else 작성자 불일치
        Service-->>User: 삭제 실패
    end
```

## 댓글 관리 플로우

```mermaid
graph TB
    A[댓글 작성] --> B[Comment Controller]
    B --> C[JWT 인증]
    C --> D[Comment Service]
    D --> E[(Database)]
    
    F[댓글 조회] --> G[게시글 ID로 조회]
    G --> D
    D --> H[댓글 목록 반환]
    
    I[댓글 수정] --> J[작성자 확인]
    J --> K[내용 업데이트]
    K --> E
    
    L[댓글 삭제] --> M[작성자 확인]
    M --> N[DELETE]
    N --> E
    
    style E fill:#f96,stroke:#333
```

## 주요 기능
- Spring Boot 기반 포켓몬 덱 공유 플랫폼
- JWT 기반 인증 시스템
- 쿠키를 통한 토큰 관리
- MyBatis를 활용한 데이터베이스 연동
- 포켓몬 카드 타입별 조회
- 게시글 CRUD 기능
- 좋아요 기능
- 댓글 시스템
- 페이지네이션
- Thymeleaf 템플릿 엔진
