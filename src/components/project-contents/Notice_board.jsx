import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';

export default async function ProjectDetail() {
  
    // const resolvedParams = await params;
    // const id = Number(resolvedParams.id);

    return (
        <div className="project-detail-container">
            <h1 className="detail-title">Servlet 게시판 사이트</h1>

            <Section title={'INDEX'}>
                <Item subTitle={'사이트의 기본 작동 원리와 구조의 이해'}>
                    <p>1. 실제 사이트의 저장, 출력, 통신, 수정 등 사용자의 요청이 실제 어떤 식으로 처리되는지 파악.</p>
                    <p>2. 사이트와 DB 간의 통신과 결과가 사용자에게 까지 도달하는 흐름 파악</p>
                    <p>3. 서버와 유저, DB의 개념 연결</p>
                </Item>
            </Section>

            <Section title={'INTRODUCE'}>
                <Item subTitle={'JSP'}>
                    <p>
                        동적 웹 페이지를 구현하기 위한 기술로 서버에서 페이지를 직접 생성하여 컨텐츠를 사용자에게 노출시킨다.
                    </p>
                    <p>
                        파일 내부에 Java Class를 Import하거나 코드를 작성하여 사용자의 요청에 따라 동적으로 노출시켜 주었으며,
                    </p>
                    <p>
                        실제 사용자 측에서 적용될 변경사항과 위치를 직관적으로 확인할 수 있다.
                    </p>
                </Item>
                <Item subTitle={'Servlet'}>
                    <p>
                        javax.servlet Library를 사용하여 사용자의 요청을 처리하고 응답한다.
                    </p>
                    <p>
                        HttpServlet을 통해 사용자의 요청을 확인하고 Query를 작성하여 DB와 통신한다.
                    </p>
                    <p>
                        java.sql Library를 사용하여 DB에 요청 객체와 응답 객체를 생성하며, 응답 파라미터를 사용자에게 반환한다.
                    </p>
                </Item>
                <Item subTitle={'DataBase'}>
                    <p>
                        MySQL를 통해 제작.
                    </p>
                    <p>
                        MySQL과의 호환이 가능하며, Java Servlet과의 통신하여 요청에 대한 응답을 처리한다.
                    </p>
                    <p>
                        사용자, 게시글, 댓글의 정보를 저장하며, 사용자의 id를 게시글과 댓글에서 외래키 참조하여 연관관계를 명확히 한다.
                    </p>
                </Item>
                <Item subTitle={'JDBC 직접 연결'}>
                    <p>
                        JDBC Connection을 활용하여 mySQL 연결
                    </p>
                    <Code language={'java'}>
                    {`
public profileDAO() {
    try {
        String dbURL = "jdbc:mysql://localhost:3306/noticedb";
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
                    `}</Code>
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main'}>
                    <p>
                        모든 카테고리에 대하여 간략한 게시글 목록을 최신순으로 볼 수 있는 페이지
                    </p>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/Main.png'}
                    alt='main' />
                </Item>
                <Item subTitle={'Login'}>
                    <p>
                        Login 진행 페이지
                    </p>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/Login.png'}
                    alt='Login' />
                </Item>
                <Item subTitle={'SignUp'}>
                    <p>
                        회원 가입 진행 페이지
                    </p>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/SignUp.png'}
                    alt='SignUp' />
                </Item>
                <Item subTitle={'ContentList'}>
                    <p>
                        각 카테고리에 대한 게시글 목록을 최신 순으로 볼 수 있는 페이지
                    </p>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/ContentsList.png'}
                    alt='ContentsList' />
                </Item>
                <Item subTitle={'Content'}>
                    <p>
                        게시글 디테일 페이지
                    </p>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/ContentView.png'}
                    alt='ContentView' />
                </Item>
                <Item subTitle={'Comment'}>
                    <p>
                        게시글 디테일 페이지의 댓글 영역(로그인 시 화면)
                    </p>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/Comment_Login.png'}
                    alt='Comment' />
                </Item>
            </Section>

            <Section title={'FLOWCHART'}>
                <Item subTitle={'SystemArchitecture'}>
                    <p>
                        전체 시스템 구조
                    </p>
                    <ProjectImage src={'/img/projectImg/NoticeBoard/SystemArchitecture.png'} alt='.'/ >
                </Item>
                <Item subTitle={'Client - Server 작동 흐름'}>
                    <p>
                        Login 플로우 차트로, Client 요청에 대한 기본적인 작동 흐름이다.
                    </p>
                    <ProjectImage src={'/img/projectImg/NoticeBoard/Architecture.png'} alt='.'/ >
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'Client Request'}>
                    <p>로그인 페이지의 코드로 form의 'action'과 'method' 속성을 통해 요청 형식을 지정한다.</p>
                    <p>input의 name을 통해 요청 파라미터의 key를 지정하며, 'type="submit"'을 사용하여 요청을 전송한다. </p>
                    <Code language={'html'}>
                        {`
<div class="login-container">
    <h2>로그인</h2>
    <form action="/login_Servlet" method="post">
        <input type="text" name="id" placeholder="아이디" required>
        <input type="password" name="password" placeholder="비밀번호" required>
        <input type="submit" value="로그인">
    </form>
</div>
                        `}
                    </Code>
                </Item>
                <Item subTitle={'Servlet Response'}>
                    <p>Cilent의 요청 파라미터를 수신하고 응답.</p>
                    <p>HttpServletRequest을 통해 사용자의 요청을 받는다.</p>
                    <p>HttpServletResponse 통해 사용자의 요청에 응답한다.</p>
                    <Code language={'java'}>
                        {`
@WebServlet("/login_Servlet")
public class login_Servlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
    throws ServletException, IOException {
        // 폼에서 전송된 데이터를 받기
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        
        HttpSession session = request.getSession();
        request.getRequestDispatcher("index.jsp").forward(request, response);
    }
}
                        `}
                    </Code>
                </Item>
                <Item subTitle={'Login & Session'}>
                    <Section title={''}>
                        <Item subTitle={'Login'}>
                            <p>DB에 존재하는 동일한 ID에 대하여 PASSWORD를 검증한다.</p>
                            <p>로그인 성공 시 0을 반환하며,</p>
                            <p>비밀번호 불일치: -1, ID 오류: -2, 예외발생 시:  -3를 반환 한다.</p>
                            <Code language={'java'}>
                                {`
try {
    pstmt = conn.prepareStatement(SQL);
    pstmt.setString(1, ID);
    rs = pstmt.executeQuery();
    if (rs.next()) {
        String storedPassword = rs.getString("PASSWORD");
    
        if (storedPassword.equals(PASSWORD))
            return 0; // 로그인 성공
        else 
            return -1; // 비밀번호 불일치
    } else
        return -2; // 사용자가 존재하지 않음
}catch (SQLException e) {
    e.printStackTrace();
    return -3; // SQL 예외 발생
}finally {
    closeResources(rs, pstmt);
}
                                `}
                            </Code>
                        </Item>
                        <Item subTitle={'Login Session'}>
                            <p>Login인 성공적으로 완료된 경우 Session을 통해 해당 정보를 저장한다.</p>
                            <p>생성한 세션의 대한 정보는 Client에게 전달 된다.</p>
                            <Code language={'java'}>
                                {`
HttpSession session = request.getSession();
session.setAttribute("login_check",id);
request.setAttribute("check", loginResult);
request.getRequestDispatcher("index.jsp")
.forward(request, response);
                                `}
                            </Code>
                        </Item>
                    </Section>
                </Item>
                
                <Item subTitle={'Pagination'}>                    
                    <Section title={''}>
                        <Item subTitle={'Servlet'}>
                            <p>시작 번호와 마지막 번호를 계산하여 DB에 요청, DB의 결과를 하나씩 list에 담아 반환값 생성</p>
                            <Code language={'java'}>
                                {`
try {
    conn = dao.getconnection();
    pstmt = conn.prepareStatement(SQL);
    int setStartId = page_size*(pageNumber-1);
    int setLastId = page_size;
    System.out.println("setLastId :"+setStartId);
    pstmt.setInt(1, setStartId);
    pstmt.setInt(2, setLastId);
    
    rs = pstmt.executeQuery();
    
    while (rs.next()) {
        contents content = new contents();

        content.setTitle(rs.getString("title"));
        content.setId(rs.getInt("id"));
        content.setContents_img(rs.getString("contents_img"));
        list.add(content);
    }
}
                                `}
                            </Code>
                        </Item>                        
                        <Item subTitle={'Query'}>
                            <p>파라미터로 전달 받은 setStartId와 setLastId를 통해 정해진 위치와 양의 게시글 정보를 가져온다.</p>
                            <Code language={'java'}>
                                {`
String SQL
= "SELECT * FROM contents ORDER BY id DESC LIMIT ?,?";
pstmt.setInt(1, setStartId);
pstmt.setInt(2, setLastId);
                                `}
                            </Code>
                        </Item>
                        <Item subTitle={'JSP'}>
                            <p>JSP 페이지에서 Java를 활용하여 게시글 목록 적용</p>
                            <Code language={'html'}>
                                {`
<ul>
    <%
        
        int pageNumber = 1;
        Content_mainlist mainlist = new Content_mainlist();

        if (request.getParameter("setpageNumber") != null){
            pageNumber 
            = Integer
            .parseInt(request.getParameter("setpageNumber"));
        }
        ArrayList<contents> list = mainlist.getList(pageNumber);
        
        for (int i = 0; i < list.size(); i++){
            System.out.println("i :"+ i);
            System.out.println("list.size() :"+ list.size());	
    %>
    <li>
    <% if( list.get(i).getContents_img().equals("1")){ %>
        <img src="upload/1.jpg">
    <%}else{ %>
        <img src="upload/<%= list.get(i).getContents_img() %>">
    <%} %>
        <a 
        href="/contentDetail_Servlet?
        id=<%= list.get(i).getId()%>">
        <%= list.get(i).getTitle() %></a>
    </li>
    <%} %>
</ul>
<%
int total_pageNumber = mainlist.getLastId() / 5;
total_pageNumber += (mainlist.getLastId() % 5 != 0) ? 1 : 0;
for (int i = 1; i <= total_pageNumber; i++){%>
<a href="index.jsp?setpageNumber=<%= i %>"><%= i %></a>
<% } %>
                                `}
                            </Code>
                        </Item>
                    </Section>
                </Item>
                <Item subTitle={'Duplicate Images'}>
                    <Section title={''}>
                        <Item subTitle={'Servlet'}>
                            'delete_img' 함수를 통해 게시판 수정 시 기존의 이미지를 우선적으로 삭제한다.
                            'db_img'의 기본 값은 '1'로 db의 'content' 테이블의 'id'가 1이 아니라면 이미지를 삭제한다.
                            기존의 이미지가 유지되기를 바라는 사용자의 경우 다시 한 번 동일한 이미지를 업로드해줘야한다.
                            <Code language={'JAVA'}>{`delete_img(id);`}</Code>
                            <Code language={'JAVA'}>
                                {`
private void delete_img(int id) {
    String db_img = "0";
    String SQL = "SELECT contents_img FROM contents WHERE id = ?";
    try{
        conn = dao.getconnection();
        pstmt = conn.prepareStatement(SQL);
        pstmt.setInt(1, id);
        rs = pstmt.executeQuery();

        if(rs.next()) {
            db_img = rs.getString("contents_img");
        }
    } catch (SQLException e) {e.printStackTrace();}
    
    if (! db_img.equals("1")) {
        String filePath = getServletContext().getRealPath("/upload/");
        filePath += db_img;
        System.out.println("filePath :"+ filePath);
        File f = new File(filePath);
        f.delete();
    }
}
                                `}
                            </Code>
                        </Item>
                    </Section>
                </Item>
            </Section>

            <Section title={'DataBase'}>
                <Item subTitle={'null'}>
                    <ProjectImage src={'/img/projectImg/NoticeBoard/diagram.png'} alt='Diagram' maxWidth='40%' />
                </Item>
            </Section>


            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. POST 중복 요청'}>
                    <p>
                        댓글을 등록한 후 해당 페이지를 새로고침할 경우 댓글이 중복으로 작성되는 현상이 발견됨.
                    </p>
                    <p>
                        POST 방식으로 댓글 등록 요청을 처리한 후 Sevlet는 forwoard를 이용해 동일한 페이지를 응답한다.
                    </p>
                    <p>
                        이러한 방식은 실제로 페이지를 새로 로드하는 것 보다는 페이지의 렌더링만 변경하는 것과 유사하며, 아직 POST요청 객체를 가지고있던 페이지는 새로고침 시 동일한 요청을 재전송하는 문제가 발생하였다.
                    </p>
                    <p>
                        이를 해결하기 위해 JSP파일 자체에서 요청객체를 생성하지 않고 AJAX를 통해 댓글과 관련된 요청을 처리하였다.
                    </p>
                    <p>
                        이러한 처리를 할경우 Servlet과 Client는 Js를 통해서만 요청을 주고 받게 되기 때문에 새로고침으로 인한 재요청 문제를 해결할 수 있다. 
                    </p>
                </Item>
                <Item subTitle={'2. Login Session Check'}>
                    <p>
                        로그인 후 페이지에 접속을 할 경우 Login 여부를 확인할 수 없었다.
                    </p>
                    <p>
                        로그인 시 login_check KEY를 사용하는 Session을 생성하였으며, 사용자가 페이지에 접속할 때마다 해당 Session의 여부를 확인한다.
                    </p>
                    <p>
                        JSP내부에 조건문을 사용하여 로그인 시 로직을 활용할 수 있게 되었다.
                    </p>
                </Item>
            </Section>
        </div>
    );
}