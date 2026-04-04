# Notice Board 프로젝트 (ID: 1)

## 개요
- 제목: Servlet 게시판 사이트
- 기술 스택: Java Servlet (javax.servlet), JSP, JDBC 직접 연결, MySQL, Apache Tomcat
- 학습 목표: 실제 사이트의 저장, 출력, 통신, 수정 등 사용자의 요청이 처리되는 과정 파악, 사이트와 DB 간의 통신/결과 흐름 이해, 서버-유저-DB의 개념 연결.

## 주요 시각적 화면 (VISUAL)
- Main: 최신순으로 모든 카테고리 게시글 목록 노출
- Login / SignUp: 로그인 및 회원가입 페이지
- ContentList: 각 카테고리별로 필터링된 게시글 목록 (최신순)
- Content: 특정 게시글 디테일 뷰
- Comment: 게시글의 특정 댓글 스레드 뷰 (로그인 시 노출)

## 아키텍처 및 내부 구조 (STRUCTURE)
- **Client Request**: HTML form (`action="/login_Servlet" method="post"`)을 통해 제출
- **Servlet Response**: `doPost(HttpServletRequest, HttpServletResponse)`로 요청 데이터를 처리.
- **Login Session**: `login_Servlet`에서 `pstmt`을 통해 들어온 아이디/비밀번호 매칭 검색.
  - 로그인 성공: `0` / 비밀번호 불일치: `-1` / 아이디 없음: `-2` / SQL 예외: `-3` 
  - 성공 시, `request.getSession()`으로 세션 획득 및 `session.setAttribute("login_check", id)` 값 주입 후 사용자에게 응답.
- **Pagination (JSP + Servlet)**: `pageNumber`를 받아 LIMIT 시작/크기값 지정. 서블릿단에서는 `LIMIT ?, ?` 파라미터 매핑으로 게시물을 분할 탐색.

## 이미지 중복 업로드 제어 (Duplicate Images)
게시글 수정 중 `delete_img(id)` 함수를 호출하여 기존에 첨부된 이미지가 있다면 디스크에서 지우고 업로드 되게끔 선행 처리. DB에 저장된 `db_img` 컬럼이 "1"(기본 이미지)이 아닌 경우 `f.delete()`로 자원 삭제 수행.

## 트러블 슈팅 (TROUBLE SHOOTING)
1. **POST 중복 요청**:
   - 증상: 댓글 등록 후 페이지 새로고침 시 POST 요청이 중복 전송되어 같은 댓글 도배 현상. (forward 방식으로 인해 요청 객체가 브라우저에 잔류함에 따라 발생)
   - 해결: 기존 forward 방식을 버리고 JSP에서 AJAX(비동기) 통신을 통해 댓글 요청을 하도록 구조 변경.
2. **Login Session Check**:
   - 증상: 로그인 후 다른 페이지 접근 시 로그인 정보를 계속 기억하지 못함.
   - 해결: 로그인 인증 성공 후 `login_check` 키로 세션(`HttpSession`)을 영구 구성하여, 다른 JSP 페이지 방문 과정에서 `getRequestDispatcher` 시점마다 세션이 남아있는지 조건문 검수 로직 생성.
