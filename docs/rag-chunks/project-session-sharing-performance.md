# Session Sharing Performance 프로젝트 (ID: 6)

## 개요
- 제목: 세션 저장소 방식(Redis, MySQL, Hazelcast) 응답 성능 교차 검증
- 개발 목표: 다중 WAS 아키텍처 환경에서 여러 방식의 세션 저장소 모델이 각기 다른 하드웨어 사양(고성능~저사양)에서 어떠한 응답 성능 곡선과 병목을 일으킬지 직접 구현 및 비교 분석
- 핵심 스택: Spring Boot, Redis, MySQL(JDBC), Hazelcast Clustering, JMeter, Docker Compose, Python (Pandas, Matplotlib)

## 테스트 구조 및 부하 시나리오 통제 (TEST SETTING)
- **1KB 세션 데이터**: 단순 조회가 아닌, 각 저장소와 직렬화 오버헤드를 극대화하기 위해 1KB의 문자열 더미 데이터를 세션 Payload로 강제 삽입하여 측정.
- **Docker 분리 구성**: 읽기와 쓰기 테스트를 분산하기 위해 Redis, MySQL, Hazelcast 방식 모두 각 포트를 이중화(WAS 2개 구성)하여 동작.
- **JMeter 부하 시나리오**: 1,000명의 Virtual 사용자가 20초간 각 100회 요청 (총 10만 건 반복). 
- **Delay 쿨타임**: H/W 온도 상승이나 스레드 잔류, GC 연산 누적 등 이전 테스트가 다음 테스트에 줄 간섭을 막기 위해 각 테스트 간 15분의 의도적 대기 적용.

## 내부 구현 상세 (STRUCTURE)
- **Redis (Lettuce)**: NoSQL ইন-메모리 저장소. 기본 JDK 직렬화 대신 속도 향상을 위해 `GenericJackson2JsonRedisSerializer`를 빈으로 등록하여 JSON 형태로 세션을 관리.
- **Session Clustering (Hazelcast)**: WAS 서버 간의 내장 메모리를 직접 동기화하는 P2P 방식. 멀티캐스트를 차단하고 각 노드를 TCP/IP로 직접 연결(`addMember()`)하여 브로드캐스트의 낭비 없는 데이터 동기화를 이룸.
- **JDBC Session (MySQL)**: 영속성 중심 RDBMS 방식. `initialize-schema=always`로 세션 테이블을 Spring이 자동 동기화.

## 핵심 성능 분석 결과 (ANALYSIS)
1. **Redis vs Hazelcast (Clustering)**: 예상 외로 Redis가 가장 압도적일 것이란 가설과 달리, 두 방식이 막상막하를 기록했습니다. 원인은 Redis는 결국 외부 노드(DB)로 연결되어 Network IO 비용이 들지만, Hazelcast는 P2P 동기화 특성상 자기 자신의 로컬 메모리를 즉시 탐색하므로 Read 성능에서 오히려 우위를 점하는 병목의 분산 효과를 증명했습니다.
2. **RDBMS 최악의 병목 현상**: 저사양(라즈베리파이)일수록 수 만 ms 응답시간이 지연되며 서버가 사실상 다운되는 결과를 보였습니다. Redis의 Event Loop(싱글 스레드)와 달리 MySQL Connection Pool 전환 간 발생하는 극심한 Context Switching 낭비 문제, 그리고 RAM을 따라갈 수 없는 물리적 On-Disk IO 한계가 원인이었습니다.

## 트러블 슈팅 (TROUBLE SHOOTING)
1. **극심한 메모리 부족 (OOM) 셧다운 현상**:
   - 문제: 부하 테스트 개시와 동시에 저/중사양 테스트 장비에서 메모리 예외(Out Of Memory)로 인해 프로세스가 전체 강제 종료되는 증상 발생.
   - 해결책: 극단적 GC 오버헤드를 막기위해 Docker 기동 커맨드에 `-XX:+UseZGC` 옵션을 부여하여 최신 저지연 가비지 컬렉터로 방어. 더불어 리소스 제약을 꼼꼼히 확인하고 부하 분산 전략 마련.
2. **Connection Pool Size 초기화 한계 (Pool Size = 10)**:
   - 문제: RDBMS 방식 부하 중에 어느 지점부터 응답을 거절하며 TPS가 수직 낙하하는 병목 발견.
   - 해결책: Spring/HikariCP의 기본 커넥션 풀 사이즈가 10 혹은 특정 값으로 작게 할당된 상태로 수천 건의 쓰레드를 마주쳐 WAS 단말부터 Block 됨을 인지. 커넥션 풀 사이즈 설정 튜닝으로 트래픽 소화.
