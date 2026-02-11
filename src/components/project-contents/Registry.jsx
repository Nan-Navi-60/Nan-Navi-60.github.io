import NoticeBoard from './Notice_board';
import Jicbak from './Jicbak';
import PokemonDecksplorer from './Pokemon_Decksplorer'
import HealthCare from './Health_Care';

// ID와 컴포넌트를 매핑합니다.
const contents = {
  1: NoticeBoard,
  2: Jicbak,
  3: PokemonDecksplorer,
  4: HealthCare
};

export default function ProjectContent({ id }) {
  // 전달 받은 id에 매칭되는 파일을 contents에 저장
  const SelectedContent = contents[id];

  // 매칭되는 id가 존재하지 않음
  if (!SelectedContent) return <div className="padding-2vw">해당 Project를 찾을 수 없습니다.</div>;

  return <SelectedContent />;
}