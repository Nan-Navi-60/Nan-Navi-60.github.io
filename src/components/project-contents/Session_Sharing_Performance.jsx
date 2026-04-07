import ProjectSummary from './ProjectSummary';
import { Section } from '../ui/Section';
import { Item } from '../ui/Item';
import ProjectImage from '../ui/ProjectImage';
import Code from '../ui/Code';

export default async function SessionSharingPerformance() {
    return (
        <div className="project-detail-container">
            <h1 className="detail-title">Session Sharing Performance (세션 저장소 응답 성능 교차 검증)</h1>
            <ProjectSummary projectName="Session Sharing Performance" />

            <Section title={'INDEX'}>
                <Item subTitle={'테스트 목적 및 가설'}>
                    <p>1. In-Memory 우위: 인메모리 방식인 Redis가 물리적으로 가장 빠른 속도를 보장할 것이다.</p>
                    <p>2. RAM 용량의 변수: In-Memory 방식은 메모리 의존도가 높으므로, RAM이 상대적으로 낮은 환경에선 병목과 속도 저하가 클 것이다.</p>
                    <p>3. 쓰기/읽기 수준 차이: 단순 텍스트 수준의 세션을 다루면 RDBMS를 사용하더라도 큰 성능 차이는 보이지 않을 수 있을 것이다.</p>
                </Item>
            </Section>

            <Section title={'TECHNICAL IMPLEMENTATION'}>
                <Item subTitle={'1. 데이터 크기 제어 및 API 구성'}>
                    <p>하드웨어 및 저장소 간 확실한 차이를 보기 위해 일반적인 세션보다 무거운 1KB 크기의 더미 데이터를 구성하여 세션에 할당했습니다.</p>
                    <p>- Write 작업 (POST /api/login): 1KB 데이터가 적재된 User 정보를 세션에 생성</p>
                    <p>- Read 작업 (GET /api/user): 생성된 세션을 반복적으로 읽어 반환</p>
                </Item>
                <Item subTitle={'2. Hazelcast 클러스터링 구성 방식'}>
                    <p>멀티캐스트 방식을 사용하지 않고 TCP/IP 네트워크를 이용해 서로 노드를 직접 명시하도록 구현했습니다.</p>
                    <Code language={'java'}>
                        {`
@Bean
public Config hazelcastConfig() {
    Config config = new Config();
    config.setInstanceName("session-cluster-instance");

    JoinConfig joinConfig = config.getNetworkConfig().getJoin();
    joinConfig.getMulticastConfig().setEnabled(false); // 멀티캐스트 비활성화

    joinConfig.getTcpIpConfig().setEnabled(true)
            .addMember("cluster-node1")
            .addMember("cluster-node2");

    return config;
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'3. Redis 직렬화 및 최적화'}>
                    <p>무거운 JDK 직렬화 방식 대신 JSON 직렬화를 사용하여 성능 오버헤드를 낮추는 구성을 적용했습니다.</p>
                    <Code language={'java'}>
                        {`
@Bean
public RedisSerializer<Object> springSessionDefaultRedisSerializer() {
    return new GenericJackson2JsonRedisSerializer();
}
                    `}
                    </Code>
                </Item>
                <Item subTitle={'4. RDBMS (MySQL) 테이블 자동 생성 및 커넥션 풀'}>
                    <p>Spring Session에서 테이블을 자동 구성하도록 설정하고 HikariCP 커넥션 풀을 적절히 제한해 분배했습니다.</p>
                    <Code language={'properties'}>
                        {`
spring.session.store-type=jdbc
spring.session.jdbc.initialize-schema=always
spring.session.jdbc.table-name=SPRING_SESSION
                    `}
                    </Code>
                </Item>
            </Section>

            <Section title={'TEST SETTING'}>
                <Item subTitle={'포트 분리 및 이중화 (Docker)'}>
                    <p>로드 밸런싱 상황을 모사한 Docker Compose 환경에서 읽기와 쓰기 테스트를 위해 각각 별도의 WAS 노드로 분리했습니다.</p>
                    <p>- Redis 노드 (7070, 7071) | MySQL 노드 (8080, 8081) | Hazelcast 노드 (9090, 9091)</p>
                    <ProjectImage src={'/img/projectImg/SessionSharingPerformance/dockerSetting.png'} />
                </Item>
                <Item subTitle={'JMeter 부하 시나리오 및 통제'}>
                    <p>1,000명의 가상 사용자가 20초간 각각 100번씩 요청을 보내는 패턴을 실시하였습니다.</p>
                    <p>특정 저장소 테스트로 누적된 하드웨어 피로 및 캐시 찌꺼기가 남는 것을 막기 위해, 테스트들 사이에 15분의 긴 쿨타임(Delay)을 엄격하게 적용해 결과를 도출했습니다.</p>
                </Item>
                <Item subTitle={'3단계 하드웨어 교차 테스트'}>
                    <p>사양별 하드웨어 특성에 따른 변수를 확인하기 위해 세 가지 다른 물리 기반 환경을 구축했습니다.</p>
                    <p>- Desktop (10-Core, 16GB RAM) | Laptop (6-Core, 32GB RAM) | Raspberry Pi (4-Core, 8GB RAM)</p>
                    <ProjectImage src={'/img/projectImg/SessionSharingPerformance/environment.png'} />
                </Item>
            </Section>

            <Section title={'VISUAL'}>
                <Item subTitle={'부하 테스트에 따른 응답 시간 추이 (예시)'}>
                    <p>2,000개 요청 단위로 버킷을 만들어 평균된 응답 속도 성능 지표입니다. Desktop, Laptop, Raspberry Pi 환경에서의 Redis, Cluster, MySQL 성능을 분리 비교합니다.</p>
                    <p>RaspberryPi의 환경에서는 특이하게도 응답시간이 100,000ms를 초과하는 상황이 발생하였습니다. </p>
                    <ProjectImage
                        src={'/img/projectImg/SessionSharingPerformance/laptop.png'}
                        alt='성능 시각화 결과'
                    />
                    <ProjectImage
                        src={'/img/projectImg/SessionSharingPerformance/desktop.png'}
                        alt='성능 시각화 결과'
                    />
                    <ProjectImage
                        src={'/img/projectImg/SessionSharingPerformance/raspberrypi.png'}
                        alt='성능 시각화 결과'
                    />
                </Item>
            </Section>

            <Section title={'STRUCTURE'}>
                <Item subTitle={'핵심 결과 및 교차 분석'}>
                    <p>1. Redis vs Clustering: Hazelcast Clustering은 다른 WAS의 세션 데이터를 스스로의 내부 메모리에 동기화해 두기 때문에, 네트워크 IO 비용이 수반되는 Redis보다 Read 연산에서 오히려 우위를 보였습니다.</p>
                    <p>2. RDBMS 성능 대폭락: 하드디스크 중심 On-Disk의 물리적 IO 제약과 MySQL Connection Pool의 Context Switching이 합쳐져 심각한 병목을 일으켰습니다. 특히 외부 USB를 사용하는 라즈베리파이의 경우 그 단점이 극명히 나타났습니다.</p>
                </Item>
            </Section>

            <Section title={'TROUBLE SHOOTING'}>
                <Item subTitle={'1. 극심한 메모리 부족 (OOM) 현상'}>
                    <p>테스트 부하 직후 메모리 리소스가 초과되며 서버가 셧다운되는 증상을 다수 경험했습니다.</p>
                    <p>저지연 GC(ZGC) 튜닝과 도커 내 리소스 제약을 면밀히 파악하면서 부하량을 분산하여 해결 방안을 모색했습니다.</p>
                </Item>
                <Item subTitle={'2. Connection Pool Size 초기화 한계'}>
                    <p>RDBMS 테스트 중 어느 순간 병목이 폭증하여 멈추는 현상이 발생했습니다.</p>
                    <p>JDBC 커넥션 풀 사이즈를 기본값인 10으로 방치한 채 1,000 유저의 동시 요청을 소화하려다 발생한 병목임을 파악하고, 커넥션 풀 크기를 재설정하여 해결했습니다.</p>
                </Item>
            </Section>
        </div>
    );
}
