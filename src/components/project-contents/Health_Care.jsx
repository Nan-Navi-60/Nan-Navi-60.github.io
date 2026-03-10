import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';

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
                        chat(템플릿 렌더·세션), gemini(대화 API), myyolo(이미지 분석), user(개인정보) 앱으로 구성하여 각 기능을 독립적으로 관리한다.
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
                        COCO 데이터셋의 10개 음식 클래스에 한국 음식 60여 종을 추가 학습시켰다.
                    </p>
                    <p>
                        불고기, 삼겹살, 짜장면, 김치찌개 등 한국 대중 음식의 95% 이상 정확도를 달성했다.
                    </p>
                    <Code language={'python'}>
                    {`
# COCO + 커스텀 모델 병렬 실행
model_coco = YOLO('yolov9s.pt')  # COCO 데이터셋
model_food = YOLO('best.pt')     # 한국 음식 커스텀 모델

results_coco = model_coco.predict(source=image_path, conf=0.6)
results_food = model_food.predict(source=image_path, conf=0.9)

# 정확도 기반 필터링으로 오판 방지
if confidence > 0.8:  # 80% 이상일 때만 결과 채택
    detected_foods.append(food_name)
                    `}
                    </Code>
                </Item>
                <Item subTitle={'Google Gemini 2.5 Flash + 페르소나 시스템'}>
                    <p>
                        3가지 AI 캐릭터(헬스 트레이너, 여사친, 비서)가 각각 다른 말투와 성격으로 대화한다.
                    </p>
                    <p>
                        파일 기반 대화 기록 관리로 4-5턴의 중장기 기억을 구현하여 토큰을 최적화했다.
                    </p>
                    <Code language={'python'}>
                    {`
# 페르소나별 프롬프트 로드
chatBotData = load_prompt(f"gemini/prompts/{persona}.txt")

# 대화 기록 + 개인정보 통합 프롬프트
full_prompt = f"""
캐릭터 설정: {chatBotData}
이전 대화 내용: {chatLog}  # 4-5턴 파일 저장
사용자 개인정보: 알레르기({allergy}), 신장({height}), 체중({weight})
현재 질문: {message}
"""

# 4턴마다 대화 기록 초기화로 토큰 관리
if chatLogCount >= 4:
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
                    {/* [IMAGE: SystemArchitecture.png] */}
                </Item>
                <Item subTitle={'Food Analysis Flow'}>
                    <p>음식 이미지 업로드부터 AI 분석까지의 전체 프로세스</p>
                    {/* [IMAGE: FoodAnalysisFlow.png] */}
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'AI 캐릭터 페르소나 시스템'}>
                    <Section title={''}>
                        <Item subTitle={'3가지 캐릭터 설정'}>
                            <p>헬스 트레이너, 여사친, 비서 캐릭터가 각각 다른 성격과 말투로 건강 상담을 제공한다.</p>
                            <p>캐릭터별 프롬프트 파일을 통해 일관된 페르소나를 유지하며, 사용자에게 친근하고 재미있는 경험을 제공한다.</p>
                            <Code language={'python'}>
                            {`
# 캐릭터별 프롬프트 파일 로드
def load_prompt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

# 헬스 트레이너: 열정적이고 전문적인 조언
trainer_prompt = load_prompt("gemini/prompts/trainer.txt")

# 여사친: 친근하고 공감적인 대화
friend_prompt = load_prompt("gemini/prompts/friend.txt")

# 비서: 정확하고 체계적인 정보 제공
secretary_prompt = load_prompt("gemini/prompts/secretary.txt")
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'캐릭터 전환 시스템'}>
                            <p>JavaScript에서 캐릭터 선택 시 dataset.persona에 저장하고 채팅 내역을 초기화한다.</p>
                            <ProjectImage src={'/img/projectImg/HealthCare/ChatPersonalProfile-Modal1.png'} alt='Character Selection' maxWidth='60%' />
                            <Code language={'javascript'}>
                            {`
// 캐릭터 선택 시 페르소나 저장 및 채팅 초기화
function selectCharacter(persona) {
    document.getElementById('messages').dataset.persona = persona;
    clearChatHistory();  // 페이지 새로고침 없이 채팅 초기화
    
    // 선택된 캐릭터 UI 업데이트
    updateCharacterUI(persona);
}

// AJAX 요청 시 페르소나 정보 포함
function sendMessage(message) {
    const persona = document.getElementById('messages').dataset.persona;
    
    $.ajax({
        url: '/gemini/pushChatLog/',
        data: {
            'message': message,
            'persona': persona,
            'csrfmiddlewaretoken': $('[name=csrfmiddlewaretoken]').val()
        }
    });
}
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'파일 기반 기억 보강 시스템'}>
                    <Section title={''}>
                        <Item subTitle={'대화 기록 관리'}>
                            <p>Gemini 2.5 Flash의 3턴 단기 기억을 4-5턴으로 확장하기 위해 파일 기반 저장을 사용한다.</p>
                            <p>사용자별 채팅 로그 파일을 생성하고, 일정 턴마다 초기화하여 토큰을 최적화한다.</p>
                            <Code language={'python'}>
                            {`
def writeChatLog(request, message):
    userId = request.session.get("userId")
    userName = request.session.get("userName")
    fileName = f"chatlog_{userId}"
    filePath = os.path.join("gemini/chatlog", fileName)
    
    # 사용자 메시지와 AI 응답을 구분하여 저장
    with open(filePath, "a+", encoding="utf-8") as f:
        f.write(f"{userName}: {message}\\n")
        f.seek(0)
        chatLog = f.read()
    
    return chatLog

def manageChatLogCount(request):
    chatLogCount = request.session.get("chatLogCount", 1)
    
    # 4턴마다 대화 기록 초기화 (토큰 최적화)
    if chatLogCount >= 4:
        request.session["chatLogCount"] = 1
        createChatLog(request)  # 새 대화 파일 생성
    else:
        request.session["chatLogCount"] = chatLogCount + 1
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'통합 프롬프트 구성'}>
                            <p>캐릭터 설정, 대화 기록, 개인정보를 하나의 프롬프트로 통합하여 맞춤형 응답을 생성한다.</p>
                            <Code language={'python'}>
                            {`
def generateResponse(request, message, persona):
    # 1. 캐릭터 프롬프트 로드
    chatBotData = load_prompt(f"gemini/prompts/{persona}.txt")
    
    # 2. 대화 기록 불러오기
    chatLog = readChatLog(request)
    
    # 3. 사용자 개인정보 조회
    personalData = connectPersonalData(request.session.get("userId"))
    
    # 4. 통합 프롬프트 구성
    full_prompt = f"""
    캐릭터 설정: {chatBotData}
    이전 대화 내용: {chatLog}
    사용자 이름: {request.session.get("userName")}
    개인 건강 정보:
    - 알레르기: {personalData.Allergy or "알 수 없음"}
    - 신장: {personalData.Height or "알 수 없음"}cm
    - 체중: {personalData.Weight or "알 수 없음"}kg
    
    현재 사용자 질문: {message}
    
    위 정보를 바탕으로 캐릭터 설정에 맞는 말투로 답변해주세요.
    """
    
    return gemini_api_call(full_prompt)
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'음식 인식 및 분석 프로세스'}>
                    <Section title={''}>
                        <Item subTitle={'이미지 업로드 및 검증'}>
                            <p>확장자 검증과 진행률 표시를 통해 안전한 이미지 업로드를 처리한다.</p>
                            <Code language={'javascript'}>
                            {`
// 이미지 업로드 검증 및 진행률 표시
function uploadImage(file) {
    // 확장자 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        alert('JPG, PNG 파일만 업로드 가능합니다.');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    $.ajax({
        url: '/myyolo/analyze_image/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function() {
            const xhr = new window.XMLHttpRequest();
            // 업로드 진행률 표시
            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    const percentComplete = evt.loaded / evt.total * 100;
                    updateProgressBar(percentComplete);
                }
            });
            return xhr;
        }
    });
}
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'YOLO 모델 병렬 실행'}>
                            <p>COCO 데이터셋과 커스텀 한국 음식 모델을 병렬로 실행하여 정확도를 높인다.</p>
                            <Code language={'python'}>
                            {`
def analyze_food_image(image_path):
    # 두 모델 병렬 실행
    results_coco = model_coco.predict(source=image_path, conf=0.6)
    results_food = model_food.predict(source=image_path, conf=0.9)
    
    detected_foods = []
    
    # COCO 음식 클래스 필터링 (10개 클래스)
    food_class_ids = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55]
    for result in results_coco:
        for box in result.boxes:
            if int(box.cls) in food_class_ids and box.conf > 0.8:
                food_name = model_coco.names[int(box.cls)]
                detected_foods.append({
                    'name': food_name,
                    'confidence': float(box.conf),
                    'source': 'COCO'
                })
    
    # 커스텀 한국 음식 모델 결과
    for result in results_food:
        for box in result.boxes:
            if box.conf > 0.8:  # 80% 이상 정확도만 채택
                food_name = model_food.names[int(box.cls)]
                detected_foods.append({
                    'name': food_name,
                    'confidence': float(box.conf),
                    'source': 'Custom'
                })
    
    return detected_foods
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'영양 정보 조회 및 AI 분석'}>
                            <p>감지된 음식의 영양 정보를 DB에서 조회하고 AI에게 전달하여 맞춤형 분석을 받는다.</p>
                            <Code language={'python'}>
                            {`
def get_nutrition_analysis(detected_foods, user_personal_data):
    nutrition_info = []
    
    for food in detected_foods:
        try:
            # AWS RDS에서 영양 정보 조회
            calorie_obj = Calorie.objects.get(
                calorie_per_serving_eg=food['name']
            )
            
            nutrition_info.append({
                'food_name': calorie_obj.food_name,
                'calories': calorie_obj.calorie_per_serving,
                'carbohydrate': calorie_obj.carbohydrate,
                'protein': calorie_obj.protein,
                'fat': calorie_obj.fat,
                'confidence': food['confidence']
            })
        except Calorie.DoesNotExist:
            # DB에 없는 음식은 기본 정보로 처리
            nutrition_info.append({
                'food_name': food['name'],
                'calories': '정보 없음',
                'note': 'DB에 영양 정보가 없습니다.'
            })
    
    # AI에게 영양 정보와 개인 데이터를 함께 전달
    analysis_prompt = f"""
    감지된 음식: {nutrition_info}
    사용자 정보: 알레르기({user_personal_data.Allergy}), 
                신장({user_personal_data.Height}cm), 
                체중({user_personal_data.Weight}kg)
    
    위 음식에 대한 영양 분석과 개인 맞춤 건강 조언을 제공해주세요.
    """
    
    return gemini_api_call(analysis_prompt)
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'개인 맞춤형 건강 관리'}>
                    <p>사용자의 알레르기, 신체 조건을 실시간으로 AI에 반영하여 맞춤형 식단 추천과 건강 조언을 제공한다.</p>
                    <Code language={'python'}>
                    {`
def updatePersonalData(request):
    userId = request.session.get("userId")
    allergy = request.POST.get('allergy', '알 수 없음')
    height = request.POST.get('height', '알 수 없음')
    weight = request.POST.get('weight', '알 수 없음')
    
    # 개인정보 업데이트
    personal_data, created = PersonalData.objects.get_or_create(
        UserId_id=userId,
        defaults={
            'Allergy': allergy,
            'Height': height,
            'Weight': weight
        }
    )
    
    if not created:
        personal_data.Allergy = allergy
        personal_data.Height = height
        personal_data.Weight = weight
        personal_data.save()
    
    return JsonResponse({
        'result': 0,
        'message': '개인정보가 업데이트되었습니다. 이제 더 정확한 건강 조언을 받을 수 있습니다.'
    })
                    `}
                    </Code>
                </Item>
            </Section>

            <Section title={'DATABASE'}>
                <Item subTitle={'ERD'}>
                    <p>User, PersonalData, Calorie, MealPhotoAnalysis 테이블 관계도</p>
                    {/* [IMAGE: ERD.png] */}
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
                        정확도 기반 필터링을 도입하여 80% 이상의 신뢰도를 가진 결과만 채택하도록 설정했다.
                    </p>
                    <Code language={'python'}>
                    {`
# 정확도 기반 필터링으로 오판 방지
for result in results_food:
    for box in result.boxes:
        confidence = float(box.conf)
        if confidence > 0.8:  # 80% 이상일 때만 결과 채택
            food_name = model_food.names[int(box.cls)]
            detected_foods.append({
                'name': food_name,
                'confidence': confidence
            })
        else:
            print(f"낮은 신뢰도로 제외: {food_name} ({confidence:.2f})")
                    `}
                    </Code>
                    <p>
                        추가로 이미지 영역을 정확히 재설정하고 선명한 이미지 위주로 재학습시켜 삼겹살의 정확도를 95% 이상으로 향상시켰다.
                    </p>
                </Item>
                <Item subTitle={'2. Gemini 2.5 Flash 기억력 한계'}>
                    <p>
                        무료 버전인 Gemini 2.5 Flash는 3턴의 단기 기억만 제공하여 긴 대화에서 맥락을 잃는 문제가 있었다.
                    </p>
                    <p>
                        파일 기반 대화 기록 시스템을 구현하여 4-5턴의 중장기 기억을 제공하면서도 토큰 비용을 최적화했다.
                    </p>
                    <Code language={'python'}>
                    {`
def manageChatMemory(request, message):
    chatLogCount = request.session.get("chatLogCount", 1)
    
    # 대화 기록을 파일에 저장
    chatLog = writeChatLog(request, message)
    
    # 4턴마다 초기화하여 토큰 관리
    if chatLogCount >= 4:
        # 기존 대화 요약 후 새 파일 생성
        summarizeAndReset(request)
        request.session["chatLogCount"] = 1
    else:
        request.session["chatLogCount"] = chatLogCount + 1
    
    return chatLog
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
def uploadImage(request):
    userId = request.session.get("userId")
    
    # 기존 이미지 확인 및 삭제
    try:
        existing_image = MealPhotoAnalysis.objects.get(UserId_id=userId)
        # 파일 시스템에서 실제 이미지 파일 삭제
        if os.path.exists(existing_image.PhotoPath.path):
            os.remove(existing_image.PhotoPath.path)
        # DB 레코드 삭제
        existing_image.delete()
    except MealPhotoAnalysis.DoesNotExist:
        pass  # 기존 이미지가 없으면 그대로 진행
    
    # 새 이미지 저장
    new_image = MealPhotoAnalysis(
        UserId_id=userId,
        PhotoPath=uploaded_file,
        CreatedAt=timezone.now()
    )
    new_image.save()
                    `}
                    </Code>
                </Item>
                <Item subTitle={'4. 비로그인 사용자 접근 제어'}>
                    <p>
                        채팅 페이지에 비로그인 사용자가 직접 접근할 경우 오류가 발생하는 문제가 있었다.
                    </p>
                    <p>
                        JavaScript와 Django 뷰 단에서 이중으로 로그인 상태를 확인하여 비로그인 사용자를 메인 페이지로 리다이렉트했다.
                    </p>
                    <Code language={'python'}>
                    {`
# Django 뷰에서 세션 확인
def chat_view(request):
    if not request.session.get('userId'):
        return redirect('index')  # 비로그인 시 메인으로 리다이렉트
    
    return render(request, 'chat/chat.html', {
        'user_name': request.session.get('userName')
    })
                    `}
                    </Code>
                    <Code language={'javascript'}>
                    {`
// 프론트엔드에서도 추가 확인
document.addEventListener('DOMContentLoaded', function() {
    // 헤더에 사용자명이 없으면 비로그인 상태
    const userName = document.querySelector('.user-name');
    if (!userName || !userName.textContent.trim()) {
        alert('로그인이 필요합니다.');
        window.location.href = '/';
    }
});
                    `}
                    </Code>
                </Item>
            </Section>
        </div>
    );
}
