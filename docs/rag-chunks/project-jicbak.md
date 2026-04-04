# JicBak 프로젝트 (ID: 2)

## 개요
- 제목: Spring Boot 게시판 시스템 (직박 - 직접 박제하는 게시판)
- 개발 목표: 1) Spring Boot의 자동 설정과 의존성 주입 기반 체득, 2) MyBatis SQL 매핑 방식, 3) Controller-Service-DAO 계층형 아키텍처, 4) AJAX 기반 비동기 처리
- 핵심 스택: Spring Boot, MyBatis, JSP, Maven, MySQL, AJAX

## 시스템 구조 및 플로우표 (FLOWCHART)
- Client 호출 ➔ BoardController ➔ BoardService ➔ BoardMapper ➔ Database. (게시판/댓글/사용자 도메인 각각 동일 구조)

## 데이터베이스 (DB / ERD)
- `user` (1) : `board` (N) 연동, `user`(1) : `comment`(N) 연동
- `category` (1) : `board` (N) 연동
- `board` 테이블 주요 컬럼 설계: `boardId`, `category_id`, `boardWriter`(외래키), `image`, `checkNum`(임시게시글구분), `boardViews`

## 내부 구조 상세 (STRUCTURE)
- **Controller Layer**: 클라이언트 요청 처리 (`@Controller`). 예컨대 `@ResponseBody`와 `RequestMethod`를 사용해 게시글 작성(POST), 조회(GET) 분리. 
- **Service Layer**: DB와의 연결을 통합 및 트랜잭션 등 추상화. `public void write(BoardDTO)`, `uploadImage()` 등 도메인 로직 처리.
- **DAO / MyBatis Mapper**: xml 파일로 `LIMIT #{offset}, #{pageSize}` 혹은 `<if test="sort == 0">` 같은 구문으로 동적 쿼리 사용. 
- **MultipartFile**: 파일 업로드 제어. `MultipartFile formData` 수신 및 `String fileName = uploadImage` 변환.
- **Pagination**: offset과 pageSize를 연산해주는 서비스로, 프론트로 List<BoardDTO> 반환. 댓글 시스템과 분할 구현됨.

## 트러블 슈팅 (TROUBLE SHOOTING)
1. **이미지 업로드 타이밍 문제**:
   - 문제: 사용자가 게시물에 이미지를 업로드할 때 서버에 반영되는 모습이 즉시 보여야 함, 허나 등록 취소나 오류 이탈 시 서버에 등록된 이미지와 DB 찌꺼기가 남음.
   - 해결책: **임시 게시글 (checkNum=2)** 로직 구성. 파일을 일단 서버에 넘기면 DB상 `checkNum=2`인 임시 튜플과 함께 이미지 생성. 최종 제출 성공 시 `checkNum=1`로 업데이트하여 정규 포스팅 취급되도록 변경. 추가적으로 페이지 이탈 시 `checkNum=2` 상태인 해당 유저의 가장 최근 DB 로우를 삭제해주는 청소 로직 포함.
2. **기존 이미지 삭제 누락**:
   - 문제: 글 작성자(수정 모드)가 사진을 새로운 사진으로 등록 시 기존 이미지가 서버 스토리지에 잔류.
   - 해결책: 클라이언트 요청 시 Controller 내에서 기존 BoardDTO를 가져와 `.getImage()` 추출 후, `deleteImage` 함수로 하드 디스크에서 완전 삭제하고 새 파일 저장.
3. **게시글 삭제 시 외래키 무결성(댓글 처리)**:
   - 문제: 댓글이 하나라도 존재하는 글을 삭제 시 DB 외래키 위반 에러 발생.
   - 해결책: 삭제 로직 단절 지연 조치. 1) 관련 댓글(removeBoardComment) 우선 쿼리 삭제 ➔ 2) 이미지 스토리지 삭제 ➔ 3) 최종 게시물 튜플 본체 삭제 흐름으로 비즈니스 로직 재단편화.
