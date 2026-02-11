import { projectList } from "@/data/projectList";
import Link from "next/link";

export default function ProjectSection() {

  return (
    <div className="project-area bg-navy white font-sml">
      {projectList.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <div key={project.id} className="project-area-list">
            
            {/* 1. 이미지 영역 */}
            <div className="project-area-img">
              {/* 이미지가 없다면 회색 박스로 보이게 처리 */}
              {project.titleImg !== "/" ? (
                <img src={project.titleImg} alt={project.title} />
              ) : (
                <div style={{width:'100%', height:'100%', backgroundColor:'#3d3e5e'}} />
              )}
            </div>

            {/* 2. 설명 영역 (새로운 div로 감쌌습니다) */}
            <div className="project-area-text-group"> 
              <span className="font-mid" style={{ marginBottom: '0.5vw' }}>
                {project.title}
              </span>
              <span className="font-sml" style={{ opacity: 0.8, lineHeight: '1.5' }}>
                {project.desc}
              </span>
              
              {/* 버튼 예시 (필요하면 사용하세요) */}
              <div style={{ marginTop: '1vw' }}>
                  <button style={{
                      padding: '0.5vw 1.5vw', 
                      border: '1px solid white', 
                      background: 'transparent', 
                      color: 'white', 
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                  }} >
                      자세히 보기
                  </button>
              </div>
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
}