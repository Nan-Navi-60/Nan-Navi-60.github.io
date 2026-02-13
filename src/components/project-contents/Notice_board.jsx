export default function detail() {

    return(
        <div>
            <a>Servlet 게시판 사이트</a>
    
            <div>
                <div>
                    <a>INDEX</a>
                </div>
                <div>
                    <a>사이트의 기본 작동 원리와 구조의 이해</a>        
                    <a>1. 실제 사이트의 저장, 출력, 통신, 수정 등 사용자의 요청이 실제 어떤 식으로 처리되는지 파악.</a>
                    <a>2. 사이트와 DB 간의 통신과 결과가 사용자에게 까지 도달하는 흐름 파악</a>
                    <a>3. 서버와 유저, DB의 개념 연결</a>
                </div>
            </div>
    
            <div>
                <div>
                    <a>INTRODUCE</a>
                </div>
                <div>
                    <a>JSP</a>
                        <a>동적 웹 페이지를 구현하기 위한 기술로 서버에서 페이지를 직접 생성하여 컨텐츠를 사용자에게 노출시킨다.
                        파일 내부에 Java Class를 Import하거나 코드를 작성하여 사용자의 요청에 따라 동적으로 노출시켜 주었으며,
                        실제 사용자 측에서 적용될 변경사항과 위치를 직관적으로 확인할 수 있다.</a>
            
                    <a>Servlet</a>
                        <a>javax.servlet Library를 사용하여 사용자의 요청을 처리하고 응답한다.
                        HttpServlet을 통해 사용자의 요청을 확인하고 Query를 작성하여 DB와 통신한다.
                        java.sql Library를 사용하여 DB에 요청 객체와 응답 객체를 생성하며, 응답 파라미터를 사용자에게 반환한다.</a>
            
                    <a>DataBase</a>
                        <a>MySQL를 통해 제작
                        MariaDB와의 호완이 가능하며, Java Servlet과의 통신하여 요청에 대한 응답을 처리한다.
                        사용자, 게시글, 댓글의 정보를 저장하며, 사용자의 id를 게시글과 댓글에서 상속받아 연관관계를 명확히 한다.</a>
                </div>
            </div>

            <div>
                <a>VISUAL</a>
                <div>
                    <a>main</a>
            
                    <a>content</a>
            
                    <a>login / SignUp</a>
            
                    <a>Structure</a>
                </div>
            </div>
    
            <div>
                <a>TROUBLE SHOOTING</a>

                <div>
                    <div>
                    <a>1. POST 중복 요청</a>
                    <a>댓글을 등록한 후 해당 페이지를 새로고침할 경우 댓글이 중복으로 작성되는 현상이 발견됨.
                    POST로 요청을 보대는 댓글의 경우 GET요청과 달리 페이지를 리로드 하지 않고 해당 페이지의 상태를 유지하게 된다.
                    이때 HTML의 "form" Element는 해당 요청의 요청객체를 가지고 있어 새로 고침을 시도하면 해당 요청을 다시 전송하는 작업을 수행하게 된다.
                    이를 해결하기 위해 JSP파일 자체에서 요청객체를 생성하지 않고 AJAX를 통해 댓글과 관련된 요청을 처리하였다.</a>
                    </div>
            
                    <div>
                        <a>2. Login Session Check</a>
                        <a>로그인 후 페이지에 접속을 할 경우 Login 여부를 확인할 수 없었다.
                        로그인 시 login_check KEY를 사용하는 Session을 생성하였으며, 사용자가 페이지에 접속할 때마다 해당 Session의 여부를 확인한다.
                        JSP내부에 조건문을 사용하여 로그인 시 로직을 활용할 수 있게 되었다.</a>
                    </div>
                </div>
            </div>
        </div>
    );
}