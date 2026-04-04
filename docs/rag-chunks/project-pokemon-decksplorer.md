# Pokemon Decksplorer 프로젝트 (ID: 3)

## 개요
- 제목: 포켓몬 카드 게임 덱 생성 및 공유 플랫폼
- 핵심 목표: 1) 규칙 기반의 커스텀 카드 덱 웹 시뮬레이션, 2) 동일 카드명 통합 관리/제어 기능, 3) 유저 간 게시판 덱 공유/좋아요 인증 기능 구현. 4) 클라이언트 JS 코드 보안 난독화 (Node + Gradle 빌드 파이프라인 통합).
- 기술 스택: Spring Boot, MyBatis, JWT, thymeleaf, Gradle, MariaDB, Node.js.

## 인증 및 보안 (Authentication / JWT)
- 이중 검증 하이브리드: 
  1. **서버 측**: Spring Security를 보조해 로그인 로직(JWT 토큰 발급) 후 브라우저 `Cookie`상 접근 제한 목적으로 JWT 탑재. API 요청 시마다 토큰 검증.
  2. **클라이언트 측**: `SessionStorage`에 `user_name`을 담아 컴포넌트나 UI상 로그인 정보(뷰) 표기. 보안성과 속도를 병합한 렌더링.

## 덱 생성 및 카드 규칙 (Card Selection Logic)
- **동명 카드 관리**: "거북왕"과 "거북왕 ex"를 별도의 카드로 취급하지 않고 동일 포켓몬으로 묶도록 `filterArray(alt)` 로직 부여. 동일한 이름 계열이 총 2장을 초과할 시 alert 차단.
- **상하단 동기화 로직**: 하단 전체 카드 리스트 구역에서 클릭 시 상단 선택 컨테이너(`selectedCardList`)에 담김. "1/2" 및 "2/2" 처럼 카운터가 노출됨.
- **최종 제출 제어**: 클릭된 덱이 정확히 20장이 안되면 제출을 불허. 성공하면 선택된 카드 객체 배열의 식별자를 쉼표 문자열(`no_alt,no_alt`)로 합쳐서 DB 저장.

## 빌드 파이프라인 / 난독화 시스템
- `javascript-obfuscator` 채택. `package.json`를 기반으로 `obfuscate-js` npm 명령어를 정의, 이를 Spring Boot의 `build.gradle`에서 Node.js 플러그인 도구를 통해 함께 구동되게 엮음. 그 결과물은 `/dist` 디렉토리에 담겨, 최종 자바 컴파일 단계를 거칠 때 안전하게 외부 유출 방지된 스크립트로 동작.

## 트러블 슈팅 (TROUBLE SHOOTING)
1. **대용량 DB 데이터 처리**:
   - 증상: 방대한 포켓몬 카드를 일일이 입력 중 파일명과 마스터 데이터가 어긋남.
   - 해결: Excel을 활용해 일괄 INSERT 문을 수식 자동화(concat 등)하여 정제된 포맷으로 변환해 MariaDB에 적용함.
2. **동일 명칭 통합 관리의 복잡성**:
   - 증상: 영문 번호, 파생 카드, 'ex' 카드 등 카드 이미지는 다르지만 본체는 같아 한 덱에 초과 투입 시 공식 룰을 위반함.
   - 해결: 카드 명칭(`alt` 요소)을 분리하여 기본 베이스 포켓몬명을 추출하고 중복 체크. 앞서 말한 `filterArray`를 통해 한 덱 내의 특정 접미사를 제거한 순수 모델명이 몇 장인지 파악되게 구성.
3. **JS 빌드 난독화 꼬임**:
   - 문제점: NodeJS 플러그인과 Gradle을 분리하면 매번 빌드 디플로이가 불편함. 경로 참조 오류가 잦음.
   - 해결: Gradle의 `dependsOn cleanDist`, `obfuscateJs`, `processResources` 연쇄 빌드 체력을 완성하여 "코딩 후 단일 빌드 한번"만으로 난독화 결과물이 `static/dist/js`로 이식되게 제어.
4. **모바일 반응형 한계**:
   - 증상: Bootstrap 그리드 활용에서 모델별로 레이아웃이 붕괴.
   - 개선: `@media` CSS 미디어 쿼리와 Bootstrap `col-sm-`, `col-md-` 반응형 스킬을 혼합 조절하여 최적화.
