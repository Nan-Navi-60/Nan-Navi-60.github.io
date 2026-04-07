import ProfileSection from '../components/ProfileSection';
import SkillSection from '../components/SkillSection';
import ProjectSection from '../components/ProjectSection';
import { skills } from '../data/skillList';
import CallSection from '@/components/CallSection';

export default function Home() {
  return (
    <div className="wrap">
      {/* 1. 프로필 영역 */}
      <ProfileSection />
      <CallSection />
      
      {/* 2. 스킬 영역 */}
      <SkillSection skills={skills} />
      
      {/* 3. 프로젝트 영역 */}
      <ProjectSection />
    </div>
  );
}