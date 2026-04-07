import ProjectSummary from './ProjectSummary';
import { Section } from '../ui/Section';
import { Item } from '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';
import Mermaid from '../ui/Mermaid';

export default async function ProjectDetail() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">3-Tier 아키텍처 카드 거래내역 시스템</h1>
            <ProjectSummary projectName="Card History 3 Tier System" />

            <Section title={'INDEX'}>
                <Item subTitle={'Docker 컨테이너 기반 3-tier 아키텍처 구현'}>
                    <p>1. MySQL Router + Cluster를 활용한 읽기/쓰기 분리 및 데이터베이스 부하 분산</p>
                    <p>2. Java Servlet 필터 체인을 통한 세션 관리, 인증, 인코딩 처리 자동화</p>
                    <p>3. 이중 부하분산 구조 (Master Nginx → Worker Nginx → WAS) 설계 및 구현</p>
                    <p>4. Redis 기반 세션 공유를 통한 WAS 간 상태 동기화 및 고가용성 확보</p>
                </Item>
            </Section>

            <Section title={'INTRODUCE'}>
                <Item subTitle={'Nginx 이중 부하분산'}>
                    <p>
                        Master Nginx가 외부 요청을 수신하여 2개의 Worker Nginx로 1차 분산하고,
                        각 Worker Nginx가 2개의 WAS 인스턴스로 2차 분산하는 구조로 설계했다.
                    </p>
                    <p>
                        라운드 로빈 방식으로 트래픽을 균등 분배하며, 단일 장애점을 제거하여 고가용성을 보장한다.
                    </p>
                    <Code language={'nginx'}>
                        {`
# Master Nginx 설정 (Worker Nginx로 부하분산)
upstream web-cluster {
    server worker-nginx-1:80;
    server worker-nginx-2:80;
}

# Worker Nginx 설정 (WAS로 부하분산)
upstream was-cluster {
    server was-8080:8080;
    server was-8090:8080;
}

location / {
    proxy_pass http://was-cluster;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'Redis 세션 공유 시스템'}>
                    <p>
                        WAS 2개 인스턴스 간 세션 데이터를 Redis로 중앙화하여 사용자가 어느 WAS에 접속해도 동일한 세션을 유지한다.
                    </p>
                    <p>
                        Java 직렬화 + Base64 인코딩으로 세션 데이터를 안전하게 저장하며, TTL 1800초로 자동 만료 처리한다.
                    </p>
                    <Code language={'java'}>
                        {`
// Redis 접속 정보 및 쿠키 설정
private static final String REDIS_HOST = "redis-session";
private static final int REDIS_PORT = 6379;
private static final String COOKIE_NAME = "REDIS_SESSION_ID";

// 세션 데이터를 Redis에 저장 (Java 직렬화)
public void saveToRedis() {
    try (Jedis jedis = new Jedis(REDIS_HOST, REDIS_PORT)) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ObjectOutputStream oos = new ObjectOutputStream(baos)) {
            oos.writeObject(attributes);
            String base64Data = Base64.getEncoder().encodeToString(baos.toByteArray());
            jedis.setex("session:" + id, maxInactiveInterval, base64Data);
        }
    } catch (Exception e) {
        System.err.println("[REDIS ERROR] 데이터 저장 실패: " + e.getMessage());
    }
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'MySQL Router + Cluster'}>
                    <p>
                        MySQL Router를 통해 쓰기 요청(포트 6446)은 Source 노드로, 읽기 요청(포트 6447)은 Replica 노드로 자동 라우팅한다.
                    </p>
                    <p>
                        GTID 기반 복제로 데이터 일관성을 보장하며, HikariCP 커넥션 풀로 데이터베이스 연결을 효율화했다.
                    </p>
                    <Code language={'java'}>
                        {`
// Source DataSource (쓰기 전용)
sourceConfig.setJdbcUrl("jdbc:mysql://mysql-router:6446/card_db");
sourceConfig.setReadOnly(false);
sourceConfig.setPoolName("SourcePool");

// Replica DataSource (읽기 전용)
replicaConfig.setJdbcUrl("jdbc:mysql://mysql-router:6447/card_db");
replicaConfig.setReadOnly(true);
replicaConfig.setMaximumPoolSize(20);  // 읽기 요청이 많으므로 풀 크기 증가
replicaConfig.setPoolName("ReplicaPool");

// Servlet에서 용도별 DataSource 사용
DataSource ds = ApplicationContextListener.getSourceDataSource(getServletContext());  // 쓰기
DataSource ds = ApplicationContextListener.getReplicaDataSource(getServletContext()); // 읽기
                    `}
                    </Code>
                </Item>
                <Item subTitle={'Java Servlet 필터 체인'}>
                    <p>
                        RedisSessionFilter → LoginSessionCheckFilter → EncodingFilter 순서로 모든 요청을 전처리한다.
                    </p>
                    <p>
                        세션 관리, 인증 확인, 인코딩 설정을 자동화하여 비즈니스 로직과 분리했다.
                    </p>
                    <Code language={'java'}>
                        {`
// 로그인 세션 확인 필터
private boolean isAuthenticated(HttpSession session) {
    return session != null && session.getAttribute("loggedInUser") != null;
}

private void handleUnauthorized(HttpServletRequest request, HttpServletResponse response, HttpSession session)
        throws IOException {
    // 세션 무효화
    if (session != null) {
        session.invalidate();
    }
    
    // REDIS_SESSION_ID 쿠키 삭제
    deleteCookie(request, response, "REDIS_SESSION_ID");
    
    if (isAjaxRequest(request)) {
        sendJsonError(response);
    } else {
        response.sendRedirect(request.getContextPath() + "/login.html");
    }
}
                    `}
                    </Code>
                </Item>

            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'Main Page'}>
                    <p>분기별 카드 거래내역 조회 메인 화면</p>
                    <ProjectImage src={'/img/projectImg/Card_History_3Tier_System/Main.png'} alt='Main' />
                </Item>
                <Item subTitle={'Login Page'}>
                    <p>사용자 번호 입력을 통한 로그인 화면</p>
                    <ProjectImage src={'/img/projectImg/Card_History_3Tier_System/login.png'} alt='Login' />
                </Item>
                <Item subTitle={'Fixed Expenses Management'}>
                    <p>분기별 고정비 항목 수정 화면</p>
                    <ProjectImage src={'/img/projectImg/Card_History_3Tier_System/fixed_expenses.png'} alt='Fixed Expenses' />
                </Item>
            </Section>

            <Section title={'FLOWCHART'}>
                <Item subTitle={'System Architecture'}>
                    <p>전체 시스템 구조 및 요청 처리 흐름</p>
                    <Mermaid chart={`
flowchart TB
    Client[클라이언트]
    
    subgraph Presentation["Presentation Layer"]
        MasterNginx[Master Nginx<br/>포트 80]
        WorkerNginx1[Worker Nginx 1<br/>포트 80]
        WorkerNginx2[Worker Nginx 2<br/>포트 80]
    end
    
    subgraph Application["Application Layer"]
        WAS1[WAS Tomcat<br/>포트 8080]
        WAS2[WAS Tomcat<br/>포트 8090]
        Redis[Redis 세션 저장소<br/>포트 6379]
    end
    
    subgraph Data["Data Layer"]
        Router[MySQL Router<br/>6446: Write<br/>6447: Read]
        Source[MySQL Node 1<br/>Source 포트 3310]
        Replica1[MySQL Node 2<br/>Replica 포트 3320]
        Replica2[MySQL Node 3<br/>Replica 포트 3330]
    end
    
    Client --> MasterNginx
    MasterNginx --> WorkerNginx1
    MasterNginx --> WorkerNginx2
    WorkerNginx1 --> WAS1
    WorkerNginx1 --> WAS2
    WorkerNginx2 --> WAS1
    WorkerNginx2 --> WAS2
    WAS1 <--> Redis
    WAS2 <--> Redis
    WAS1 --> Router
    WAS2 --> Router
    Router -->|Write 6446| Source
    Router -->|Read 6447| Replica1
    Router -->|Read 6447| Replica2
    Source -.->|Replication| Replica1
    Source -.->|Replication| Replica2
    
    style Presentation fill:#e1f5fe
    style Application fill:#f3e5f5
    style Data fill:#fff3e0
                    `} />
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'Nginx 계층 (Presentation Layer)'}>
                    <Section title={''}>
                        <Item subTitle={'이중 부하분산 구조'}>
                            <p>Master Nginx가 외부 요청을 수신하여 2개의 Worker Nginx로 1차 분산하고, 각 Worker Nginx가 2개의 WAS로 2차 분산한다.</p>
                            <p>라운드 로빈 알고리즘으로 트래픽을 균등 분배하며, 프록시 헤더를 통해 클라이언트 정보를 전달한다.</p>
                            <Code language={'nginx'}>
                                {`
# Master Nginx upstream 설정
upstream web-cluster {
    server worker-nginx-1:80;
    server worker-nginx-2:80;
}

server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://web-cluster;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'고가용성 보장'}>
                            <p>Worker Nginx 2개 인스턴스로 단일 장애점을 제거하고, 한 인스턴스가 다운되어도 나머지가 트래픽을 처리한다.</p>
                            <p>컨테이너 기반 배포로 장애 발생 시 빠른 복구가 가능하다.</p>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'Application 계층 (WAS + Redis)'}>
                    <Section title={''}>
                        <Item subTitle={'필터 체인 처리'}>
                            <p>모든 HTTP 요청이 RedisSessionFilter → LoginSessionCheckFilter → EncodingFilter 순서로 전처리된다.</p>
                            <p>정적 파일 요청은 세션 처리를 생략하여 성능을 최적화했다.</p>
                            <Code language={'java'}>
                                {`
// RedisSessionFilter에서 정적 파일 제외 처리
String uri = httpRequest.getRequestURI();
if (uri.matches(".*\\\\.(css|js|png|jpg|jpeg|gif|ico)$")) {
    chain.doFilter(request, response);
    return;
}

// 세션 ID 쿠키 확인 및 생성
String sid = getSessionIdFromCookie();
if (sid == null) {
    if (!create) return null;
    sid = java.util.UUID.randomUUID().toString();
    addSessionCookie(sid);
    System.out.println("[REDIS LOG] 신규 사용자를 위한 세션 ID 발급: " + sid);
}
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'세션 공유 메커니즘'}>
                            <p>Redis를 중앙 세션 저장소로 사용하여 WAS 2개 인스턴스 간 세션 데이터를 동기화한다.</p>
                            <p>Java 직렬화로 객체 타입을 유지하고, Base64 인코딩으로 안전하게 저장한다.</p>
                            <Code language={'java'}>
                                {`
// Redis에서 세션 데이터 로드
@SuppressWarnings("unchecked")
public void loadFromRedis() {
    try (Jedis jedis = new Jedis(REDIS_HOST, REDIS_PORT)) {
        String base64Data = jedis.get("session:" + id);
        if (base64Data != null) {
            byte[] data = Base64.getDecoder().decode(base64Data);
            try (ByteArrayInputStream bais = new ByteArrayInputStream(data);
                 ObjectInputStream ois = new ObjectInputStream(bais)) {
                attributes = (Map<String, Object>) ois.readObject();
            }
        }
    } catch (Exception e) {
        System.err.println("[REDIS ERROR] 데이터 로드 실패: " + e.getMessage());
    }
}
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'비즈니스 로직 처리'}>
                            <p>로그인, 거래내역 조회, 고정비 수정 등의 핵심 기능을 Servlet으로 구현했다.</p>
                            <p>용도에 따라 Source DataSource(쓰기)와 Replica DataSource(읽기)를 분리하여 사용한다.</p>
                            <Code language={'java'}>
                                {`
// 로그인 처리 (읽기 전용)
DataSource ds = ApplicationContextListener.getReplicaDataSource(getServletContext());
String sql = "SELECT SEQ FROM CARD_TRANSACTION WHERE SEQ = ?";

try (Connection conn = ds.getConnection(); 
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, userId);
    try (ResultSet rs = pstmt.executeQuery()) {
        if (rs.next()) {
            HttpSession session = request.getSession();
            session.setAttribute("loggedInUser", rs.getString("SEQ"));
            response.sendRedirect(request.getContextPath() + "/index.html");
        }
    }
}

// 고정비 수정 (쓰기 전용)
DataSource ds = ApplicationContextListener.getSourceDataSource(getServletContext());
String SQL = "UPDATE CARD_TRANSACTION SET "+ category +" = ? WHERE SEQ = ? AND BAS_YH = ?";
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'Database 계층 (MySQL Cluster)'}>
                    <Section title={''}>
                        <Item subTitle={'읽기/쓰기 분리'}>
                            <p>MySQL Router가 포트 6446(쓰기)과 6447(읽기)로 요청을 자동 라우팅한다.</p>
                            <p>쓰기는 Source 노드로, 읽기는 Replica 노드로 분산하여 데이터베이스 부하를 효율화했다.</p>
                            <Code language={'java'}>
                                {`
// HikariCP 커넥션 풀 설정
HikariConfig sourceConfig = new HikariConfig();
sourceConfig.setJdbcUrl("jdbc:mysql://mysql-router:6446/card_db?serverTimezone=Asia/Seoul&characterEncoding=UTF-8");
sourceConfig.setReadOnly(false);
sourceConfig.setPoolName("SourcePool");

HikariConfig replicaConfig = new HikariConfig();
replicaConfig.setJdbcUrl("jdbc:mysql://mysql-router:6447/card_db?serverTimezone=Asia/Seoul&characterEncoding=UTF-8");
replicaConfig.setReadOnly(true);
replicaConfig.setMaximumPoolSize(20);  // 조회 요청이 많으므로 풀 사이즈 증가
replicaConfig.setPoolName("ReplicaPool");
                            `}
                            </Code>
                        </Item>
                        <Item subTitle={'GTID 기반 복제'}>
                            <p>Source 노드의 변경사항이 GTID(Global Transaction Identifier)를 통해 Replica 노드로 자동 복제된다.</p>
                            <p>트랜잭션 중복 실행을 방지하고, 복제 일관성을 보장한다.</p>
                            <Code language={'ini'}>
                                {`
# MySQL 노드 설정 (node1.cnf - Source)
[mysqld]
server-id=1
log-bin=mysql-bin
gtid-mode=ON
enforce-gtid-consistency=ON
binlog-format=ROW
log-slave-updates=ON
report-host=mysql-node1

# MySQL 노드 설정 (node2.cnf - Replica)
[mysqld]
server-id=2
log-bin=mysql-bin
gtid-mode=ON
enforce-gtid-consistency=ON
binlog-format=ROW
log-slave-updates=ON
report-host=mysql-node2
                            `}
                            </Code>
                        </Item>
                    </Section>
                </Item>

                <Item subTitle={'Docker 세팅 자동화'}>
                    <p>Docker Compose로 11개 컨테이너의 실행 순서와 의존성을 관리한다.</p>
                    <p>MySQL Cluster → Redis → WAS → Nginx 순서로 시작하여 서비스 간 의존성을 보장한다.</p>
                    <Code language={'bash'}>
                        {`
# 컨테이너 실행 순서
# 1. MySQL Cluster 시작
docker-compose up -d mysql-node1 mysql-node2 mysql-node3

# 2. MySQL Router 시작
docker-compose up -d mysql-router

# 3. Redis 시작
docker-compose up -d redis-session

# 4. WAS 시작
docker-compose up -d was-8080 was-8090

# 5. Nginx 시작 (Worker → Master 순서)
docker-compose up -d worker-nginx-1 worker-nginx-2
docker-compose up -d master-nginx
                    `}
                    </Code>
                </Item>
            </Section>

            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. MySQL Cluster 초기 설정 복잡성'}>
                    <p>
                        MySQL Cluster 구성 시 GTID 설정, 복제 사용자 생성, 클러스터 초기화 등 복잡한 수동 작업이 필요했다.
                    </p>
                    <p>
                        단계별 초기화 스크립트를 작성하고 README.md에 상세한 설정 가이드를 문서화하여 해결했다.
                    </p>
                    <Code language={'bash'}>
                        {`
# MySQL Cluster 초기 설정 자동화
echo y | docker exec -i mysql-node1 mysqlsh --no-wizard -e "
shell.connect('clusteradmin:admin1234@mysql-node1:3306');
dba.rebootClusterFromCompleteOutage('cardCluster');
print(dba.getCluster('cardCluster').status());
"

# 데이터베이스 생성 및 복원
docker exec mysql-node1 mysql -u root -proot1234 -e "CREATE DATABASE IF NOT EXISTS card_db;"
docker cp ./card_db_backup.sql mysql-node1:/backup.sql
docker exec mysql-node1 bash -c "mysql -u root -proot1234 card_db < /backup.sql"
                    `}
                    </Code>
                    <p>
                        이를 통해 초기 설정 시간을 30분에서 5분으로 단축하고, 설정 오류를 방지할 수 있었다.
                    </p>
                </Item>
                <Item subTitle={'2. Redis 세션 직렬화 문제'}>
                    <p>
                        초기에 Gson을 사용한 JSON 직렬화 방식에서 Java 객체 타입 정보가 손실되어 세션 데이터 복원 시 오류가 발생했다.
                    </p>
                    <p>
                        Java 기본 직렬화 + Base64 인코딩 방식으로 변경하여 객체 타입을 완전히 보존하도록 수정했다.
                    </p>
                    <Code language={'java'}>
                        {`
// 기존 방식 (문제 발생)
// Gson gson = new Gson();
// String jsonData = gson.toJson(attributes);

// 개선된 방식 (Java 직렬화)
try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
     ObjectOutputStream oos = new ObjectOutputStream(baos)) {
    oos.writeObject(attributes);
    String base64Data = Base64.getEncoder().encodeToString(baos.toByteArray());
    jedis.setex("session:" + id, maxInactiveInterval, base64Data);
}
                    `}
                    </Code>
                    <p>
                        이를 통해 세션 데이터의 타입 안정성을 확보하고, WAS 간 세션 공유가 완벽하게 동작하게 되었다.
                    </p>
                </Item>
                <Item subTitle={'3. 컨테이너 시작 순서 의존성 문제'}>
                    <p>
                        MySQL Cluster가 완전히 초기화되기 전에 WAS가 시작되어 데이터베이스 연결 오류가 발생했다.
                    </p>
                    <p>
                        Docker Compose의 depends_on과 healthcheck를 활용하여 컨테이너 시작 순서를 제어했다.
                    </p>
                    <Code language={'yaml'}>
                        {`
# docker-compose.yml 의존성 설정
was-8080:
  depends_on:
    mysql-router:
      condition: service_healthy
    redis-session:
      condition: service_started

mysql-router:
  depends_on:
    mysql-node1:
      condition: service_healthy
    mysql-node2:
      condition: service_healthy
    mysql-node3:
      condition: service_healthy
                    `}
                    </Code>
                    <p>
                        추가로 수동 실행 가이드를 제공하여 안정적인 클러스터 구성을 보장했다.
                    </p>
                </Item>
            </Section>
        </div>
    );
}