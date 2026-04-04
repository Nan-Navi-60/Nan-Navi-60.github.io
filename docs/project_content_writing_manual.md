# 프로젝트 컨텐츠 작성 메뉴얼

## 파일 구조
```jsx
import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';

export default async function ProjectDetail() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">프로젝트 제목</h1>
            {/* 섹션들 */}
        </div>
    );
}
```

## 섹션 구조 (권장 순서)

### 1. INDEX
- 프로젝트의 목적과 학습 목표
- 핵심 개념 정리
- 3-4개 항목으로 간결하게

```jsx
<Section title={'INDEX'}>
    <Item subTitle={'학습 목표 제목'}>
        <p>1. 첫 번째 목표</p>
        <p>2. 두 번째 목표</p>
        <p>3. 세 번째 목표</p>
    </Item>
</Section>
```

### 2. INTRODUCE
- 사용한 주요 기술 스택 소개
- 각 기술의 역할과 사용 이유
- 핵심 기술에 대한 코드 예시 포함

```jsx
<Section title={'INTRODUCE'}>
    <Item subTitle={'기술명 1'}>
        <p>기술 설명</p>
        <p>사용 목적</p>
        <p>구현 방식</p>
    </Item>
    <Item subTitle={'기술명 2 (코드 포함)'}>
        <p>설명</p>
        <Code language={'java/python/javascript'}>
        {`
코드 내용
        `}
        </Code>
    </Item>
</Section>
```

### 3. VISUAL
- 주요 화면 캡처
- 각 화면에 대한 간단한 설명 (1-2줄)
- 사용자 플로우 순서대로 배치 (Main → Login → SignUp → 주요 기능)

```jsx
<Section title={'VISUAL'}>
    <Item subTitle={'화면명'}>
        <p>화면 설명 (1-2줄)</p>
        <ProjectImage
            src={'/img/projectImg/프로젝트명/이미지명.png'}
            alt='설명' 
        />
    </Item>
</Section>
```

### 4. FLOWCHART
- 시스템 아키텍처 다이어그램
- 주요 기능의 플로우차트
- 최대 2-3개로 제한 (너무 많으면 복잡함)

```jsx
<Section title={'FLOWCHART'}>
    <Item subTitle={'SystemArchitecture'}>
        <p>전체 시스템 구조</p>
        <ProjectImage 
            src={'/img/projectImg/프로젝트명/Architecture.png'} 
            alt='Architecture'
        />
    </Item>
</Section>
```

### 5. STRUCTURE
- 핵심 구현 로직 상세 설명
- 코드와 함께 동작 원리 설명
- 중요한 기능별로 Item 분리
- 복잡한 기능은 중첩 Section 사용 가능

```jsx
<Section title={'STRUCTURE'}>
    <Item subTitle={'기능명'}>
        <p>기능 설명</p>
        <Code language={'언어'}>
        {`
코드 예시
        `}
        </Code>
    </Item>
    
    {/* 복잡한 기능의 경우 중첩 Section 사용 */}
    <Item subTitle={'복잡한 기능'}>
        <Section title={''}>
            <Item subTitle={'세부 기능 1'}>
                <p>설명</p>
                <Code language={'언어'}>{`코드`}</Code>
            </Item>
            <Item subTitle={'세부 기능 2'}>
                <p>설명</p>
                <Code language={'언어'}>{`코드`}</Code>
            </Item>
        </Section>
    </Item>
</Section>
```

### 6. DATABASE (선택)
- 데이터베이스 구조
- ERD 다이어그램
- 테이블 관계 설명

```jsx
<Section title={'DataBase'}>
    <Item subTitle={'null'}>
        <ProjectImage 
            src={'/img/projectImg/프로젝트명/diagram.png'} 
            alt='Diagram' 
            maxWidth='40%' 
        />
    </Item>
</Section>
```

### 7. TROUBLE SHOOTING
- 개발 중 겪은 문제와 해결 방법
- 문제 상황 → 원인 분석 → 해결 방법 순서로 작성
- 2-4개 항목 권장

```jsx
<Section title={'TROUBLE SHOOTING'}>
    <Item subTitle={'1. 문제 제목'}>
        <p>문제 상황 설명</p>
        <p>원인 분석</p>
        <p>해결 방법</p>
        <p>결과</p>
    </Item>
</Section>
```

## 작성 원칙

### 1. 실제 구현 코드 사용 (중요!)
- **절대로 추측이나 일반적인 방식으로 코드를 작성하지 말 것**
- 반드시 실제 프로젝트 파일에서 사용된 정확한 코드만 사용
- temp 폴더의 프로젝트 파일들을 직접 확인하여 실제 구현된 코드 추출
- "이런 방식으로 구현했을 것이다" 또는 "일반적으로 이렇게 한다" 같은 추측 금지
- 포트폴리오의 신뢰성과 정확성이 가장 중요한 요소임

### 2. 간결성
- 각 설명은 1-3줄로 제한
- 불필요한 수식어 제거
- 핵심만 전달

### 3. 코드 사용
- 설명보다 코드로 보여주기
- 코드는 핵심 부분만 발췌
- 주석보다는 설명 문단 활용

### 4. 이미지 사용
- 이미지는 필요한 곳에만 사용
- VISUAL: 주요 화면 5-7개
- FLOWCHART: 2-3개
- DATABASE: 1개
- 과도한 이미지는 지양

### 5. 구조화
- Section으로 대분류
- Item으로 중분류
- 중첩 Section으로 세분류 (필요시)

### 5. 코드 블록 형식
```jsx
<Code language={'java/python/javascript/html/sql'}>
{`
코드 내용
(들여쓰기 유지)
`}
</Code>
```

### 6. 이미지 형식
```jsx
// 기본
<ProjectImage
    src={'/img/projectImg/프로젝트명/이미지.png'}
    alt='설명'
/>

// 크기 조절 필요시
<ProjectImage
    src={'/img/projectImg/프로젝트명/이미지.png'}
    alt='설명'
    maxWidth='40%'
/>
```

## 주의사항

1. **실제 코드 사용 필수**: 반드시 temp 폴더의 실제 프로젝트 파일에서 코드를 확인하고 사용할 것
2. **추측 금지**: "이렇게 구현했을 것이다" 같은 추측으로 코드 작성 절대 금지
3. **async function 사용**: `export default async function ProjectDetail()`
4. **문자열 이스케이프**: JSX 내에서 따옴표 사용 시 주의
5. **Code 컴포넌트**: 백틱 내부에 코드 작성
6. **이미지 경로**: `/img/projectImg/프로젝트명/` 형식 준수
7. **Section title**: 대문자 사용 (INDEX, INTRODUCE, VISUAL 등)
8. **Item subTitle**: 각 항목의 제목 (자유 형식)

## 섹션별 작성 가이드

### INDEX
- 목적: 프로젝트를 통해 배운 것
- 분량: 3-4개 항목
- 형식: 번호 매기기

### INTRODUCE
- 목적: 기술 스택 소개
- 분량: 3-5개 기술
- 형식: 기술명 + 설명 + 코드(선택)

### VISUAL
- 목적: 화면 구성 보여주기
- 분량: 5-7개 화면
- 형식: 화면명 + 1줄 설명 + 이미지

### FLOWCHART
- 목적: 시스템 구조 시각화
- 분량: 2-3개
- 형식: 다이어그램명 + 설명 + 이미지

### STRUCTURE
- 목적: 핵심 로직 상세 설명
- 분량: 3-6개 기능
- 형식: 기능명 + 설명 + 코드

### TROUBLE SHOOTING
- 목적: 문제 해결 과정 공유
- 분량: 2-4개 문제
- 형식: 문제 → 원인 → 해결 → 결과

## 예시 템플릿

```jsx
import { Section } from '../ui/Section';
import { Item } from  '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';

export default async function ProjectDetail() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">프로젝트 제목</h1>

            <Section title={'INDEX'}>
                <Item subTitle={'학습 목표'}>
                    <p>1. 목표 1</p>
                    <p>2. 목표 2</p>
                    <p>3. 목표 3</p>
                </Item>
            </Section>

            <Section title={'INTRODUCE'}>
                <Item subTitle={'기술 1'}>
                    <p>설명</p>
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main'}>
                    <p>메인 화면</p>
                    <ProjectImage src={'/img/projectImg/Project/main.png'} alt='main' />
                </Item>
            </Section>

            <Section title={'FLOWCHART'}>
                <Item subTitle={'Architecture'}>
                    <p>시스템 구조</p>
                    {/* [IMAGE: Architecture.png] */}
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'핵심 기능'}>
                    <p>설명</p>
                    <Code language={'java'}>
                    {`
코드 예시
                    `}
                    </Code>
                </Item>
            </Section>

            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. 문제'}>
                    <p>문제 상황</p>
                    <p>해결 방법</p>
                </Item>
            </Section>
        </div>
    );
}
```
