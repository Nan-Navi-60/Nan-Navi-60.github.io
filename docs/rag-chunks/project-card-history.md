# Card History 3Tier System 프로젝트 (ID: 5)

## 개요
- 제목: 3-Tier 아키텍처 카드 거래내역 시스템
- 학습 목표: Docker 기반 3-tier 완전 격리 구현. 부하분산(Nginx), 세션 분산 환경에서의 중앙화 결합(Redis), 데이터 읽기/쓰기 커넥션 스플릿(MySQL Cluster).
- 기술 스택: Java Servlet, Docker (11대 컨테이너), Nginx (Master 1 / Worker 2), Redis, MySQL Router/Cluster (Source 1 / Replica 2), HikariCP.

## 3-Tier 구조도 (ARCHITECTURE)
1. **Presentation Layer**: Nginx 이중 부하 분산 체계 구성. 
   - `Master Nginx(80)` ➔ `Worker Nginx1 / Nginx2`로 1차 프록시 ➔ 각 `Tomcat WAS` 노드로 2차 분산. X-Real-IP 헤더 패싱.
2. **Application Layer**: Java Servlet 엔진 (Tomcat :8080, :8090 구성)과 Redis.
   - 단일 장애점을 고려하여 트래픽 응답 시 중앙화된 Redis Session에 모든 접속 쿠키("REDIS_SESSION_ID")를 검증.
3. **Data Layer**: MySQL Router 포트(6446, 6447) 분리 및 Cluster (3노드). 
   - 6446 포트는 C/U/D (Write), 6447 포트는 Read전용. Java의 HikariCP가 DataSource를 두벌로 들고 목적에 따라 다른 스레드 풀 이용. 로직 내 `ApplicationContextListener.getSourceDataSource` 와 `getReplicaDataSource` 동적으로 채용.

## 심화 구조 (STRUCTURE)
- **자바 서블릿 필터 체인 (Filter-Chain)**:
   - 순서: RedisSessionFilter ➔ LoginSessionCheckFilter ➔ EncodingFilter.
   - 특정 확장자(css, js, png 등)의 정적 파일 요청을 필터에서 검증 스킵하여 속도 및 병목 최소화(`chain.doFilter` 직행).
- **Redis Java 직렬화 방식(Serialization)**:
   - HashMap 형태의 attributes를 `Jedis` 클래스를 통해 저장. JSON(Gson)을 버리고 Java Native 객체 바이트 스트림 후 `Base64` 문자열로 컨버팅. 영속성과 타입 변조 차단, `setex` 명령으로 단위시간 만료 수반.
- **MySQL GTID 기반 레플리케이션**:
   - Primary DB 노드의 바이너리 로그가 Secondary Replica 노드들에게 자동 복제됨. `gtid-mode=ON`, `enforce-gtid-consistency=ON` 환경 제공.

## 트러블 슈팅 (TROUBLE SHOOTING)
1. **MySQL 클러스터 초기화 시간 소요 문제**:
   - 증상: Docker를 켤 때마다 DB 복제 토폴로지 구성에 시간/복잡도가 막대하게 큼.
   - 대처: Docker 초기화 bash script 파일화 및 파라미터화. `dba.rebootClusterFromCompleteOutage` 등의 명령어 구문을 스크립트로 자동 응답하여 수분 이내 클러스터 복원.
2. **Redis 세션 데이터 복원 중 객체 깨짐 (Gson 한계)**:
   - 문제: JSON 직렬화/역직렬화(Gson)를 썼을 때 클래스/컬렉션 메타데이터 증발.
   - 대처 방안: `ObjectOutputStream`을 활용하여 직렬화시키고 Base64 인코딩. 원천 타입 자체를 보존시켜 세션 간 복제 오류 삭제.
3. **Docker 컨테이너 사이클 꼬임**:
   - 원인: Redis 및 DB가 준비되지 않았는데 WAS가 먼저 연결을 수립하다 에러 종료.
   - 방안: `docker-compose.yml`에서 `depends_on` 체인 및 `condition: service_healthy` 트리거를 걸쇠처럼 잠금 조치하여 컨테이너 의존 시작순서를 제어함.
