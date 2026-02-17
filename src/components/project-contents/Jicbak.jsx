import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';

export default function ProjectDetail(){
return (
        <div className="project-detail-container">
                <h1 className="detail-title">SpringBoot 게시판 사이트</h1>

                <Section title={'INDEX'}>
                    <Item subTitle={'SpringBoot FrameWork의 이해도를 높이고 NoticeBoard를 개선.'}>
                        <p>
                            1. 이미 만들어진 웹 디자인을 가져와 적용하여 UI 개선.
                        </p>
                        <p>
                            2. JQuery를 활용하여 안정적이고 유연한 통신.
                        </p>
                        <p>
                            3. 모듈화된 패키지 분류로 유지 보수성 증가.
                        </p>
                    </Item>
                </Section>

                <Section title={'INTRODUCE'}>
                    <Item subTitle={'MVC를 통한 모듈화'}>
                        <p>
                            사이트의 기능을 Controller와 View, Module로 분할하여 유지 보수성을 높힌다.
                        </p>
                        <p>
                            기존의 Jsp를 통한 방식과 달리 기능을 Js파일로 분리하여 수정 및 추가 등의 기능을 개별적으로 관리할 수 있다.
                        </p>
                        <p>
                            기존의 기능별 Class를 새로 생성하던 Servlet 방식과 달리 User, Content 등 각 역할에 따라 Class를 만들었으며, Controller에서 필요한 기능을 Service에서 호출한다. 
                        </p>
                    </Item>
                    <Item subTitle={'JQuery를 활용한 비동기 통신'}>
                        <p>
                            JQuery의 Ajax를 활용하여 서버와 비동기 통신을 진행한다.
                        </p>
                        <p>
                            success와 error함수를 통해 통신 성공과 실패의 동작을 명확하여 분리 할 수 있다.
                        </p>
                        <p>
                            비동기 통신을 통해 여러 요청을 별개의 동작으로 수행하여 빠르게 처리할 수 있으며, success함수를 활용하여 통신 간의 순서를 보장할 수 있게 된다.
                        </p>
                    </Item>
                    <Item subTitle={'BootStrap을 활용한 웹 디자인 적용'}>
                        <p>
                            BootStrap으로 작성된 웹 디자인 파일을 다운받아 사이트에 적용
                        </p>
                        <p>
                            개발자가 직접 작성한 CSS가 아닌 형식이 정해져있는 Bootstrap을 활용하였기 때문에 페이지의 수정이 용이하다.
                        </p>
                        <p>
                            이미 정해진 스타일을 적용하는 방식으로 사용자에게 통일감 있고 완성도 높은 UI를 제공할 수 있다. 
                        </p>
                    </Item>
                </Section>
        </div>
    );
}