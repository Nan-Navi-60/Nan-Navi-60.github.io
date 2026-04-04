# Jicbak 프로젝트 상세 문서

## 프로젝트 개요
- **프로젝트명**: Jicbak (직박 - 직접 박제하는 게시판)
- **개발 기간**: 2024년
- **주요 기능**: 카테고리별 게시판, 이미지 업로드, 댓글 시스템, 페이지네이션
- **기술 스택**: Spring Boot 3.3, MyBatis, MySQL, JSP/JSTL, Maven

## 시스템 아키텍처

### 전체 구조
```
Client (JSP)
    ↓
Controller Layer
    ├── BoardController
    ├── UserController
    ├── CommentController
    └── HomeController
    ↓
Service Layer
    ├── BoardService
    ├── UserService
    └── CommentService
    ↓
DAO Layer (MyBatis Mapper)
    ├── BoardMapper
    ├── UserMapper
    └── CommentMapper
    ↓
MySQL Database
```

### Spring Boot 설정
```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/jicbakdb
mybatis.mapper-locations=classpath:/mapper/*.xml
mybatis.type-aliases-package=com.jicbak.DTO
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

## 주요 기능 상세

### 1. 게시판 관리 (BoardController)

#### 게시글 작성
```java
@RequestMapping(value="/postContent", method= RequestMethod.POST)
@ResponseBody
public boolean postContent(BoardDTO board) {
    boolean result = true;
    bService.write(board);
    return result;
}
```

#### 페이지네이션
```java
@RequestMapping(value="/selectPage", method= RequestMethod.GET)
@ResponseBody
public List<BoardDTO> selectPage(int pageNum, int category_id, int pageSize, int sort) {
    List<BoardDTO> result = bService.getBoardPageList(pageNum, category_id, pageSize, sort);
    return result;
}
```

#### 이미지 업로드 및 관리
```java
@RequestMapping(value="/inputImage", method= RequestMethod.POST)
@ResponseBody
public boolean inputImage(@RequestParam("file") MultipartFile formData, 
                         @RequestParam("userId") String userId, 
                         @RequestParam("boardId") int boardId) {
    String fileName = bService.uploadImage(formData);
    
    BoardDTO board = new BoardDTO();
    board.setBoardWriter(userId);
    board.setImage(fileName);
    
    boolean result = false;
    if(boardId > 0) {
        // 기존 이미지 삭제 후 새 이미지로 변경
        BoardDTO temp = bService.getBoard(boardId);
        bService.deleteImage(temp.getImage());
        
        board.setBoardId(boardId);
        result = bService.updateImage(board);
    } else {
        // 첫 등록
        result = bService.inputImage(board);
    }
    return result;
}
```

#### 조회수 증가
```java
@RequestMapping(value="/countBoardViews", method= RequestMethod.POST)
@ResponseBody
public void countBoardViews(String boardId) {
    bService.countBoardViews(boardId);
}
```

### 2. 사용자 관리 (UserController)

#### 회원가입
```java
@RequestMapping(value="/signup", method= RequestMethod.POST)
@ResponseBody
public int signup(UserDTO user) {
    int Result = uService.join(user);
    return Result;
}
```

#### 로그인
```java
@RequestMapping(value="/login", method= RequestMethod.POST)
@ResponseBody
public boolean login(String userId, String userPw) {
    boolean Result = uService.login(userId, userPw);
    return Result;
}
```

#### 프로필 이미지 관리
```java
@RequestMapping(value="/inputProfileImage", method= RequestMethod.POST)
@ResponseBody
public String inputProfileImage(@RequestParam("file") MultipartFile formData, 
                               @RequestParam("userId") String userId, 
                               @RequestParam("profileImage") String profileImage) {
    // 기존 이미지 삭제 (기본 이미지가 아닌 경우)
    if(!profileImage.equals("basicImage.png")) {
        uService.deleteImage(profileImage);
    }
    
    // 새 이미지 업로드
    String fileName = uService.uploadImage(formData);
    UserDTO user = new UserDTO();
    user.setUserId(userId);
    user.setProfileImage(fileName);
    uService.modify(user);
    return fileName;
}
```

### 3. 댓글 관리 (CommentController)

#### 댓글 작성
```java
@RequestMapping(value="/editComment", method= RequestMethod.POST)
@ResponseBody
public boolean editComment(CommentDTO comment) {
    boolean result = cService.write(comment);
    return result;
}
```

#### 댓글 목록 조회
```java
@RequestMapping(value="/getComment", method= RequestMethod.POST)
@ResponseBody
public List<CommentDTO> getComment(int boardId) {
    List<CommentDTO> result = cService.getComment(boardId);
    return result;
}
```

#### 댓글 수정
```java
@RequestMapping(value="/updateComment", method= RequestMethod.POST)
@ResponseBody
public boolean updateComment(CommentDTO comment) {
    boolean result = cService.updateComment(comment);
    return result;
}
```

#### 댓글 삭제
```java
@RequestMapping(value="/deleteComment", method= RequestMethod.POST)
@ResponseBody
public boolean deleteComment(int commentId) {
    boolean result = cService.remove(commentId);
    return result;
}
```

## 데이터베이스 구조

### Board 테이블
- boardId (PK, AUTO_INCREMENT): 게시글 ID
- boardTitle: 제목
- boardContent: 내용
- boardWriter (FK): 작성자 ID
- boardWritedate: 작성 시간
- category_id (FK): 카테고리 ID
- image: 첨부 이미지 파일명
- checkNum: 상태 (1: 완료, 2: 작성 중)
- boardViews: 조회수

### User 테이블
- userId (PK): 사용자 ID
- userPw: 비밀번호
- userName: 이름
- profileImage: 프로필 이미지 파일명

### Comment 테이블
- commentId (PK, AUTO_INCREMENT): 댓글 ID
- boardId (FK): 게시글 ID
- userId (FK): 작성자 ID
- commentContent: 댓글 내용
- commentWritedate: 작성 시간

### Category 테이블
- category_id (PK): 카테고리 ID
- category_name: 카테고리 이름

## 기술적 특징

### 1. MyBatis 연동
```xml
<!-- mapper/BoardMapper.xml -->
<mapper namespace="com.jicbak.DAO.BoardDAO">
    <select id="getBoardList" resultType="BoardDTO">
        SELECT * FROM board 
        WHERE category_id = #{category_id}
        ORDER BY boardId DESC
    </select>
    
    <select id="getBoardPageList" resultType="BoardDTO">
        SELECT * FROM board 
        WHERE category_id = #{category_id}
        ORDER BY 
            <if test="sort == 0">boardId DESC</if>
            <if test="sort == 1">boardViews DESC</if>
        LIMIT #{offset}, #{pageSize}
    </select>
</mapper>
```

### 2. Service 계층 분리
```java
public interface BoardService {
    public void write(BoardDTO board);
    public void modify(BoardDTO board);
    public boolean remove(int boardId);
    public BoardDTO getBoard(int boardId);
    public List<BoardDTO> getBoardPageList(int pageNum, int category_id, int pageSize, int sort);
    public String uploadImage(MultipartFile formData);
    public void deleteImage(String imageName);
}
```

### 3. DTO 패턴
```java
public class BoardDTO {
    private int boardId;
    private String boardTitle;
    private String boardContent;
    private String boardWriter;
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private Date boardWritedate;
    private int category_id;
    private String image;
    private int checkNum;
    private int boardViews;
    
    // Getters and Setters
}
```

### 4. MultipartFile 처리
```java
public String uploadImage(MultipartFile formData) {
    String fileName = formData.getOriginalFilename();
    String uploadPath = "/uploads/";
    
    try {
        File dest = new File(uploadPath + fileName);
        formData.transferTo(dest);
        return fileName;
    } catch (IOException e) {
        e.printStackTrace();
        return null;
    }
}
```

## 주요 화면

### 1. 메인 페이지
- 카테고리별 최신 게시글 미리보기
- 인기 게시글 표시

### 2. 게시판 목록
- 카테고리별 게시글 목록
- 페이지네이션
- 정렬 옵션 (최신순, 인기순)

### 3. 게시글 상세
- 게시글 내용 및 이미지
- 조회수 표시
- 댓글 목록

### 4. 게시글 작성
- 제목, 내용 입력
- 카테고리 선택
- 이미지 업로드

### 5. 프로필 페이지
- 사용자 정보 수정
- 프로필 이미지 변경

## 트러블 슈팅

### 1. 이미지 업로드 타이밍 문제
**문제**: 게시글 작성 중 이미지를 먼저 업로드하면 게시글 ID가 없어 연결 불가
**해결**: 임시 게시글(checkNum=2)을 먼저 생성하고 이미지 업로드 후 게시글 완성

### 2. 기존 이미지 삭제
**문제**: 이미지 변경 시 기존 이미지가 서버에 남아 저장 공간 낭비
**해결**: 새 이미지 업로드 전 기존 이미지를 조회하여 삭제

```java
BoardDTO temp = bService.getBoard(boardId);
bService.deleteImage(temp.getImage());
```

### 3. 작성 중 이탈 처리
**문제**: 사용자가 게시글 작성 중 페이지를 벗어나면 임시 데이터가 남음
**해결**: 페이지 이탈 시 checkNum=2인 게시글과 이미지를 자동 삭제

```java
public boolean deletePost(String userId) {
    BoardDTO board = getImage(userId);
    if(board != null) {
        bService.deleteImage(board.getImage());
        result = bService.deleteTempPost(userId);
    }
    return result;
}
```

### 4. 댓글 삭제 시 게시글 연동
**문제**: 게시글 삭제 시 댓글이 남아있어 외래키 제약 위반
**해결**: 게시글 삭제 전 해당 게시글의 모든 댓글을 먼저 삭제

```java
public boolean deletBoard(int boardId) {
    boolean result = cService.removeBoardComment(boardId);
    BoardDTO board = bService.getBoard(boardId);
    String deleteImage = board.getImage();
    bService.deleteImage(deleteImage);
    result = bService.remove(boardId);
    return result;
}
```

## 배포 환경
- **Backend**: Spring Boot 3.3.2
- **Build Tool**: Maven
- **Database**: MySQL 8.0
- **View**: JSP + JSTL
- **Server**: Embedded Tomcat

## 개선 가능 사항
1. Spring Security 적용 (현재 세션 기반 인증)
2. 이미지를 클라우드 스토리지로 이전
3. 게시글 검색 기능 추가
4. 좋아요 기능 추가
5. 실시간 알림 기능
