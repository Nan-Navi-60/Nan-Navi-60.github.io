import { projectList } from '@/data/projectList';
import Link from 'next/link';
import SkillSection from '@/components/SkillSection';
import "@/app/detail.css";

// 1. [필수] 정적 배포를 위해 빌드 시 페이지 ID 목록을 미리 생성
// 미리 정의된 함수 명
export async function generateStaticParams() {
  return projectList.map((project) => ({
    id: project.id.toString(),
  }));
}

// 2. [서버 컴포넌트] 페이지 본문
// params는 비동기(Promise) 데이터이므로 async/await로 처리해야 합니다.
export default async function ProjectLayout({ children, params }) {
  
  // Next.js 15+ 문법 대응: params를 await로 풀어서 사용
  const resolvedParams = await params;
  // 실제로 호출된 id를 저장
  const id = Number(resolvedParams.id);

  // 데이터 찾기
  const metaData = projectList.find((p) => p.id === id);

  // 예외 처리 (데이터가 없을 때)
  if (!metaData) {
    return <div className="padding-2vw">존재하지 않는 프로젝트입니다.</div>;
  }

  const setStack = () => {
    return <SkillSection skills={metaData.stack}/>;
  }

  return (
    <div className="wrap">
      {/* 상단 헤더 영역 */}
      <div className="detail-header">
        <h1 className="font-mid">{metaData.title}</h1>
        <p className="font-sml">{metaData.desc}</p>
        
        <div className="detail-meta-info">
            <span>📅 {metaData.period}</span>
            <span>👥 {metaData.team}</span>
        </div>

        <div className='stack-list'>
          {setStack()}
        </div>

        <div className="detail-links">
            {metaData.repoLink && <Link href={metaData.repoLink} className="btn-link" target="_blank">GitHub</Link>}
            {/* {metaData.demoLink && <Link href={metaData.demoLink} className="btn-link" target="_blank">Live Demo</Link>} */}
        </div>
      </div>

      <hr className="divider" />

      {/* 본문 영역 */}
      <div className="detail-content-area">
        {children}
      </div>

      <div style={{marginTop: '5vw', textAlign: 'center'}}>
        <Link href="/" className="btn-back">목록으로 돌아가기</Link>
      </div>
    </div>
  );
}
