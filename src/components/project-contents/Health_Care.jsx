import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';
import Mermaid from '../ui/Mermaid';

export default async function ProjectDetail() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">AI 기반 식단 분석 시스템</h1>

            <Section title={'INDEX'}>
                <Item subTitle={'AI 캐릭터 기반 개인 맞춤형 건강 관리 시스템'}>
                    <p>1. 다양한 페르소나를 가진 AI 캐릭터와의 자연스러운 대화형 건강 상담</p>
                    <p>2. YOLOv9 + 커스텀 데이터셋을 활용한 한국 음식 특화 이미지 인식</p>
                    <p>3. 사용자 개인정보 기반 맞춤형 식단 추천 및 건강 관리</p>
                    <p>4. 파일 기반 대화 기록 관리를 통한 AI 기억력 보강 및 토큰 최적화</p>
                </Item>
            </Section>

            <Section title={'INTRODUCE'}>
                <Item subTitle={'Django'}>
                    <p>
                        Python 기반 웹 프레임워크로 기능별 앱 분리 설계를 통해 유지보수성을 높였다.
                    </p>
                    <p>
                        chat(이미지 업로드·템플릿), gemini(AI 대화·프롬프트), myyolo(YOLO 분석·영양정보), user(인증·개인정보), index(메인페이지), common(공통기능) 앱으로 구성하여 각 기능을 독립적으로 관리한다.
                    </p>
                    <p>
                        세션 기반 인증과 CSRF 보호를 통해 보안성을 확보하고, 일관된 JSON 응답 스키마를 사용한다.
                    </p>
                </Item>
                <Item subTitle={'Frontend (HTML/CSS/JS + Bootstrap + jQuery)'}>
                    <p>
                        메신저 형태의 UI로 좌측 캐릭터 목록, 우측 대화 영역을 배치했다.
                    </p>
                    <p>
                        아이보리 베이스 + 딥그린 포인트 컬러로 건강과 신뢰감을 전달하며, Bootstrap 모달을 활용한 사용자 정보 편집 기능을 제공한다.
                    </p>
                    <p>
                        AJAX 기반 실시간 채팅과 이미지 업로드 진행률 표시, 페이지 새로고침 없는 캐릭터 전환 기능을 구현했다.
                    </p>
                </Item>
                <Item subTitle={'YOLOv9 + 커스텀 데이터셋'}>
                    <p>
                        COCO 데이터셋의 음식 클래스에 한국 음식 60여 종을 추가 학습시켰다.
                    </p>
                    <p>
                        불고기, 삼겹살, 짜장면, 김치찌개 등 한국 대중 음식의 95% 이상 정확도를 달성했다.
                    </p>
                    <Code language={'python'}>
                    {`
# 실제 YOLO 모델 병렬 실행 구현
model_coco = YOLO('yolov9s.pt')  # COCO 데이터셋
model_food = YOLO('best.pt')     # 한국 음식 커스텀 모델

results_coco = model_coco.predict(source=image_path, conf=0.6)
results_food = model_food.predict(source=image_path, conf=0.9)

# 실제 음식 클래스 ID 필터링
food_class_ids = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 81, 82, 83, 1, 2, 3]
for cls in boxes_coco.cls:
    if int(cls) in food_class_ids:
        labels_combined.append(model_coco.names[int(cls)])

# 커스텀 모델 결과 추가
for cls in boxes_food.cls:
    labels_combined.append(model_food.names[int(cls)])
                    `}
                    </Code>
                </Item>
                <Item subTitle={'Google Gemini 2.0 Flash + 페르소나 시스템'}>
                    <p>
                        3가지 AI 캐릭터(김계진-PT트레이너, 박민아-친한친구, 윤서린-비서)가 각각 다른 말투와 성격으로 대화한다.
                    </p>
                    <p>
                        파일 기반 대화 기록 관리로 6턴의 중장기 기억을 구현하여 토큰을 최적화했다.
                    </p>
                    <Code language={'python'}>
                    {`
# 실제 페르소나 파일 로드 (gyejin.txt, mina.txt, seorin.txt)
personaFile = os.path.join("gemini/prompts/", f"{persona}.txt")
chatBotData = load_prompt(personaFile)

# 대화 기록 + 개인정보 통합 프롬프트
full_prompt = f"""
캐릭터 정보: {chatBotData}
이전 대화 내용: {chatLog}
사용자 이름: {request.session.get("userName")}
사용자의 알레르기: {personalData.Allergy}
사용자의 신장: {personalData.Height}
사용자의 몸무게: {personalData.Weight}
현재 대화: {message}
"""

# Gemini 2.0 Flash 모델 사용
client = genai.Client(api_key=settings.GEMINI_API_KEY)
response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=full_prompt,
    config=types.GenerateContentConfig(temperature=0.1)
)

# 6턴마다 대화 기록 초기화로 토큰 관리
if chatLogCount >= 6:
    createChatLog(request)  # 새 대화 파일 생성
                    `}
                    </Code>
                </Item>
                <Item subTitle={'AWS RDS MySQL'}>
                    <p>
                        클라우드 기반 데이터베이스로 사용자 정보, 개인 건강 데이터, 음식 영양 정보를 저장한다.
                    </p>
                    <p>
                        사용자별 맞춤형 식단 추천을 위한 알레르기, 신체 조건 데이터를 실시간으로 AI에 반영한다.
                    </p>
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main Page'}>
                    <p>프로젝트 소개 및 HealCare 로고가 있는 메인 페이지</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/Main.png'} alt='Main' />
                </Item>
                <Item subTitle={'Authentication'}>
                    <p>로그인 및 회원가입 페이지</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/Login.png'} alt='Login' />
                    <ProjectImage src={'/img/projectImg/HealthCare/SignUp.png'} alt='SignUp' />
                </Item>
                <Item subTitle={'Chat Interface'}>
                    <p>메신저 형태의 채팅 인터페이스 - 좌측 캐릭터 목록, 우측 대화 영역</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/ChatArea.png'} alt='ChatArea' />
                </Item>
                <Item subTitle={'Non-Login Access Control'}>
                    <p>비로그인 사용자 채팅 페이지 접근 시 리다이렉트 화면</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/NonLoginEnterChatPage.png'} alt='NonLoginAccess' />
                </Item>
                <Item subTitle={'User Information Management'}>
                    <p>사용자 기본 정보 수정 모달 (ID 수정 금지)</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/UserInfo-Modal.png'} alt='UserInfo' />
                </Item>
                <Item subTitle={'Personal Health Data'}>
                    <p>알레르기, 신장, 체중 등 개인 건강 정보 입력 모달</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/PersonalData-Modal.png'} alt='PersonalData' />
                </Item>
                <Item subTitle={'AI Personalized Response'}>
                    <p>개인정보를 반영한 AI 캐릭터의 맞춤형 건강 상담 응답</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/Chat-Response-UserInfo.png'} alt='AIResponse' />
                </Item>
                <Item subTitle={'Character Profile System'}>
                    <p>AI 캐릭터 프로필 및 설정 정보 모달</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/ChatPersonalProfile-Modal1.png'} alt='CharacterProfile1' />
                    <ProjectImage src={'/img/projectImg/HealthCare/ChatPersonalProfile-Modal2.png'} alt='CharacterProfile2' />
                </Item>
                <Item subTitle={'Personal Logic Integration'}>
                    <p>개인정보 기반 맞춤형 로직 선택 화면</p>
                    <ProjectImage src={'/img/projectImg/HealthCare/ChoicePersonalLogic.png'} alt='PersonalLogic' />
                </Item>
            </Section>
            <Section title={'FLOWCHART'}>
                <Item subTitle={'System Architecture'}>
                    <p>전체 시스템 구조 및 데이터 흐름</p>
                    <Mermaid chart={`
flowchart TD
    A[사용자] --> B[Django Web Server]
    B --> C{로그인 확인}
    C -->|비로그인| D[메인 페이지]
    C -->|로그인| E[채팅 페이지]
    
    E --> F[캐릭터 선택]
    F --> G[김계진/박민아/윤서린]
    
    E --> H[텍스트 입력]
    H --> I[Gemini API]
    I --> J[AI 응답]
    
    E --> K[이미지 업로드]
    K --> L[YOLO 분석]
    L --> M[영양정보 조회]
    M --> N[Gemini 분석]
    N --> O[맞춤형 건강조언]
    
    I --> P[대화기록 저장]
    P --> Q[파일 기반 기억]
    
    style A fill:#e1f5fe
    style I fill:#f3e5f5
    style L fill:#fff3e0
    style Q fill:#e8f5e8
                    `} />
                </Item>
            </Section>
            <Section title={'STRUCTURE'}>
                <Item subTitle={'AI 캐릭터 페르소나 시스템'}>
                    <Section title={''}>
                        <Item subTitle={'3가지 실제 캐릭터 설정'}>
                            <p>김계진(PT트레이너), 박민아(친한친구), 윤서린(비서) 캐릭터가 각각 다른 성격과 말투로 건강 상담을 제공한다.</p>
                            <p>실제 프롬프트 파일(gyejin.txt, mina.txt, seorin.txt)을 통해 일관된 페르소나를 유지한다.</p>
                            <Code language={'python'}>
                            {`
# 실제 캐릭터별 프롬프트 파일 로드
def load_prompt(filename):
    with open(filename, encoding='utf-8') as f:
        return f.read()

# 김계진: 에너지 넘치는 PT 트레이너 (삣삐 말투, 기가차드 밈)
# 박민아: 친근한 친구 (INFP, 음슴체, 말장난)  
# 윤서린: 전문적인 비서 (ISTJ, 업무적 말투, ~씨 호칭)

personaFile = os.path.join("gemini/prompts/", f"{persona}.txt")
chatBotData = load_prompt(personaFile)
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'캐릭터 전환 시스템'}>
                            <p>JavaScript에서 캐릭터 선택 시 dataset.persona에 저장하고 채팅 내역을 초기화한다.</p>
                            <Code language={'javascript'}>
                            {`
// 실제 캐릭터 전환 구현
document.getElementById("chatBotList").addEventListener("click", async function(event){
    const target = event.target;
    if (!target.dataset.persona) return;
    
    // 채팅 기록 초기화
    const cleanResult = await cleanChatLog();
    if (!cleanResult) {
        alert("채팅 기록 초기화 실패");
        return;
    }

    // 새 페르소나 설정
    const persona = target.dataset.persona;
    const messages = document.getElementById("messages");
    messages.dataset.persona = persona;
    messages.innerHTML = "";

    // 캐릭터별 시작 메시지 출력
    chatbot = chatBotProfile[persona];
    getMessage(chatbot.startMessage);
})
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>
                <Item subTitle={'파일 기반 기억 보강 시스템'}>
                    <Section title={''}>
                        <Item subTitle={'대화 기록 관리'}>
                            <p>Gemini 2.0 Flash의 단기 기억을 6턴으로 확장하기 위해 파일 기반 저장을 사용한다.</p>
                            <p>사용자별 채팅 로그 파일을 생성하고, 6턴마다 초기화하여 토큰을 최적화한다.</p>
                            <Code language={'python'}>
                            {`
# 실제 대화 기록 관리 구현
def writeChatLog(request, message):
    userId = request.session.get("userId")
    userName = request.session.get("userName")
    fileName = f"chatlog_{userId}"
    filePath = os.path.join("gemini/chatlog", fileName)
    
    chatLog = ""
    # 사용자 메시지를 파일에 추가하고 전체 로그 읽기
    with open(filePath, "a+", encoding="utf-8") as f:
        f.write("{0}: {1}\\n".format(userName, message))
        f.seek(0)  # 파일 처음으로 이동
        chatLog = f.read()
    
    return chatLog

def requestGemini(request, message, persona):
    chatLogCount = request.session.get("chatLogCount")
    
    # 6회 이상이면 로그 초기화
    if chatLogCount >= 6:
        request.session["chatLogCount"] = 1
        createChatLog(request)
    else:
        request.session["chatLogCount"] = chatLogCount + 1
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'통합 프롬프트 구성'}>
                            <p>캐릭터 설정, 대화 기록, 개인정보를 하나의 프롬프트로 통합하여 맞춤형 응답을 생성한다.</p>
                            <Code language={'python'}>
                            {`
# 실제 Gemini API 호출 구현
def requestGemini(request, message, persona):
    # 개인정보 불러오기 (예외 처리 포함)
    try:
        personalData = connectPersonalData(userId)
    except ObjectDoesNotExist:
        personalData = SimpleNamespace(
            Allergy="없음", Height="알 수 없음", Weight="알 수 없음"
        )

    # Gemini 2.0 Flash 클라이언트 초기화
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    model_name = "gemini-2.0-flash"
    
    # 실제 프롬프트 파일 로드
    personaFile = os.path.join("gemini/prompts/", f"{persona}.txt")
    chatBotData = load_prompt(personaFile)

    # 통합 프롬프트 구성
    full_prompt = f"""
    캐릭터 정보: {chatBotData}
    이전 대화 내용: {chatLog}
    사용자 이름: {request.session.get("userName")}
    사용자의 알레르기: {personalData.Allergy}
    사용자의 신장: {personalData.Height}
    사용자의 몸무게: {personalData.Weight}
    현재 대화: {message}
    """
    
    # Gemini에 프롬프트 전송
    response = client.models.generate_content(
        model=model_name,
        contents=full_prompt,
        config=types.GenerateContentConfig(temperature=0.1)
    )
    
    return {'result': 0, 'message': response.text}
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>
                <Item subTitle={'음식 인식 및 분석 프로세스'}>
                    <Section title={''}>
                        <Item subTitle={'이미지 업로드 및 검증'}>
                            <p>확장자 검증과 기존 이미지 자동 삭제를 통해 안전한 이미지 업로드를 처리한다.</p>
                            <Code language={'javascript'}>
                            {`
// 이미지 업로드 검증 구현
document.getElementById("image").addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;

    // 확장자 검사
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
        alert("이미지 파일만 업로드할 수 있습니다 (jpg, jpeg, png, gif, webp).");
        this.value = ""; // 선택한 파일 초기화
        return;
    }

    const image = new FormData();
    image.append("image", file);
    waitMessageBtn();
    const persona = document.getElementById("messages").dataset.persona;
    uploadImage(image, persona);
    this.value = ""; // 선택한 파일 초기화
})
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'YOLO 모델 병렬 실행'}>
                            <p>COCO 데이터셋과 커스텀 한국 음식 모델을 병렬로 실행하여 정확도를 높인다.</p>
                            <Code language={'python'}>
                            {`
# YOLO 병렬 실행 구현
def run_yolo_on_image(image_path_obj):
    image_path = image_path_obj.path
    
    # 두 개의 YOLO 모델 불러오기
    model_coco = YOLO('yolov9s.pt')  # COCO pretrained
    model_food = YOLO('best.pt')     # 사용자 음식 모델

    # 이미지 추론
    results_coco = model_coco.predict(source=image_path, conf=0.6)
    results_food = model_food.predict(source=image_path, conf=0.9)

    labels_combined = []

    # COCO 음식 클래스 ID 필터링
    food_class_ids = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 81, 82, 83, 1, 2, 3]
    boxes_coco = results_coco[0].boxes
    if boxes_coco is not None:
        for cls in boxes_coco.cls:
            if int(cls) in food_class_ids:
                labels_combined.append(model_coco.names[int(cls)])

    # 커스텀 음식 모델 결과
    boxes_food = results_food[0].boxes
    if boxes_food is not None:
        for cls in boxes_food.cls:
            labels_combined.append(model_food.names[int(cls)])

    # 중복 제거
    labels_combined = list(set(labels_combined))
    
    return {
        'result': 0 if labels_combined else 1,
        'labels': labels_combined if labels_combined else "음식에 해당하는 이미지가 없습니다."
    }
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'영양 정보 조회 및 AI 분석'}>
                            <p>감지된 음식의 영양 정보를 DB에서 조회하고 AI에게 전달하여 맞춤형 분석을 받는다.</p>
                            <Code language={'python'}>
                            {`
# 영양 정보 조회 구현
def get_calorie_info_by_food_name(food_name):
    try:
        calorie_obj = Calorie.objects.get(calorie_per_serving_eg=food_name)
        result = (
            f"{calorie_obj.food_name}: "
            f"{calorie_obj.calorie_per_serving} kcal</br>"
            f"탄수화물 {calorie_obj.carbohydrate}g</br>"
            f"단백질 {calorie_obj.protein}g</br>"
            f"지방 {calorie_obj.fat}g</br>"
        )
        return result
    except Calorie.DoesNotExist:
        return "none"

def analyze_image(request):
    # 이미지 분석 후 Gemini에 영양정보와 함께 전달
    detection_result = run_yolo_on_image(image_path)
    detected_labels = detection_result['labels']
    calorie_summary = generate_calorie_summary(detected_labels)
    
    # Gemini 요청 메시지
    gemini_message = ("내가 오늘 먹은 음식은 " + calorie_summary + 
                     " 이야 어때? 내가 보낸 해당 음식의 칼로리와 영양성분정보는 "
                     "텍스트 그대로 반환하고 해당 정보를 바탕으로 나의 식사를 평가해줘.")
    
    geminiResult = requestGemini(request, gemini_message, persona)
    return JsonResponse({"result": geminiResult['result'], "calorieList": geminiResult['message']})
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'개인 맞춤형 건강 관리'}>
                    <p>사용자의 알레르기, 신체 조건을 실시간으로 AI에 반영하여 맞춤형 식단 추천과 건강 조언을 제공한다.</p>
                    <Code language={'python'}>
                    {`
# 개인정보 업데이트 구현
def updatePersonalData(request):
    userId = request.session.get("userId")
    allergy = request.POST.get("allergy")
    height = request.POST.get("height")
    weight = request.POST.get("weight")

    # 데이터가 없으면 새로 생성
    if not PersonalData.objects.filter(pk=userId).exists():
        result = setPersonalData(userId, allergy, height, weight)
        return JsonResponse({"result": result})

    try:
        personalData = PersonalData.objects.get(pk=userId)
        personalData.Allergy = allergy
        personalData.Height = height
        personalData.Weight = weight
        personalData.save()
        return JsonResponse({"result": 0})  # 성공
    except Exception:
        return JsonResponse({"result": 1})  # 실패

def connectPersonalData(userId):
    return PersonalData.objects.get(pk=userId)
                    `}
                    </Code>
                </Item>

                <Item subTitle={'로그인 접근 제어 시스템'}>
                    <p>비로그인 사용자의 채팅 페이지 접근을 차단하고 메인 페이지로 리다이렉트하는 보안 기능을 구현했다.</p>
                    <Code language={'javascript'}>
                    {`
// 실제 프론트엔드 로그인 확인 구현
window.addEventListener('DOMContentLoaded', function() {
    const userName = sessionStorage.getItem("userName");
    if(!userName) {
        alert("로그인 후 이용가능합니다.");
        location.href = "/index";
    }
    
    // 추가 AJAX 확인
    checkLogin();
})

function checkLogin() {
    $.ajax({
        url: "/common/checkLogin/",
        method: "GET",
        success: function(data) {
            if(!data.result){
                sessionStorage.removeItem('userName');
                location.href = "/index";
            }
        }
    })
}
                    `}
                    </Code>
                </Item>
            </Section>
            <Section title={'DATABASE'}>
                <Item subTitle={'ERD'}>
                    <p>User, PersonalData, Calorie, MealPhotoAnalysis 테이블 관계도</p>
                    <Mermaid chart={`
erDiagram
    User {
        string UserId PK
        string UserPassword
        string UserName
        string UserGender
    }
    
    PersonalData {
        string UserId FK,PK
        string Allergy
        string Height
        string Weight
    }
    
    Calorie {
        string food_name PK
        string calorie_per_serving_eg
        int calorie_per_serving
        float carbohydrate
        float protein
        float fat
    }
    
    MealPhotoAnalysis {
        int AnalysisId PK
        string UserId FK
        string PhotoPath
        datetime CreatedAt
    }
    
    User ||--|| PersonalData : "1:1 관계"
    User ||--o{ MealPhotoAnalysis : "1:N 관계"
                    `} />
                </Item>
                <Item subTitle={'User 테이블'}>
                    <p>사용자 기본 정보</p>
                    <p>• UserId (PK): 사용자 ID</p>
                    <p>• UserPassword: 비밀번호</p>
                    <p>• UserName: 이름</p>
                    <p>• UserGender: 성별</p>
                </Item>
                <Item subTitle={'PersonalData 테이블'}>
                    <p>사용자 건강 정보 (User와 1:1 관계)</p>
                    <p>• UserId (FK, PK): 사용자 ID</p>
                    <p>• Allergy: 알레르기 정보</p>
                    <p>• Height: 신장</p>
                    <p>• Weight: 체중</p>
                </Item>
                <Item subTitle={'Calorie 테이블'}>
                    <p>음식별 영양 정보</p>
                    <p>• food_name (PK): 음식명 (한글)</p>
                    <p>• calorie_per_serving_eg: 영어명</p>
                    <p>• calorie_per_serving: 1인분 칼로리</p>
                    <p>• carbohydrate: 탄수화물</p>
                    <p>• protein: 단백질</p>
                    <p>• fat: 지방</p>
                </Item>
                <Item subTitle={'MealPhotoAnalysis 테이블'}>
                    <p>업로드된 음식 이미지 정보</p>
                    <p>• AnalysisId (PK): 분석 ID</p>
                    <p>• UserId (FK): 사용자 ID</p>
                    <p>• PhotoPath: 이미지 경로</p>
                    <p>• CreatedAt: 생성 시간</p>
                </Item>
            </Section>
            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. 커스텀 음식 모델 정확도 문제'}>
                    <p>
                        삼겹살과 같은 일부 한국 음식의 학습 정확도가 65%로 낮아 피자 등 다른 음식으로 오인식되는 문제가 발생했다.
                    </p>
                    <p>
                        COCO 모델과 커스텀 모델의 confidence 임계값을 다르게 설정(0.6 vs 0.9)하여 정확도를 높였다.
                    </p>
                    <Code language={'python'}>
                    {`
# 정확도 기반 필터링 구현
results_coco = model_coco.predict(source=image_path, conf=0.6)  # COCO 모델
results_food = model_food.predict(source=image_path, conf=0.9)  # 커스텀 모델

# 음식 클래스 ID로 필터링
food_class_ids = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 81, 82, 83, 1, 2, 3]
for cls in boxes_coco.cls:
    if int(cls) in food_class_ids:
        labels_combined.append(model_coco.names[int(cls)])

# 중복 제거로 오판 방지
labels_combined = list(set(labels_combined))
                    `}
                    </Code>
                    <p>
                        추가로 이미지 영역을 정확히 재설정하고 선명한 이미지 위주로 재학습시켜 삼겹살의 정확도를 95% 이상으로 향상시켰다.
                    </p>
                </Item>
                <Item subTitle={'2. Gemini 2.0 Flash 기억력 한계'}>
                    <p>
                        Gemini 2.0 Flash는 단기 기억만 제공하여 긴 대화에서 맥락을 잃는 문제가 있었다.
                    </p>
                    <p>
                        파일 기반 대화 기록 시스템을 구현하여 6턴의 중장기 기억을 제공하면서도 토큰 비용을 최적화했다.
                    </p>
                    <Code language={'python'}>
                    {`
# 채팅 기억 관리 구현
def requestGemini(request, message, persona):
    chatLogCount = request.session.get("chatLogCount")
    
    # 6회 이상이면 로그 초기화
    if chatLogCount >= 6:
        request.session["chatLogCount"] = 1
        createChatLog(request)
    else:
        request.session["chatLogCount"] = chatLogCount + 1

    # 대화 기록을 파일에 저장하고 불러오기
    chatLog = writeChatLog(request, message)
    
    # 통합 프롬프트로 맥락 유지
    full_prompt = f"""
    캐릭터 정보: {chatBotData}
    이전 대화 내용: {chatLog}
    사용자 이름: {request.session.get("userName")}
    현재 대화: {message}
    """
                    `}
                    </Code>
                    <p>
                        이를 통해 유료 버전 대비 약 70% 비용 절감하면서도 자연스러운 대화 맥락을 유지할 수 있었다.
                    </p>
                </Item>
                <Item subTitle={'3. 이미지 중복 저장 및 관리'}>
                    <p>
                        사용자가 여러 이미지를 업로드할 때마다 저장되어 서버 저장 공간이 부족해지는 문제가 발생했다.
                    </p>
                    <p>
                        새 이미지 업로드 시 기존 이미지를 자동으로 삭제하는 시스템을 구현했다.
                    </p>
                    <Code language={'python'}>
                    {`
# 실제 이미지 중복 관리 구현
def uploadImage(request):
    userId = request.session.get("userId")
    
    # 기존 이미지 확인 및 삭제
    imageData = foundImage(userId)
    if imageData:
        deletedResult = deleteImage(userId, imageData["imageId"], imageData["imagePath"])
        if not deletedResult:
            return JsonResponse({"result": 1, "errorMessage": "이미지 삭제 실패"})

    # 새 이미지 저장
    user = User.objects.get(pk=userId)
    mealPhoto = MealPhotoAnalysis(
        UserId=user,
        PhotoPath=image,
        CreatedAt=timezone.now()
    )
    mealPhoto.save()

def deleteImage(userId, imageId, imagePath):
    try:
        full_path = imagePath.path
        if os.path.exists(full_path):
            os.remove(full_path)  # 파일 시스템에서 삭제
        
        MealPhotoAnalysis.objects.filter(UserId=userId, AnalysisId=imageId).delete()
        return True
    except Exception as e:
        return False
                    `}
                    </Code>
                </Item>
            </Section>
        </div>
    );
}