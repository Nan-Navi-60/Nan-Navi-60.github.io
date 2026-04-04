# Health Care 프로젝트 상세 문서

## 프로젝트 개요
- **프로젝트명**: Health Care (AI 기반 식단 분석 및 건강 관리 시스템)
- **개발 기간**: 2024년
- **주요 기능**: 음식 이미지 인식, AI 챗봇 상담, 개인 맞춤형 영양 분석
- **기술 스택**: Django 5.2, YOLOv9, Google Gemini 2.0, AWS RDS MySQL, PyMySQL

## 시스템 아키텍처

### 전체 구조
```
Client (Web Browser)
    ↓
Django Web Application
    ├── Index App (메인 페이지)
    ├── User App (회원 관리)
    ├── Chat App (이미지 업로드)
    ├── YOLO App (음식 인식)
    └── Gemini App (AI 챗봇)
    ↓
AWS RDS MySQL (사용자 정보, 칼로리 DB)
```

### Django 앱 구조
1. **index**: 메인 페이지
2. **user**: 회원가입, 로그인, 개인정보 관리
3. **chat**: 이미지 업로드 및 관리
4. **myyolo**: YOLOv9 음식 인식
5. **gemini**: Google Gemini AI 챗봇
6. **common**: 공통 기능

## 주요 기능 상세

### 1. 음식 이미지 인식 (YOLOv9)

#### 모델 구성
- **COCO Pretrained Model** (yolov9s.pt): 일반 음식 인식
- **Custom Food Model** (best.pt): 한국 음식 특화 모델

#### 인식 프로세스
```python
# 두 모델 병렬 실행
results_coco = model_coco.predict(source=image_path, conf=0.6)
results_food = model_food.predict(source=image_path, conf=0.9)

# 음식 클래스만 필터링 (COCO)
food_class_ids = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 81, 82, 83, 1, 2, 3]

# 결과 병합 및 중복 제거
labels_combined = list(set(labels_combined))
```

#### 칼로리 정보 조회
```python
def get_calorie_info_by_food_name(food_name):
    calorie_obj = Calorie.objects.get(calorie_per_serving_eg = food_name)
    result = (
        f"{calorie_obj.food_name}: "
        f"{calorie_obj.calorie_per_serving} kcal
"
        f"탄수화물 {calorie_obj.carbohydrate}g
"
        f"단백질 {calorie_obj.protein}g
"
        f"지방 {calorie_obj.fat}g
"
    )
    return result
```

### 2. Google Gemini AI 챗봇

#### 페르소나 기반 대화
- 프롬프트 파일을 통한 캐릭터 성격 설정
- 사용자 개인정보 기반 맞춤형 응답

#### 채팅 로그 관리
```python
def writeChatLog(request, message):
    userId = request.session.get("userId")
    userName = request.session.get("userName")
    fileName = f"chatlog_{userId}"
    filePath = os.path.join("gemini/chatlog", fileName)
    
    with open(filePath, "a+", encoding="utf-8") as f:
        f.write("{0}: {1}\n".format(userName, message))
        f.seek(0)
        chatLog = f.read()
    
    return chatLog
```

#### 로그 초기화 (6회마다)
```python
if chatLogCount >= 6:
    request.session["chatLogCount"] = 1
    createChatLog(request)
else:
    request.session["chatLogCount"] = chatLogCount + 1
```

#### Gemini API 호출
```python
client = genai.Client(api_key=settings.GEMINI_API_KEY)
model_name = "gemini-2.0-flash"

full_prompt = f"""
캐릭터 정보: {chatBotData}
이전 대화 내용: {chatLog}
사용자 이름: {request.session.get("userName")}
사용자의 알레르기: {personalData.Allergy}
사용자의 신장: {personalData.Height}
사용자의 몸무게: {personalData.Weight}
현재 대화: {message}
"""

response = client.models.generate_content(
    model=model_name,
    contents=full_prompt,
    config=types.GenerateContentConfig(
        temperature=0.1
    )
)
```

### 3. 이미지 업로드 및 관리

#### 이미지 저장
```python
def uploadImage(request):
    image = request.FILES.get("image")
    userId = request.session.get("userId")
    
    # 기존 이미지 확인 및 삭제
    imageData = foundImage(userId)
    if imageData:
        deletedResult = deleteImage(userId, imageData["imageId"], imageData["imagePath"])
    
    # 새 이미지 저장
    user = User.objects.get(pk=userId)
    mealPhoto = MealPhotoAnalysis(
        UserId = user,
        PhotoPath = image,
        CreatedAt = timezone.now()
    )
    mealPhoto.save()
    
    return JsonResponse({"result": 0, "image": mealPhoto.PhotoPath.url})
```

### 4. 회원 관리

#### 로그인
```python
def login(request):
    userId = request.POST.get('id')
    password = request.POST.get('password')
    
    user = User.objects.get(pk=userId)
    if user.UserPassword == password:
        request.session['userId'] = user.UserId
        request.session['userName'] = user.UserName
        
        # Gemini 챗봇 로그 초기화
        from gemini.views import createChatLog
        createChatLog(request)
        
        return JsonResponse({'result': 0, 'userName': user.UserName})
```

#### 개인정보 관리
```python
class PersonalData(models.Model):
    UserId = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    Allergy = models.TextField(blank=True, null=True)
    Height = models.FloatField(blank=True, null=True)
    Weight = models.FloatField(blank=True, null=True)
```

## 데이터베이스 구조

### User 테이블
- UserId (PK): 사용자 ID
- UserPassword: 비밀번호
- UserName: 이름
- UserGender: 성별

### PersonalData 테이블
- UserId (FK, PK): 사용자 ID
- Allergy: 알레르기 정보
- Height: 신장
- Weight: 체중

### Calorie 테이블
- food_name (PK): 음식명 (한글)
- calorie_per_serving_eg: 영어명
- calorie_per_serving: 1인분 칼로리
- carbohydrate: 탄수화물
- protein: 단백질
- fat: 지방

### MealPhotoAnalysis 테이블
- AnalysisId (PK): 분석 ID
- UserId (FK): 사용자 ID
- PhotoPath: 이미지 경로
- CreatedAt: 생성 시간

## 통합 플로우

### 음식 분석 전체 과정
```
1. 사용자가 음식 이미지 업로드
   ↓
2. Chat App에서 이미지 저장 (기존 이미지 삭제)
   ↓
3. YOLO App에서 이미지 분석 요청
   ↓
4. YOLOv9 모델 2개 병렬 실행
   ↓
5. 감지된 음식명으로 칼로리 DB 조회
   ↓
6. 칼로리 정보를 Gemini에 전달
   ↓
7. Gemini가 개인정보 기반 식단 평가
   ↓
8. 사용자에게 결과 반환
```

## 기술적 특징

### 1. AWS RDS MySQL 연동
```python
DATABASES = {
    'default': {
        'ENGINE' : 'django.db.backends.mysql',
        'NAME' : 'Healthcare',
        'USER' : 'root',
        'PASSWORD' : 'project749!!',
        'HOST' : 'healthcaredb.chcy0s6ikkpq.ap-southeast-2.rds.amazonaws.com',
        'PORT' : '3306'
    }
}
```

### 2. PyMySQL 사용
```python
import pymysql
pymysql.install_as_MySQLdb()
```

### 3. Django ORM
- `managed = False`: 기존 테이블 사용
- OneToOneField: User-PersonalData 1:1 관계

### 4. 세션 기반 인증
```python
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'

CACHES = {
    'default' : {
        'BACKEND' : 'django.core.cache.backends.locmem.LocMemCache',
    }
}
```

### 5. Media 파일 관리
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

## 주요 화면

### 1. 메인 페이지
- 프로젝트 소개
- 기능 안내

### 2. 로그인/회원가입
- 사용자 인증
- 세션 생성

### 3. 개인정보 입력
- 알레르기, 신장, 체중 입력
- AI 맞춤형 분석을 위한 데이터

### 4. 채팅 페이지
- 이미지 업로드
- AI 챗봇 대화
- 음식 분석 결과 표시

### 5. 프로필 페이지
- 사용자 정보 수정
- 개인정보 관리

## 트러블 슈팅

### 1. YOLO 모델 정확도 문제
**문제**: 단일 모델로는 다양한 음식 인식 어려움
**해결**: COCO Pretrained + Custom Food Model 병렬 실행

### 2. Gemini 대화 맥락 유지
**문제**: 긴 대화에서 맥락 손실
**해결**: 채팅 로그 파일 관리, 6회마다 초기화

### 3. 이미지 중복 저장
**문제**: 사용자당 여러 이미지 저장으로 용량 낭비
**해결**: 새 이미지 업로드 시 기존 이미지 자동 삭제

### 4. AWS RDS 연결
**문제**: MySQL 드라이버 호환성
**해결**: PyMySQL 사용 (`pymysql.install_as_MySQLdb()`)

## 배포 환경
- **Backend**: Django 5.2
- **Database**: AWS RDS MySQL
- **AI Models**: YOLOv9 (로컬), Google Gemini API
- **Storage**: Django Media (이미지), 로컬 파일 (채팅 로그)

## 개선 가능 사항
1. 채팅 로그를 DB로 이전 (현재 파일 시스템)
2. 이미지를 S3로 이전 (현재 로컬 저장)
3. 사용자별 식단 히스토리 기능
4. 영양소 목표 설정 및 추적
5. 음식 추천 기능
