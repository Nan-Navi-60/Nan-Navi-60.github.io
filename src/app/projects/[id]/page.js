import { useParams } from 'next/navigation';
import { projectList } from '../../../data/projectList';
import ProjectContent from '../../../components/project-contents/Registry';
import Link from 'next/link';
import '../../../app/globals.css'; // CSS 적용

export function generateStaticParams() {
  return projectList.map((project) => ({
    id: project.id.toString(),
  }));
}

export default function ProjectDetail() {
  const params = useParams();

  // 빌드 과정에서 params가 없을 수도 있는 상황을 대비 (Optional Chaining)
  const id = params?.id ? Number(params.id) : null;

  // 1. 메타 데이터 찾기
  const metaData = projectList.find((p) => p.id === id);

  if (!metaData) return <div>존재하지 않는 프로젝트입니다.</div>;

  return (
    <div className="wrap">
      {/* 상단 헤더 영역 (공통 디자인) */}
      <div className="detail-header">
        <h1 className="font-mid">{metaData.title}</h1>
        <p className="font-sml">{metaData.desc}</p>
        
        <div className="detail-meta-info">
            <span>📅 {metaData.period}</span>
            <span>👥 {metaData.team}</span>
        </div>

        <div className="detail-links">
            {metaData.repoLink && <Link href={metaData.repoLink} className="btn-link" target="_blank">GitHub</Link>}
            {metaData.demoLink && <Link href={metaData.demoLink} className="btn-link" target="_blank">Live Demo</Link>}
        </div>
      </div>

      <hr className="divider" />

      {/* 본문 영역 (개별 파일 로딩) */}
      <div className="detail-content-area">
        <ProjectContent id={id} />
      </div>

      <div style={{marginTop: '5vw', textAlign: 'center'}}>
        <Link href="/" className="btn-back">목록으로 돌아가기</Link>
      </div>
    </div>
  );
}