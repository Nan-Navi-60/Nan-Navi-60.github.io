import Image from 'next/image'
import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';

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
                        MariaDB와의 호완이 가능하며, Java Servlet과의 통신하여 요청에 대한 응답을 처리한다.
                    </p>
                    <p>
                        사용자, 게시글, 댓글의 정보를 저장하며, 사용자의 id를 게시글과 댓글에서 상속받아 연관관계를 명확히 한다.
                    </p>
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main'}>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/Main.png'}
                    alt='main' />
                </Item>
                <Item subTitle={'ContentList'}>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/ContentsList.png'}
                    alt='ContentsList' />
                </Item>
                <Item subTitle={'Content'}>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/ContentView.png'}
                    alt='ContentView' />
                </Item>
                <Item subTitle={'Comment'}>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/comment_Login.png'}
                    alt='Comment' />
                </Item>
                <Item subTitle={'Login'}>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/Login.png'}
                    alt='Login' />
                </Item>
                <Item subTitle={'SignUp'}>
                    <ProjectImage
                    src={'/img/projectImg/NoticeBoard/SignUp.png'}
                    alt='SignUp' />
                </Item>
            </Section>

            <Section title={'DataBase'}>
                <Item subTitle={'null'}>
                    <ProjectImage src={'/img/projectImg/NoticeBoard/diagram.png'} alt='Diagram' />
                </Item>
            </Section>

            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. POST 중복 요청'}>
                    <p>
                        댓글을 등록한 후 해당 페이지를 새로고침할 경우 댓글이 중복으로 작성되는 현상이 발견됨.
                    </p>
                    <p>
                        POST로 요청을 보대는 댓글의 경우 GET요청과 달리 페이지를 리로드 하지 않고 해당 페이지의 상태를 유지하게 된다.
                    </p>
                    <p>
                        이때 HTML의 "form" Element는 해당 요청의 요청객체를 가지고 있어 새로 고침을 시도하면 해당 요청을 다시 전송하는 작업을 수행하게 된다.
                        이를 해결하기 위해 JSP파일 자체에서 요청객체를 생성하지 않고 AJAX를 통해 댓글과 관련된 요청을 처리하였다.
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