import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';
import Mermaid from '../ui/Mermaid';

export default async function ProjectDetail() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">Spring Boot 게시판 시스템</h1>

            <Section title={'INDEX'}>
                <Item subTitle={'Spring Boot 프레임워크 학습'}>
                    <p>1. Spring Boot의 자동 설정과 의존성 주입을 활용한 웹 애플리케이션 개발</p>
                    <p>2. MyBatis를 통한 SQL 매핑과 데이터베이스 연동 방식 이해</p>
                    <p>3. 계층형 아키텍처(Controller-Service-DAO)를 통한 관심사 분리</p>
                    <p>4. AJAX를 활용한 비동기 통신 구현</p>
                </Item>
            </Section>

            <Section title={'INTRODUCE'}>
                <Item subTitle={'Spring Boot'}>
                    <p>
                        Java 기반 웹 프레임워크로 자동 설정과 내장 서버를 제공하여 빠른 개발이 가능하다.
                    </p>
                    <p>
                        의존성 주입과 제어의 역전(IoC)을 통해 느슨한 결합의 코드를 작성할 수 있다.
                    </p>
                    <p>
                        @Controller, @Service, @Repository 어노테이션으로 계층을 명확히 구분한다.
                    </p>
                </Item>
                <Item subTitle={'MyBatis'}>
                    <p>
                        SQL 매퍼 프레임워크로 XML 파일에 SQL을 작성하여 Java 객체와 매핑한다.
                    </p>
                    <p>
                        동적 쿼리 작성이 용이하며, 복잡한 SQL도 직관적으로 관리할 수 있다.
                    </p>
                    <Code language={'xml'}>
                    {`
<select id="getBoardPageList" resultType="BoardDTO">
    SELECT * FROM board 
    WHERE category_id = #{category_id}
    ORDER BY 
        <if test="sort == 0">boardId DESC</if>
        <if test="sort == 1">boardViews DESC</if>
    LIMIT #{offset}, #{pageSize}
</select>
                    `}
                    </Code>
                </Item>
                <Item subTitle={'JSP'}>
                    <p>
                        JavaServer Pages를 View 템플릿으로 사용하며, 주로 정적 HTML 렌더링에 활용한다.
                    </p>
                    <p>
                        Spring Boot의 View Resolver를 통해 JSP 파일 경로를 자동으로 매핑한다.
                    </p>
                    <Code language={'properties'}>
                    {`
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
                    `}
                    </Code>
                </Item>
                <Item subTitle={'Maven'}>
                    <p>
                        프로젝트 빌드 및 의존성 관리 도구로 pom.xml에 필요한 라이브러리를 선언한다.
                    </p>
                    <Code language={'xml'}>
                    {`
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
                    `}
                    </Code>
                </Item>
                <Item subTitle={'AJAX'}>
                    <p>
                        비동기 통신을 통해 페이지 새로고침 없이 서버와 데이터를 주고받는다.
                    </p>
                    <p>
                        댓글 작성, 수정, 삭제 등의 기능에서 AJAX를 활용하여 사용자 경험을 개선한다.
                    </p>
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main Page'}>
                    <p>카테고리별 최신 게시글 미리보기 및 인기 게시글 표시</p>
                    <ProjectImage src={'/img/projectImg/JicBak/Main-Top1.png'} alt='Main-Top' />
                    <ProjectImage src={'/img/projectImg/JicBak/Main-Bottom.png'} alt='Main-Bottom' />
                </Item>
                <Item subTitle={'Authentication'}>
                    <p>로그인 및 회원가입 페이지</p>
                    <ProjectImage src={'/img/projectImg/JicBak/Login.png'} alt='Login' />
                    <ProjectImage src={'/img/projectImg/JicBak/SignUp.png'} alt='SignUp' />
                </Item>
                <Item subTitle={'Board List'}>
                    <p>카테고리별 게시글 목록 및 페이지네이션</p>
                    <ProjectImage src={'/img/projectImg/JicBak/ContentList-Top.png'} alt='BoardList' />
                </Item>
                <Item subTitle={'Board Detail View'}>
                    <p>게시글 상세 내용, 이미지, 조회수 표시</p>
                    <ProjectImage src={'/img/projectImg/JicBak/ContentView-Top.png'} alt='BoardDetail-Top' />
                    <ProjectImage src={'/img/projectImg/JicBak/ContentView-Bottom.png'} alt='BoardDetail-Bottom' />
                </Item>
                <Item subTitle={'Content Creation'}>
                    <p>게시글 작성 페이지 (제목, 내용, 카테고리, 이미지 업로드)</p>
                    <ProjectImage src={'/img/projectImg/JicBak/CreateContentPage.png'} alt='WritePost' />
                    <ProjectImage src={'/img/projectImg/JicBak/Content-Bottom.png'} alt='Content-Bottom' />
                </Item>
                <Item subTitle={'Comment System'}>
                    <p>댓글 작성, 수정, 삭제 기능</p>
                    <ProjectImage src={'/img/projectImg/JicBak/CommentArea.png'} alt='Comment' />
                    <ProjectImage src={'/img/projectImg/JicBak/CommentArea-Edit.png'} alt='Comment-Edit' />
                </Item>
                <Item subTitle={'User Profile'}>
                    <p>사용자 정보 수정 및 프로필 이미지 변경</p>
                    <ProjectImage src={'/img/projectImg/JicBak/ProfilePage.png'} alt='Profile' />
                </Item>
            </Section>

            <Section title={'FLOWCHART'}>
                <Item subTitle={'System Architecture'}>
                    <p>Controller-Service-DAO 계층 구조 및 데이터 흐름</p>
                    <Mermaid chart={`
graph TB
    Client[Client JSP] --> Controller[Controller Layer]
    Controller --> Service[Service Layer]
    Service --> Mapper[Mapper Layer MyBatis]
    Mapper --> DB[(MySQL Database)]
    
    Controller --> |게시글 작성| BoardController
    Controller --> |사용자 관리| UserController
    Controller --> |댓글 관리| CommentController
    
    Service --> |비즈니스 로직| BoardService
    Service --> |비즈니스 로직| UserService
    Service --> |비즈니스 로직| CommentService
    
    Mapper --> |SQL 실행| BoardMapper
    Mapper --> |SQL 실행| UserMapper
    Mapper --> |SQL 실행| CommentMapper
                    `} />
                </Item>
                <Item subTitle={'Board CRUD Flow'}>
                    <p>게시글 작성, 조회, 수정, 삭제 프로세스</p>
                    <Mermaid chart={`
sequenceDiagram
    participant C as Client
    participant Ctrl as BoardController
    participant Svc as BoardService
    participant Map as BoardMapper
    participant DB as Database
    
    Note over C,DB: 게시글 작성
    C->>Ctrl: POST /postContent
    Ctrl->>Svc: write(board)
    Svc->>Map: insert board
    Map->>DB: INSERT INTO board
    DB-->>C: 작성 완료
    
    Note over C,DB: 게시글 조회
    C->>Ctrl: GET /selectPage
    Ctrl->>Svc: getBoardPageList()
    Svc->>Map: SELECT with LIMIT
    Map->>DB: 페이지별 조회
    DB-->>C: 게시글 목록 반환
    
    Note over C,DB: 게시글 삭제
    C->>Ctrl: GET /deletBoard
    Ctrl->>Svc: removeBoardComment()
    Svc->>Map: DELETE comments
    Ctrl->>Svc: deleteImage()
    Ctrl->>Svc: remove(boardId)
    Svc->>Map: DELETE board
    Map->>DB: DELETE FROM board
    DB-->>C: 삭제 완료
                    `} />
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'Controller Layer'}>
                    <p>클라이언트 요청을 받아 Service를 호출하고 결과를 반환한다.</p>
                    <Code language={'java'}>
                    {`
@Controller
public class BoardController {
    private BoardService bService;
    
    public BoardController(BoardService b) {
        this.bService = b;
    }
    
    @RequestMapping(value="/postContent", method=RequestMethod.POST)
    @ResponseBody
    public boolean postContent(BoardDTO board) {
        return bService.write(board);
    }
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'Service Layer'}>
                    <p>비즈니스 로직을 처리하고 DAO를 호출하여 데이터를 조작한다.</p>
                    <Code language={'java'}>
                    {`
public interface BoardService {
    public void write(BoardDTO board);
    public BoardDTO getBoard(int boardId);
    public List<BoardDTO> getBoardPageList(int pageNum, int category_id, int pageSize, int sort);
    public String uploadImage(MultipartFile formData);
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'DAO Layer (MyBatis Mapper)'}>
                    <p>데이터베이스와 직접 통신하여 CRUD 작업을 수행한다.</p>
                    <Code language={'xml'}>
                    {`
<mapper namespace="com.jicbak.DAO.BoardDAO">
    <insert id="write">
        INSERT INTO board (boardTitle, boardContent, boardWriter, category_id, image)
        VALUES (#{boardTitle}, #{boardContent}, #{boardWriter}, #{category_id}, #{image})
    </insert>
</mapper>
                    `}
                    </Code>
                </Item>
                <Item subTitle={'MultipartFile 처리'}>
                    <p>Spring의 MultipartFile을 사용하여 파일 업로드를 처리한다.</p>
                    <Code language={'java'}>
                    {`
@RequestMapping(value="/inputImage", method=RequestMethod.POST)
@ResponseBody
public boolean inputImage(@RequestParam("file") MultipartFile formData, 
                         @RequestParam("userId") String userId, 
                         @RequestParam("boardId") int boardId) {
    String fileName = bService.uploadImage(formData);
    
    BoardDTO board = new BoardDTO();
    board.setBoardWriter(userId);
    board.setImage(fileName);
    
    if(boardId > 0) {
        // 기존 이미지 삭제 후 변경
        BoardDTO temp = bService.getBoard(boardId);
        bService.deleteImage(temp.getImage());
        board.setBoardId(boardId);
        return bService.updateImage(board);
    } else {
        // 첫 등록
        return bService.inputImage(board);
    }
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'임시 게시글 처리'}>
                    <p>이미지 업로드를 위해 임시 게시글(checkNum=2)을 먼저 생성한다.</p>
                    <p>작성 완료 시 checkNum을 1로 변경하여 정식 게시글로 전환한다.</p>
                    <Code language={'xml'}>
                    {`
<!-- 임시 게시글 생성 (이미지 업로드 시) -->
<insert id="inputImage" parameterType="BoardDTO">
    INSERT INTO board (boardWriter, image, checkNum) 
    VALUES (#{boardWriter}, #{image}, 2)
</insert>

<!-- 게시글 작성 완료 시 checkNum을 1로 변경 -->
<update id="write" parameterType="BoardDTO">
    UPDATE board SET
        boardTitle = #{boardTitle},
        boardContent = #{boardContent},
        checkNum = 1
    WHERE boardId = #{boardId}
</update>

<!-- 정식 게시글만 조회 -->
<select id="selectAllBoard" resultType="BoardDTO">
    SELECT * FROM board WHERE checkNum = 1
</select>
                    `}
                    </Code>
                </Item>
                <Item subTitle={'페이지네이션'}>
                    <p>LIMIT와 OFFSET을 사용하여 페이지별 게시글을 조회한다.</p>
                    <Code language={'java'}>
                    {`
@RequestMapping(value="/selectPage", method=RequestMethod.GET)
@ResponseBody
public List<BoardDTO> selectPage(int pageNum, int category_id, int pageSize, int sort) {
    List<BoardDTO> result = bService.getBoardPageList(pageNum, category_id, pageSize, sort);
    return result;
}
                    `}
                    </Code>
                    <Code language={'xml'}>
                    {`
<select id="getBoardPageList" resultType="BoardDTO">
    SELECT * FROM board 
    WHERE category_id = #{category_id}
    ORDER BY boardId DESC
    LIMIT #{offset}, #{pageSize}
</select>
                    `}
                    </Code>
                </Item>
                <Item subTitle={'댓글 시스템'}>
                    <p>댓글은 boardId를 통해 게시글과 연결되며, AJAX를 통해 비동기로 처리한다.</p>
                    <ProjectImage src={'/img/projectImg/JicBak/CommentArea.png'} alt='Comment System' maxWidth='70%' />
                    <Code language={'java'}>
                    {`
@RequestMapping(value="/editComment", method=RequestMethod.POST)
@ResponseBody
public boolean editComment(CommentDTO comment) {
    return cService.write(comment);
}

@RequestMapping(value="/getComment", method=RequestMethod.POST)
@ResponseBody
public List<CommentDTO> getComment(int boardId) {
    return cService.getComment(boardId);
}
                    `}
                    </Code>
                </Item>
            </Section>

            <Section title={'DATABASE'}>
                <Item subTitle={'ERD'}>
                    <p>Board, User, Comment, Category 테이블 관계도</p>
                    <Mermaid chart={`
erDiagram
    user ||--o{ board : writes
    user ||--o{ comment : writes
    board ||--o{ comment : has
    category ||--o{ board : categorizes
    
    user {
        varchar(50) userId PK
        varchar(50) userPw
        varchar(50) userName
        varchar(10) userGender
        varchar(50) userEmail
        varchar(50) profileImage
    }
    
    board {
        int boardId PK
        varchar(100) boardTitle
        varchar(1000) boardContent
        varchar(50) boardWriter FK
        varchar(50) boardWritedate
        int category_id FK
        varchar(255) image
        int checkNum
        int boardViews
    }
    
    comment {
        int commentId PK
        varchar(50) userId FK
        int boardId FK
        varchar(500) comment
        varchar(50) commentDate
    }
    
    category {
        int id PK
        varchar(45) category
    }
                    `} />
                </Item>
                {/* <Item subTitle={'Board 테이블'}>
                    <p>게시글 정보</p>
                    <p>• boardId (PK, AUTO_INCREMENT): 게시글 ID</p>
                    <p>• boardTitle: 제목</p>
                    <p>• boardContent: 내용</p>
                    <p>• boardWriter (FK): 작성자 ID</p>
                    <p>• category_id (FK): 카테고리 ID</p>
                    <p>• image: 첨부 이미지 파일명</p>
                    <p>• boardViews: 조회수</p>
                    <p>• checkNum: 상태 (1: 완료, 2: 작성 중)</p>
                </Item>
                <Item subTitle={'User 테이블'}>
                    <p>사용자 정보</p>
                    <p>• userId (PK): 사용자 ID</p>
                    <p>• userPw: 비밀번호</p>
                    <p>• userName: 이름</p>
                    <p>• userGender: 성별</p>
                    <p>• userEmail: 이메일</p>
                    <p>• profileImage: 프로필 이미지</p>
                </Item>
                <Item subTitle={'Comment 테이블'}>
                    <p>댓글 정보</p>
                    <p>• commentId (PK, AUTO_INCREMENT): 댓글 ID</p>
                    <p>• boardId (FK): 게시글 ID</p>
                    <p>• userId (FK): 작성자 ID</p>
                    <p>• comment: 댓글 내용</p>
                    <p>• commentDate: 작성 시간</p>
                </Item>
                <Item subTitle={'Category 테이블'}>
                    <p>카테고리 정보</p>
                    <p>• id (PK, AUTO_INCREMENT): 카테고리 ID</p>
                    <p>• category: 카테고리 이름</p>
                </Item> */}
            </Section>

            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. 이미지 업로드 타이밍 문제'}>
                    <p>
                        게시글 작성 중 이미지를 업로드할 때 사용자는 업로드될 이미지가 잘 올갔는 지 확인할 수 있어야한다.
                    </p>
                    <p>하지만 이를 위해 이미지 등록 시 DB에 해당 정보를 미리 등록하게 된다면,</p>
                    <p>게시글 등록 중 예기치 못한 상황에 대한 대처(이미지 및 DB 삭제)가 불가능하다.</p>
                    <p>
                        임시 게시글(checkNum=2)을 먼저 생성하고 이미지를 업로드한 후, 작성 완료 시 checkNum을 1로 변경하여 정식 게시글로 전환했다.
                    </p>
                    <p>또한, 사용자가 게시글을 작성하는 도중 게시글 등록 페이지를 이탈하여 메인 페이지를 접속하는 경우 해당 사용자 Id로 등록되어 있는 checkNum=2인 DB의 데이터를 제거한다.</p>
                    <Code language={'java'}>
                    {`
// Controller: 이미지 업로드 시 임시 게시글 생성
@RequestMapping(value="/inputImage", method=RequestMethod.POST)
@ResponseBody
public boolean inputImage(@RequestParam("file") MultipartFile formData, 
                         @RequestParam("userId") String userId, 
                         @RequestParam("boardId") int boardId) {
    String fileName = bService.uploadImage(formData);
    
    BoardDTO board = new BoardDTO();
    board.setBoardWriter(userId);
    board.setImage(fileName);
    
    if(boardId > 0) {
        // 기존 이미지 변경
        board.setBoardId(boardId);
        return bService.updateImage(board);
    } else {
        // 임시 게시글 생성 (checkNum=2)
        return bService.inputImage(board);
    }
}
                    `}
                    </Code>
                    <Code language={'xml'}>
                    {`
<!-- MyBatis: 임시 게시글 생성 -->
<insert id="inputImage" parameterType="BoardDTO">
    INSERT INTO board (boardWriter, image, checkNum) 
    VALUES (#{boardWriter}, #{image}, 2)
</insert>

<!-- 게시글 작성 완료 시 정식 게시글로 전환 -->
<update id="updateBoard" parameterType="BoardDTO">
    UPDATE board SET 
        boardTitle = #{boardTitle},
        boardContent = #{boardContent},
        category_id = #{category_id},
        checkNum = 1
    WHERE boardId = #{boardId}
</update>

<!-- 페이지 이탈 시 임시 게시글 삭제 -->
<delete id="deleteTempPost" parameterType="string">
    DELETE FROM board WHERE boardWriter = #{userId} AND checkNum = 2 
    ORDER BY boardId DESC LIMIT 1
</delete>
                    `}
                    </Code>
                    <p>
                        이를통해 이미지 등록에 대한 문제를 해결하고, 이미지와 게시글을 안전하게 연결할 수 있다.
                    </p>
                </Item>
                <Item subTitle={'2. 기존 이미지 삭제'}>
                    <p>
                        이미지 변경 시 기존 이미지가 서버에 남아 저장 공간이 낭비되었다.
                    </p>
                    <p>
                        새 이미지 업로드 전 기존 이미지를 조회하여 해당 이미지를 삭제하도록 구현했다.
                    </p>
                    <Code language={'java'}>
                    {`
BoardDTO temp = bService.getBoard(boardId);
bService.deleteImage(temp.getImage());
                    `}
                    </Code>
                </Item>
                <Item subTitle={'3. 게시글 삭제 시 댓글 처리'}>
                    <p>
                        게시글 삭제 시 댓글이 남아있어 외래키 제약 조건 위반이 발생했다.
                    </p>
                    <p>
                        게시글 삭제 전 해당 게시글의 모든 댓글을 먼저 삭제하도록 순서를 조정했다.
                    </p>
                    <Code language={'java'}>
                    {`
public boolean deletBoard(int boardId) {
    // 1. 댓글 삭제
    cService.removeBoardComment(boardId);
    // 2. 이미지 삭제
    BoardDTO board = bService.getBoard(boardId);
    bService.deleteImage(board.getImage());
    // 3. 게시글 삭제
    return bService.remove(boardId);
}
                    `}
                    </Code>
                </Item>
            </Section>
        </div>
    );
}
