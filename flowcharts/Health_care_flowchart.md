# Health Care 프로젝트 플로우차트

## 전체 시스템 플로우

```mermaid
graph TB
    User[사용자] --> WebUI[Django Web UI]
    
    subgraph "Django Backend"
        WebUI --> IndexApp[Index App]
        WebUI --> UserApp[User App]
        WebUI --> ChatApp[Chat App]
        WebUI --> GeminiApp[Gemini AI App]
        WebUI --> YoloApp[YOLO App]
        
        ChatApp --> ImageUpload[이미지 업로드]
        ImageUpload --> MediaStorage[(Media Storage)]
        
        YoloApp --> YOLOv9[YOLOv9 모델]
        YOLOv9 --> FoodDetection[음식 감지]
        FoodDetection --> CalorieDB[(칼로리 DB)]
        
        GeminiApp --> GeminiAPI[Google Gemini API]
        GeminiAPI --> ChatLog[채팅 로그 파일]
        
        UserApp --> PersonalData[개인정보 관리]
        PersonalData --> MySQL[(AWS RDS MySQL)]
    end
    
    subgraph "기술 스택"
        Tech1[Django 5.2]
        Tech2[YOLOv9]
        Tech3[Google Gemini 2.0]
        Tech4[AWS RDS MySQL]
        Tech5[PyMySQL]
    end
```

## 음식 분석 플로우

```mermaid
sequenceDiagram
    participant User as 사용자
    participant Chat as Chat App
    participant YOLO as YOLO App
    participant Gemini as Gemini App
    participant DB as MySQL DB
    
    User->>Chat: 음식 이미지 업로드
    Chat->>Chat: 이미지 저장 (Media)
    Chat-->>User: 업로드 완료
    
    User->>YOLO: 이미지 분석 요청
    YOLO->>YOLO: YOLOv9 모델 실행
    YOLO->>YOLO: 음식 객체 감지
    YOLO->>DB: 칼로리 정보 조회
    DB-->>YOLO: 영양 정보 반환
    
    YOLO->>Gemini: 영양 분석 요청
    Gemini->>Gemini: Gemini API 호출
    Gemini->>Gemini: 채팅 로그 기록
    Gemini-->>YOLO: AI 평가 결과
    YOLO-->>User: 종합 분석 결과
```

## Gemini 챗봇 플로우

```mermaid
graph LR
    A[사용자 메시지] --> B{채팅 로그 확인}
    B -->|6회 이상| C[로그 초기화]
    B -->|6회 미만| D[로그 카운트 증가]
    
    C --> E[메시지 로그 기록]
    D --> E
    
    E --> F[개인정보 조회]
    F --> G[프롬프트 구성]
    
    G --> H[Gemini API 호출]
    H --> I[AI 응답 생성]
    I --> J[응답 로그 저장]
    J --> K[사용자에게 반환]
    
    style H fill:#f9f,stroke:#333
    style F fill:#bbf,stroke:#333
```

## 주요 기능
- Django 기반 웹 애플리케이션
- YOLOv9를 활용한 음식 이미지 인식
- Google Gemini AI 챗봇 (페르소나 기반)
- AWS RDS MySQL 데이터베이스
- 사용자 개인정보 기반 맞춤 영양 분석
- 세션 기반 채팅 로그 관리
