# Pokemon Decksplorer 프로젝트 상세 문서

## 프로젝트 개요
- **프로젝트명**: Pokemon Decksplorer (포켓몬 덱 공유 플랫폼)
- **개발 기간**: 2024년
- **주요 기능**: 포켓몬 카드 덱 공유, JWT 인증, 좋아요 시스템, 게시판
- **기술 스택**: Spring Boot 3.4, MyBatis, JWT, Thymeleaf, Gradle, MariaDB

## 시스템 아키텍처

### 전체 구조
```
Client (Thymeleaf + JavaScript)
    ↓
Controller Layer
    ├── UserController (JWT 인증)
    ├── BoardController (게시판)
    ├── CardController (카드 조회)
    └── CommentController (댓글)
    ↓
Service Layer
    ├── UserService
    ├── BoardService
    ├── CardService
    └── CommentService
    ↓
Mapper Layer (MyBatis)
    ├── UserMapper
    ├── BoardMapper
    ├── CardMapper
    └── CommentMapper
    ↓
MariaDB Database
```

### Gradle 설정
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.4'
    implementation 'io.jsonwebtoken:jjwt-api:0.12.3'
    runtimeOnly 'org.mariadb.jdbc:mariadb-java-client'
    compileOnly 'org.projectlombok:lombok'
}
```

## 주요 기능 상세

### 1. JWT 기반 인증 시스템

#### JWT 토큰 생성
```java
public static String generateToken(String user_id) {
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    
    return Jwts.builder()
            .claim("sub", user_id)
            .claim("iat", new Date().getTime())
            .claim("exp", new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact();
}
```

#### 쿠키에 토큰 저장
```java
public static void addTokenToCookie(HttpServletResponse response, String token) {
    Cookie cookie = new Cookie("login", token);
    cookie.setPath("/");
    cookie.setMaxAge((int)(EXPIRATION_TIME / 1000));
    response.addCookie(cookie);
}
```

#### 쿠키에서 토큰 추출
```java
public static String getTokenFromCookie(HttpServletRequest request) {
    Cookie[] cookies = request.getCookies();
    
    if (cookies != null) {
        for (Cookie cookie : cookies) {
            if ("login".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
    }
    
    return null;
}
```

#### 토큰에서 사용자 ID 추출
```java
public static String extractUserId(String token) {
    SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    Claims claims = Jwts.parser()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();
    
    return claims.getSubject();
}
```

### 2. 로그인 및 회원가입

#### 로그인
```java
@PostMapping("/login")
@ResponseBody
public Map<String, Object> login(@RequestBody UserDTO userDTO, HttpServletResponse response){
    Map<String,Object> login_check = uService.loginCheck(userDTO.getUser_id(), userDTO.getUser_pw());
    
    if(Boolean.FALSE.equals(login_check.get("success"))){
        return login_check;
    }
    
    // JWT 토큰 생성 및 쿠키에 저장
    String token = JwtUtil.generateToken(userDTO.getUser_id());
    JwtUtil.addTokenToCookie(response, token);
    
    UserDTO userInfo = uService.getUserInfo(userDTO.getUser_id());
    
    Map<String, Object> result = login_check;
    result.put("user_name", userInfo.getUser_name());
    return result;
}
```

#### 로그아웃
```java
@PostMapping("/logout")
@ResponseBody
public ResponseEntity<Void> login(HttpServletResponse response){
    try {
        JwtUtil.deleteTokenToCookie(response, "login");
        return ResponseEntity.ok().build();
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
```

#### 회원가입
```java
@PostMapping("/signup")
@ResponseBody
public String signup(@RequestBody UserDTO userDTO){
    UserDTO userInfo = uService.getUserInfo(userDTO.getUser_id());
    
    if(userInfo != null){
        return "1"; // 중복 ID
    }
    
    boolean result = uService.inputUserInfo(userDTO);
    
    return result ? "login" : "2" ;
}
```

### 3. 게시판 기능

#### 게시글 목록 조회
```java
@GetMapping("/loadBoard")
@ResponseBody
public List<BoardDTO> loadBoard(int pageNum){
    return bService.loadBoard(pageNum);
}
```

#### 게시글 작성
```java
@PostMapping("/addPost")
@ResponseBody
public Map<String, Object> addPost(HttpServletRequest cookie, @RequestBody Map<String, Object> map){
    Map<String, Object> result = new HashMap<>();
    
    // 쿠키에서 JWT 토큰 추출
    String token = JwtUtil.getTokenFromCookie(cookie);
    
    if(token == null){
        result.put("success", false);
        return result;
    }
    
    String board_title = (String) map.get("postTitle");
    String board_contents = (String) map.get("postContent");
    String board_images = (String) map.get("images");
    
    // 토큰에서 사용자 ID 추출
    String user_id = JwtUtil.extractUserId(token);
    boolean resultBoolean = bService.addPost(user_id, board_title, board_contents, board_images);
    result.put("success", resultBoolean);
    
    return result;
}
```

#### 게시글 삭제
```java
@PostMapping("/deleteContent")
@ResponseBody
public Map<String, Object> deleteContent(HttpServletRequest cookie, @RequestBody Map<String, Object> map){
    Map<String, Object> result = new HashMap<>();
    
    String token = JwtUtil.getTokenFromCookie(cookie);
    
    if(token == null){
        result.put("success", false);
        return result;
    }
    
    String user_id = JwtUtil.extractUserId(token);
    int board_id = Integer.parseInt(map.get("board_id").toString());
    
    // 작성자 확인 후 삭제
    boolean resultBoolean = bService.deleteContent(user_id, board_id);
    result.put("success", resultBoolean);
    
    return result;
}
```

### 4. 좋아요 기능

```java
@PostMapping("/addLike")
@ResponseBody
public Map<String, Object> addLike(HttpServletRequest cookie, @RequestBody Map<String, Object> map){
    int board_id = Integer.parseInt(String.valueOf(map.get("board_id")));
    String like = String.valueOf(map.get("like"));
    
    Map<String, Object> result = new HashMap<>();
    
    String token = JwtUtil.getTokenFromCookie(cookie);
    
    if(token == null){
        result.put("like", 0);
        return result;
    }
    
    String user_id = JwtUtil.extractUserId(token);
    
    result = bService.addLike(board_id, user_id, like);
    
    return result;
}
```

## 데이터베이스 구조

### User 테이블
- user_id (PK): 사용자 ID
- user_pw: 비밀번호
- user_name: 이름

### Board 테이블
- board_id (PK, AUTO_INCREMENT): 게시글 ID
- user_id (FK): 작성자 ID
- board_title: 제목
- board_contents: 내용
- board_images: 이미지 경로
- created_at: 작성 시간

### Like 테이블
- like_id (PK, AUTO_INCREMENT): 좋아요 ID
- board_id (FK): 게시글 ID
- user_id (FK): 사용자 ID

### Comment 테이블
- comment_id (PK, AUTO_INCREMENT): 댓글 ID
- board_id (FK): 게시글 ID
- user_id (FK): 작성자 ID
- comment_content: 댓글 내용
- created_at: 작성 시간

### Card 테이블 (포켓몬 카드 정보)
- card_id (PK): 카드 ID
- card_name: 카드 이름
- card_type: 카드 타입 (포켓몬, 트레이너, 에너지)
- card_image: 카드 이미지

## 기술적 특징

### 1. JWT 기반 인증
- 세션 대신 JWT 토큰을 쿠키에 저장
- Stateless 인증 방식
- 토큰 만료 시간: 1시간

### 2. Thymeleaf 템플릿 엔진
- 서버 사이드 렌더링
- Spring Boot와 자연스러운 통합

### 3. MyBatis SQL 매핑
- XML 기반 SQL 관리
- 동적 쿼리 작성

### 4. Gradle 빌드 시스템
- Maven보다 빠른 빌드 속도
- Groovy 기반 설정

### 5. Lombok
- Getter/Setter 자동 생성
- 보일러플레이트 코드 감소

### 6. JavaScript 난독화
```gradle
task obfuscateJs(type: NpmTask) {
    args = ['run', 'build']
    workingDir = file("${projectDir}/src/main/resources/static/js")
}
```

## 주요 화면

### 1. 메인 페이지
- 최신 덱 목록
- 인기 덱 표시

### 2. 로그인/회원가입
- JWT 토큰 기반 인증

### 3. 덱 목록
- 페이지네이션
- 좋아요 수 표시

### 4. 덱 상세
- 덱 구성 카드 표시
- 좋아요 버튼
- 댓글 시스템

### 5. 덱 작성
- 카드 선택
- 덱 설명 작성

## 트러블 슈팅

### 1. JWT 토큰 관리
**문제**: 토큰을 어디에 저장할지 결정 필요
**해결**: 쿠키에 저장하여 자동으로 요청에 포함되도록 구현

### 2. 인증 필요 API 처리
**문제**: 모든 API에서 토큰 검증 코드 중복
**해결**: 쿠키에서 토큰을 추출하고 사용자 ID를 반환하는 유틸 함수 작성

### 3. 좋아요 중복 방지
**문제**: 사용자가 여러 번 좋아요를 누를 수 있음
**해결**: Like 테이블에 (board_id, user_id) 복합 유니크 제약 조건 추가

### 4. 작성자 확인
**문제**: 다른 사용자가 게시글을 삭제할 수 있음
**해결**: 삭제 전 토큰에서 추출한 user_id와 게시글 작성자를 비교

## 배포 환경
- **Backend**: Spring Boot 3.4.1
- **Build Tool**: Gradle
- **Database**: MariaDB
- **View**: Thymeleaf
- **Authentication**: JWT (jjwt 0.12.3)

## 개선 가능 사항
1. Refresh Token 구현 (현재 Access Token만 사용)
2. 토큰 만료 시 자동 갱신
3. 카드 검색 기능 추가
4. 덱 추천 알고리즘
5. 사용자 프로필 페이지
