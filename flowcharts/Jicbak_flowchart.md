# Jicbak 프로젝트 플로우차트

## 전체 시스템 아키텍처

```mermaid
graph TB
    User[사용자] --> WebUI[JSP Web UI]
    
    subgraph "Spring Boot Backend"
        WebUI --> HomeCtrl[Home Controller]
        WebUI --> UserCtrl[User Controller]
        WebUI --> BoardCtrl[Board Controller]
        WebUI --> CommentCtrl[Comment Controller]
        
        UserCtrl --> UserService[User Service]
        BoardCtrl --> BoardService[Board Service]
        CommentCtrl --> CommentService[Comment Service]
        
        UserService --> UserMapper[User Mapper]
        BoardService --> BoardMapper[Board Mapper]
        CommentService --> CommentMapper[Comment Mapper]
        
        UserMapper --> MySQL[(MySQL DB)]
        BoardMapper --> MySQL
        CommentMapper --> MySQL
        
        BoardCtrl --> FileStorage[파일 저장소]
    end
    
    subgraph "기술 스택"
        Tech1[Spring Boot 3.3]
        Tech2[MyBatis]
        Tech3[MySQL]
        Tech4[JSP/JSTL]
        Tech5[Maven]
    end
```

## 게시판 작성 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Board as Board Controller
    participant Service as Board Service
    participant Mapper as Board Mapper
    participant DB as MySQL
    participant Storage as File Storage
    
    User->>Board: 이미지 업로드 요청
    Board->>Storage: 이미지 저장
    Storage-->>Board: 파일명 반환
    Board->>Service: 이미지 정보 등록
    Service->>Mapper: DB INSERT
    Mapper->>DB: 이미지 정보 저장
    DB-->>User: 업로드 완료
    
    User->>Board: 게시글 작성
    Board->>Service: 게시글 등록
    Service->>Mapper: DB INSERT
    Mapper->>DB: 게시글 저장
    DB-->>User: 작성 완료
```

## 게시판 조회 플로우

```mermaid
graph LR
    A[게시판 목록 요청] --> B[카테고리 선택]
    B --> C[페이지 번호 계산]
    C --> D[게시글 목록 조회]
    D --> E[페이지네이션 적용]
    E --> F[정렬 옵션 적용]
    F --> G[목록 반환]
    
    H[게시글 상세 조회] --> I[조회수 증가]
    I --> J[게시글 정보 조회]
    J --> K[댓글 목록 조회]
    K --> L[상세 페이지 표시]
    
    style D fill:#bbf,stroke:#333
    style K fill:#bbf,stroke:#333
```

## 댓글 관리 플로우

```mermaid
graph TB
    A[댓글 작성] --> B[Comment Controller]
    B --> C[Comment Service]
    C --> D[Comment Mapper]
    D --> E[(MySQL)]
    
    F[댓글 조회] --> G[게시글 ID로 조회]
    G --> D
    D --> H[댓글 목록 반환]
    
    I[댓글 수정] --> J[댓글 ID 확인]
    J --> K[내용 업데이트]
    K --> D
    
    L[댓글 삭제] --> M[댓글 ID로 삭제]
    M --> D
    
    style E fill:#f96,stroke:#333
```

## 사용자 관리 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Ctrl as User Controller
    participant Service as User Service
    participant Mapper as User Mapper
    participant DB as MySQL
    
    User->>Ctrl: 회원가입 요청
    Ctrl->>Service: 사용자 정보 전달
    Service->>Mapper: DB INSERT
    Mapper->>DB: 사용자 등록
    DB-->>User: 가입 완료
    
    User->>Ctrl: 로그인 요청
    Ctrl->>Service: ID/PW 검증
    Service->>Mapper: 사용자 조회
    Mapper->>DB: SELECT
    DB-->>Ctrl: 인증 결과
    Ctrl-->>User: 로그인 성공
    
    User->>Ctrl: 프로필 이미지 업로드
    Ctrl->>Ctrl: 기존 이미지 삭제
    Ctrl->>Ctrl: 새 이미지 저장
    Ctrl->>Service: 프로필 업데이트
    Service->>DB: UPDATE
    DB-->>User: 업데이트 완료
```

## 주요 기능
- Spring Boot 기반 게시판 시스템
- MyBatis를 활용한 데이터베이스 연동
- 카테고리별 게시글 관리
- 페이지네이션 및 정렬 기능
- 이미지 업로드 및 관리
- 댓글 CRUD 기능
- 사용자 인증 및 프로필 관리
- 조회수 카운팅
