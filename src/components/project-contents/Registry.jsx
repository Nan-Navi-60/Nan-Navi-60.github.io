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
  const SelectedContent = contents[id];
  const isContentNull = contents[id] === null;

  // 아직 내용이 없는 경우
  if (isContentNull) return <div className="padding-2vw">아직 작성 중인 Project입니다!</div>
  // 해당하는 내용이 없으면 에러 메시지 혹은 빈 화면
  if (!SelectedContent) return <div className="padding-2vw">해당 Project를 찾을 수 없습니다.</div>;

  return <SelectedContent />;
}