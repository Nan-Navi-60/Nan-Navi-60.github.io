import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';
import Mermaid from '../ui/Mermaid';

export default async function ProjectDetail() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">포켓몬 카드 덱 생성 사이트</h1>

            <Section title={'INDEX'}>
                <Item subTitle={'포켓몬 카드 게임 덱 생성 및 공유 플랫폼'}>
                    <p>1. 포켓몬 카드 게임의 덱을 미리 생성해 볼 수 있는 웹 사이트</p>
                    <p>2. 복잡한 카드 선택 로직을 통한 정확한 덱 구성 (동일 카드 2장 제한, 동명 카드 통합 관리)</p>
                    <p>3. 덱 공유 게시판을 통한 사용자 간 덱 전략 공유 및 소통</p>
                    <p>4. JavaScript 난독화와 JWT를 통한 클라이언트 사이드 코드 보안 강화</p>
                </Item>
            </Section>

            <Section title={'INTRODUCE'}>
                <Item subTitle={'Spring Boot'}>
                    <p>
                        Java 기반 웹 프레임워크로 MVC 패턴을 적용하여 체계적인 웹 애플리케이션을 구축했다.
                    </p>
                    <p>
                        Controller-Service-Mapper 계층 구조로 관심사를 분리하고, fetch를 통해 프론트엔드와 통신한다.
                    </p>
                    <p>
                        @Controller, @Service, @Mapper 어노테이션으로 각 계층의 역할을 명확히 구분했다.
                    </p>
                </Item>
                <Item subTitle={'MyBatis'}>
                    <p>
                        SQL 매퍼 프레임워크로 복잡한 카드 데이터 조회와 덱 관리 쿼리를 효율적으로 처리한다.
                    </p>
                    <p>
                        동적 쿼리를 활용하여 카드 타입별, 속성별 필터링 기능을 구현했다.
                    </p>
                    <Code language={'xml'}>
                    {`
<select id="getCardsByType" resultType="CardDTO">
    SELECT * FROM card_info 
    WHERE 1=1
    <if test="cardType != null">
        AND card_type = #{cardType}
    </if>
    <if test="cardClass != null">
        AND card_class = #{cardClass}
    </if>
    ORDER BY card_index
</select>
                    `}
                    </Code>
                </Item>
                <Item subTitle={'JavaScript + Bootstrap'}>
                    <p>
                        복잡한 덱 생성 로직을 JavaScript로 구현하고, Bootstrap으로 반응형 UI를 제작했다.
                    </p>
                    <p>
                        카드 선택, 중복 체크, 동명 카드 관리 등의 핵심 기능을 클라이언트 사이드에서 처리한다.
                    </p>
                </Item>
                <Item subTitle={'JWT + SessionStorage 하이브리드 인증'}>
                    <p>
                        서버 사이드에서는 JWT 토큰을 쿠키에 저장하여 API 인증을 처리하고, 클라이언트에서는 SessionStorage로 UI 상태를 관리한다.
                    </p>
                    <p>
                        이중 인증 방식으로 보안성과 사용자 경험을 모두 확보했다.
                    </p>
                    <Code language={'java'}>
                    {`// 서버: JWT 토큰을 쿠키에 저장
String token = JwtUtil.generateToken(userDTO.getUser_id());
JwtUtil.addTokenToCookie(response, token);

// 클라이언트로 사용자 정보 전송
result.put("user_name", userInfo.getUser_name());`}
                    </Code>
                    <Code language={'javascript'}>
                    {`// 클라이언트: SessionStorage에 사용자 정보 저장
if(data.success){
    sessionStorage.setItem('user_name', data.user_name);
    window.location.href="/";
}

// UI에서 로그인 상태 체크
if(!sessionStorage.getItem("user_name")){
    alert("로그인 시 사용가는한 기능입니다.");
    return;
}`}
                    </Code>
                </Item>
                <Item subTitle={'JavaScript 난독화 (Node.js)'}>
                    <p>
                        클라이언트 사이드 JavaScript 코드를 보호하기 위해 javascript-obfuscator를 사용했다.
                    </p>
                    <p>
                        Gradle과 연동하여 빌드 시 자동으로 JS 파일을 난독화하고 dist 폴더에 배포한다.
                    </p>
                    <Code language={'json'}>
                    {`{
  "name": "static",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "obfuscate-js": "javascript-obfuscator js --output dist/js --compact true",
    "obfuscate-controller": "javascript-obfuscator controller --output dist/controller --compact true",
    "build": "npm run obfuscate-js && npm run obfuscate-controller"
  },
  "devDependencies": {
    "javascript-obfuscator": "^4.1.1"
  }
}`}
                    </Code>
                    <Code language={'gradle'}>
                    {`node {
    version = '22.13.0'
    npmVersion = '10.9.2'
    download = true
    workDir = file("\${project.buildDir}/nodejs")
    nodeModulesDir = file("\${projectDir}/src/main/resources/static")
}

task obfuscateJs(type: NpmTask) {
    args = ['run', 'obfuscate-js']
    workingDir = file("\${projectDir}/src/main/resources/static")
}

task obfuscateController(type: NpmTask) {
    args = ['run', 'obfuscate-controller']
    workingDir = file("\${projectDir}/src/main/resources/static")
}

processResources {
    dependsOn buildFrontend
    from("\${projectDir}/src/main/resources/static/dist/js") {
        into 'static/js'
    }
    from("\${projectDir}/src/main/resources/static/dist/controller") {
        into 'static/controller'
    }
}`}
                    </Code>
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main Page'}>
                    <p>포켓몬 카드 덱 생성 사이트 메인 페이지</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/Main.png'} alt='Main' />
                </Item>
                <Item subTitle={'Navigation Menu'}>
                    <p>메인 페이지 드롭다운 네비게이션 메뉴</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/Main-DropBox.png'} alt='MainDropdown' />
                </Item>
                <Item subTitle={'User Authentication'}>
                    <p>로그인 및 회원가입 페이지</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/Login.png'} alt='Login' />
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/SignUp.png'} alt='SignUp' />
                </Item>
                <Item subTitle={'Deck Creation Interface'}>
                    <p>덱 생성 페이지 - 카드 선택 및 덱 구성</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/CreateDeckPage.png'} alt='CreateDeck' />
                </Item>
                <Item subTitle={'Card Selection System'}>
                    <p>카드 선택 시 상단 덱 구성 영역에 표시 (1/2, 2/2 카운터 포함)</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/CreateDeckPage-Selected.png'} alt='CardSelection' />
                </Item>
                <Item subTitle={'Deck Upload Process'}>
                    <p>완성된 덱을 게시판에 업로드하는 과정</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/CreateDeckPage-Upload.png'} alt='DeckUpload' />
                </Item>
                <Item subTitle={'Deck Sharing Board'}>
                    <p>사용자들이 공유한 덱 목록 게시판</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/DeckContentList.png'} alt='DeckList' />
                </Item>
                <Item subTitle={'Deck Detail View'}>
                    <p>덱 상세 보기 - 구성 카드 및 설명 표시</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/ContendView-Top.png'} alt='DeckDetail-Top' />
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/ContentView-Bottom.png'} alt='DeckDetail-Bottom' />
                </Item>
                <Item subTitle={'Comment and Like System'}>
                    <p>댓글 작성 및 좋아요/싫어요 기능</p>
                    <ProjectImage src={'/img/projectImg/PokemonDecksplorer/ContentView-Bottom-Edit.png'} alt='ContentEdit' />
                </Item>
            </Section>

            <Section title={'FLOWCHART'}>
                <Item subTitle={'JWT Authentication Flow'}>
                    <p>로그인부터 토큰 생성, 쿠키 저장, API 인증까지의 전체 흐름</p>
                    <Mermaid chart={`
sequenceDiagram
    participant C as Client
    participant S as Server
    participant DB as Database
    participant Cookie as Browser Cookie
    participant Session as SessionStorage

    C->>S: POST /login (user_id, user_pw)
    S->>DB: SELECT user validation
    DB-->>S: User info
    S->>S: Generate JWT Token
    S->>Cookie: Set JWT in Cookie
    S-->>C: Login success + user_name
    C->>Session: Store user_name
    
    Note over C,Session: Subsequent API Calls
    C->>S: API Request (JWT in Cookie)
    S->>S: Extract & Validate JWT
    S->>DB: Execute API Logic
    DB-->>S: Data Response
    S-->>C: API Response
                    `} />
                </Item>
                <Item subTitle={'Deck Creation Flow'}>
                    <p>카드 선택부터 덱 완성, 게시판 업로드까지의 프로세스</p>
                    <Mermaid chart={`
flowchart TD
    A[카드 타입 선택] --> B[카드 목록 로드]
    B --> C[카드 클릭]
    C --> D{동일 카드 2장 체크}
    D -->|2장 초과| E[경고 메시지]
    D -->|가능| F[selectedCardList에 추가]
    F --> G[상단 덱 구성 영역 표시]
    G --> H[하단 카드에 카운터 표시]
    H --> I{20장 완성?}
    I -->|미완성| C
    I -->|완성| J[덱 제목/설명 입력]
    J --> K[게시판에 업로드]
    K --> L[덱 목록 페이지로 이동]
                    `} />
                </Item>
                <Item subTitle={'JavaScript Obfuscation Process'}>
                    <p>빌드 시 JavaScript 파일 난독화 과정</p>
                    <Mermaid chart={`
flowchart LR
    A[Original JS Files] --> B[Gradle Build]
    B --> C[Node.js Plugin]
    C --> D[npm run build]
    D --> E[javascript-obfuscator]
    E --> F[Obfuscated Files]
    F --> G[dist/js/ folder]
    G --> H[Spring Boot Resources]
    
    subgraph "Build Process"
        I[cleanDist] --> J[obfuscateJs]
        J --> K[obfuscateController]
        K --> L[processResources]
    end
                    `} />
                </Item>
            </Section>

            <Section title={'DATABASE'}>
                <Item subTitle={'ERD'}>
                    <p>User, Board, Card, Like, Comment 테이블 관계도</p>
                    <Mermaid chart={`
erDiagram
    user ||--o{ board : writes
    user ||--o{ comment : writes
    user ||--o{ board_likes : likes
    board ||--o{ comment : has
    board ||--o{ board_likes : receives
    card ||--o{ board : used_in

    user {
        string user_id PK
        string user_pw
        string user_name
    }
    
    board {
        int board_id PK
        string user_id FK
        string board_title
        text board_contents
        text board_cardlist
        string board_writer
        timestamp board_writedate
        int board_like
        int board_dislike
    }
    
    card {
        string card_index PK
        string card_name
        string card_class
        string card_type
        string card_rank
    }
    
    comment {
        int comment_id PK
        int board_id FK
        string user_id FK
        text comment_content
        timestamp created_at
    }
    
    board_likes {
        int id PK
        int board_id FK
        string user_id FK
        boolean liked
    }
                    `} />
                </Item>
                <Item subTitle={'Database Schema Details'}>
                    <p>주요 테이블별 상세 구조 및 제약 조건</p>
                    <p>• <strong>user 테이블</strong>: 사용자 기본 정보 관리</p>
                    <p>• <strong>board 테이블</strong>: 덱 게시글 정보, board_cardlist에 카드 정보 문자열 저장</p>
                    <p>• <strong>card 테이블</strong>: 포켓몬 카드 마스터 데이터</p>
                    <p>• <strong>comment 테이블</strong>: 게시글별 댓글 관리</p>
                    <p>• <strong>board_likes 테이블</strong>: 좋아요/싫어요 중복 방지를 위한 복합 유니크 제약</p>
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'복잡한 덱 생성 로직 구현'}>
                    <Section title={''}>
                        <Item subTitle={'카드 선택 및 중복 체크 시스템'}>
                            <p>포켓몬 카드 게임 규칙에 따라 동일한 카드는 최대 2장까지만 선택 가능하도록 구현했다.</p>
                            <p>동명 카드 통합 관리: "이상해꽃"과 "이상해꽃 ex"는 동일한 포켓몬으로 취급하여 합쳐서 2장 제한을 적용한다.</p>
                            <ProjectImage src={'/img/projectImg/PokemonDecksplorer/CreateDeckPage-Selected.png'} alt='Card Selection Logic' maxWidth='70%' />
                            <Code language={'javascript'}>
                            {`// 카드 선택 시 중복 체크 로직
const cardImageWrap = document.getElementById('cardimagewrap');
cardImageWrap.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName !== 'IMG') {
        return;
    }
    
    // 20개 이상 등록 시 종료
    if(selectedCardList.length > 19){
        alert("20개 이상은 That's no no~");
        return;
    }

    // 동일한 카드명으로 필터링 (동명 카드 통합 관리)
    const card = filterArray(target.alt);
    if(card){
        if(card.length > 1){
            alert("동일한 카드는 최대 2장까지 가능합니다.");
            return;
        }
    }

    const cardNo = target.dataset.tag;
    const cardAlt = target.alt;
    const cardSrc = target.src;

    selectedCardList.push({no: cardNo, alt: cardAlt, src: cardSrc});
    
    // 카드 번호순 정렬
    selectedCardList.sort((a,b) => {
        const numA = parseInt(a.no.split('-')[1],10);
        const numB = parseInt(b.no.split('-')[1],10);
        const prefixComparison = a.no.split('-')[0].localeCompare(b.no.split('-')[0]);
        return prefixComparison !== 0 ? prefixComparison : numA - numB;
    });

    const countCard = document.getElementById("countcard");
    countCard.innerText = \`\${selectedCardList.length} / 20\`;

    selectCard();
    selectCount(target);
});

// 동일한 카드명 필터링 함수
function filterArray(alt){
    return selectedCardList.filter(card => card.alt === alt);
}`}
                            </Code>
                        </Item>
                        <Item subTitle={'상단/하단 카드 표시 시스템'}>
                            <p>하단에서 카드 선택 시 상단 덱 구성 영역에 표시하고, 상단에서 클릭 시 카드 제거가 가능하다.</p>
                            <p>각 카드에 1/2, 2/2 형태의 카운터를 표시하여 현재 선택된 장수를 시각적으로 보여준다.</p>
                            <Code language={'javascript'}>
                            {`// 하단 카드에 선택 횟수 표시
function selectCount(image){
    const parentDiv = image.parentElement;
    parentDiv.style.position = "relative";

    const existingText = parentDiv.querySelector('.text-overlay');
    if(existingText){
        existingText.remove();
    }
    const card = selectedCardList.filter(card => card.no === image.dataset.tag);
    if(card.length == 0) return;
    const textDiv = document.createElement('div');
    textDiv.classList.add("text-overlay");
    addClass(textDiv);
    cardCounter(textDiv, image.dataset.tag);
    parentDiv.appendChild(textDiv);
}

// 카드 카운터 표시 (1/2, 2/2)
function cardCounter(textDiv, cardNo){
    const card = selectedCardList.filter(card => card.no === cardNo);
    const count = card.length;
    if(count == 2){
        textDiv.innerText = \`2/2\`;
    }else{
        textDiv.innerText = \`1/2\`;
    }
}

// 상단 선택된 카드 표시 및 제거 기능
const selectedImage = document.getElementById('selectedimage');
selectedImage.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
        const index = selectedCardList.findIndex(findIndex => findIndex.src === event.target.src);
        selectedCardList.splice(index, 1);
        selectCard();

        const image = cardImageWrap.querySelector(\`img[data-tag="\${event.target.dataset.tag}"]\`);
        selectCount(image);
    }
});`}
                            </Code>
                        </Item>
                        <Item subTitle={'덱 완성 및 업로드'}>
                            <p>정확히 20장의 카드로 덱을 구성해야 하며, 완성된 덱은 게시판에 공유할 수 있다.</p>
                            <Code language={'javascript'}>
                            {`const postButton = document.getElementById("postbutton");
postButton.addEventListener('click', () => {
    if(!sessionStorage.getItem("user_name")){
        alert("로그인 시 사용가는한 기능입니다.");
        return;
    }

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;

    // 20장 체크
    if(selectedCardList.length !== 20){
        alert("20장을 채워주세요.");
        return;
    }

    // 카드 정보를 문자열로 변환
    let images = null;
    selectedCardList.forEach(element => {
        const no = element.no;
        const alt = element.alt;
        let temp = no + "_" + alt;

        if(images === null){
            images = temp;
            return;
        }

        temp = "," + temp;
        images += temp;
    });
    
    addPost(postTitle, postContent, images);
});`}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'JavaScript 난독화 시스템'}>
                    <Section title={''}>
                        <Item subTitle={'빌드 프로세스 통합'}>
                            <p>Gradle 빌드 시스템과 Node.js를 연동하여 JavaScript 파일을 자동으로 난독화한다.</p>
                            <Code language={'gradle'}>
                            {`// build.gradle - Node.js 설정
node {
    version = '20.18.1'
    npmVersion = '10.9.2'
    download = true
    workDir = file("\${project.buildDir}/nodejs")
    nodeModulesDir = file("\${projectDir}/src/main/resources/static/js")
}

// JavaScript 난독화 태스크
task obfuscateJs(type: NpmTask) {
    args = ['run', 'build']
    workingDir = file("\${projectDir}/src/main/resources/static/js")
}

task obfuscateController(type: NpmTask) {
    args = ['run', 'build']
    workingDir = file("\${projectDir}/src/main/resources/static/controller")
}

// 빌드 프로세스에 통합
task buildFrontend {
    dependsOn cleanDist, obfuscateJs, obfuscateController
}

processResources {
    dependsOn buildFrontend
    duplicatesStrategy = duplicatesStrategy.EXCLUDE
    from("\${projectDir}/src/main/resources/static/dist/js") {
        into "static/dist/js"
    }
}`}
                            </Code>
                        </Item>
                        <Item subTitle={'난독화 설정'}>
                            <p>javascript-obfuscator를 사용하여 클라이언트 사이드 코드를 보호한다.</p>
                            <Code language={'json'}>
                            {`
// package.json
{
  "name": "pokemon-decksplorer-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "obfuscate-js": "javascript-obfuscator js --output dist/js --compact true",
    "obfuscate-controller": "javascript-obfuscator controller --output dist/controller --compact true",
    "build": "npm run obfuscate-js && npm run obfuscate-controller"
  },
  "devDependencies": {
    "javascript-obfuscator": "^4.1.1"
  }
}
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'JWT 인증 및 사용자 관리'}>
                    <p>로그인한 사용자만 덱 생성 및 게시글 작성이 가능하도록 JWT 토큰으로 인증을 관리한다.</p>
                    <Code language={'java'}>
                    {`@PostMapping("/addPost")
@ResponseBody
public Map<String, Object> addPost(HttpServletRequest cookie, @RequestBody Map<String, Object> map){
    Map<String, Object> result = new HashMap<>();

    String token = JwtUtil.getTokenFromCookie(cookie);

    if(token == null){
        result.put("success", false);
        return result;
    }

    String board_title = (String) map.get("postTitle");
    String board_contents = (String) map.get("postContent");
    String board_images = (String) map.get("images");

    String user_id = JwtUtil.extractUserId(token);
    boolean resultBoolean = bService.addPost(user_id, board_title, board_contents, board_images);
    result.put("success", resultBoolean);
    
    return result;
}`}
                    </Code>
                </Item>

                <Item subTitle={'카드 데이터 관리'}>
                    <p>대용량의 포켓몬 카드 데이터를 효율적으로 관리하고 타입별, 속성별 필터링을 제공한다.</p>
                    <Code language={'java'}>
                    {`@PostMapping("/loadCard")
@ResponseBody
public List<CardDTO> loadCard(@RequestBody Map<String, String> parameter){
    String cardType = parameter.get("cardType");
    return cService.selectCard(cardType);
}`}
                    </Code>
                    <Code language={'javascript'}>
                    {`function setCard(data){
    const cardimagewrap = document.getElementById("cardimagewrap");
    cardimagewrap.innerHTML = \`\`;

    data.forEach(element => {
        const cardDiv = document.createElement("div");
        const cardImg = document.createElement("img");

        cardImg.classList.add("img-fluid");
        cardImg.src = \`image/card/\${element.card_index}_\${element.card_name}.png\`;
        cardImg.alt = element.card_name;
        cardImg.setAttribute('data-tag', element.card_index);

        cardimagewrap.appendChild(cardDiv);
        cardDiv.appendChild(cardImg);
        selectCount(cardImg);
    });
    
    const bottomCardContainer = document.getElementById("bottomcardcontainer");
    bottomCardContainer.scrollTop = 0;
}`}
                    </Code>
                </Item>
            </Section>

            <Section title={'DATABASE'}>
                <Item subTitle={'ERD'}>
                    <p>User, Board, Card, Like, Comment 테이블 관계도</p>
                    <Mermaid chart={`
erDiagram
    user ||--o{ board : writes
    user ||--o{ comment : writes
    user ||--o{ board_likes : likes
    board ||--o{ comment : has
    board ||--o{ board_likes : receives
    card ||--o{ board : used_in

    user {
        string user_id PK
        string user_pw
        string user_name
    }
    
    board {
        int board_id PK
        string user_id FK
        string board_title
        text board_contents
        text board_cardlist
        string board_writer
        timestamp board_writedate
        int board_like
        int board_dislike
    }
    
    card {
        string card_index PK
        string card_name
        string card_class
        string card_type
        string card_rank
    }
    
    comment {
        int comment_id PK
        int board_id FK
        string user_id FK
        text comment_content
        timestamp created_at
    }
    
    board_likes {
        int id PK
        int board_id FK
        string user_id FK
        boolean liked
    }
                    `} />
                </Item>
                <Item subTitle={'Database Schema Details'}>
                    <p>주요 테이블별 상세 구조 및 제약 조건</p>
                    <p>• <strong>user 테이블</strong>: 사용자 기본 정보 관리</p>
                    <p>• <strong>board 테이블</strong>: 덱 게시글 정보, board_cardlist에 카드 정보 문자열 저장</p>
                    <p>• <strong>card 테이블</strong>: 포켓몬 카드 마스터 데이터</p>
                    <p>• <strong>comment 테이블</strong>: 게시글별 댓글 관리</p>
                    <p>• <strong>board_likes 테이블</strong>: 좋아요/싫어요 중복 방지를 위한 복합 유니크 제약</p>
                </Item>
            </Section>

            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. 대용량 DB 데이터 처리'}>
                    <p>
                        기존 작업과 달리 많은 양의 포켓몬 카드 데이터를 DB에 저장해야 했고, 이 과정에서 데이터 오류가 빈번하게 발생했다.
                    </p>
                    <p>
                        카드 이미지 파일명과 DB 데이터 간의 불일치, 중복 데이터 삽입 등이 주요 원인이었다.
                    </p>
                    <p>
                        이를 개선하기 위해 Excel을 통해 파일 ISERTE문에 들어갈 Qurey문을 자동화 하여 완성하였다.
                    </p>
                </Item>
                <Item subTitle={'2. 동명 카드 통합 관리의 복잡성'}>
                    <p>
                        카드 이미지가 다르지만 동일한 포켓몬을 하나의 개체로 처리하는 과정에서 많은 시간이 소요되었다.
                    </p>
                    <p>
                        "거북왕"과 "거북왕 ex"처럼 동일한 포켓몬이지만 이름과 이미지가 다른 카드를 합쳐서 2장 제한을 적용해야 했다.
                    </p>
                    <p>
                        카드명에서 접미사를 제거하여 기본 포켓몬명을 추출하는 로직을 구현하고, 이를 기준으로 중복 체크를 수행했다.
                    </p>
                    <Code language={'javascript'}>
                    {`// 실제 프로젝트의 동명 카드 필터링 함수
function filterArray(alt){
    return selectedCardList.filter(card => card.alt === alt);
}

// 카드 선택 시 중복 체크
const card = filterArray(target.alt);
if(card){
    if(card.length > 1){
        alert("동일한 카드는 최대 2장까지 가능합니다.");
        return;
    }
}`}
                    </Code>
                </Item>
                <Item subTitle={'3. JavaScript 난독화 구현 문제'}>
                    <p>
                        Node.js를 통해 JavaScript 파일을 난독화하는 과정에서 이해도 부족으로 많은 문제가 발생했다.
                    </p>
                    <p>
                        난독화된 JS 파일이 정상적으로 저장되지 않거나, 경로가 맞지 않는 등의 문제로 많은 시간이 소요되었다.
                    </p>
                    <p>
                        Gradle과 Node.js 플러그인을 연동하여 빌드 시 자동으로 난독화가 수행되도록 구성했다.
                    </p>
                    <Code language={'gradle'}>
                    {`// build.gradle - Node.js 설정 및 난독화 태스크
node {
    version = '22.13.0'
    npmVersion = '10.9.2'
    download = true
    workDir = file("\${project.buildDir}/nodejs")
    nodeModulesDir = file("\${projectDir}/src/main/resources/static")
}

task obfuscateJs(type: NpmTask) {
    args = ['run', 'obfuscate-js']
    workingDir = file("\${projectDir}/src/main/resources/static")
}

task obfuscateController(type: NpmTask) {
    args = ['run', 'obfuscate-controller']
    workingDir = file("\${projectDir}/src/main/resources/static")
}

processResources {
    dependsOn buildFrontend
    from("\${projectDir}/src/main/resources/static/dist/js") {
        into 'static/js'
    }
    from("\${projectDir}/src/main/resources/static/dist/controller") {
        into 'static/controller'
    }
}`}
                    </Code>
                    <Code language={'json'}>
                    {`// package.json - 난독화 스크립트 설정
{
  "scripts": {
    "obfuscate-js": "javascript-obfuscator js --output dist/js --compact true",
    "obfuscate-controller": "javascript-obfuscator controller --output dist/controller --compact true",
    "build": "npm run obfuscate-js && npm run obfuscate-controller"
  },
  "devDependencies": {
    "javascript-obfuscator": "^4.1.1"
  }
}`}
                    </Code>
                </Item>
                <Item subTitle={'4. 모바일 반응형 디자인 한계'}>
                    <p>
                        모바일을 기준으로 웹디자인을 작업했으나, 다양한 모델에 따라 유동적으로 적용되는 페이지 구현에 어려움이 있었다.
                    </p>
                    <p>
                        Bootstrap의 그리드 시스템을 활용했지만, 카드 이미지 크기와 레이아웃이 일부 기기에서 최적화되지 않았다.
                    </p>
                    <p>
                        CSS 미디어 쿼리와 Bootstrap의 반응형 클래스를 조합하여 주요 해상도에서 안정적으로 동작하도록 개선했다.
                    </p>
                </Item>
                <Item subTitle={'5. DB 저장 공간 비효율성'}>
                    <p>
                        게시판 DB에 카드 이미지가 순수 파일명으로 저장되어 불필요하게 저장공간을 사용하게 되었다.
                    </p>
                    <p>
                        카드 정보를 문자열로 연결하여 저장하는 방식으로 인해 데이터 중복과 공간 낭비가 발생했다.
                    </p>
                    <p>
                        카드 ID를 게시판 DB에 저장하고, 게시물 조회 시 ID를 통해 이미지를 가져오는 방식으로 개선 방향을 설정했다.
                    </p>
                    <Code language={'javascript'}>
                    {`// 현재 방식: 카드 정보를 문자열로 저장
selectedCardList.forEach(element => {
    const no = element.no;
    const alt = element.alt;
    let temp = no + "_" + alt;

    if(images === null){
        images = temp;
        return;
    }

    temp = "," + temp;
    images += temp;
});

// 개선 방향: 카드 ID만 저장하여 공간 효율성 향상
// "card_001,card_002,card_001" 형태로 저장`}
                    </Code>
                </Item>
            </Section>
        </div>
    );
}
