export default function ProfileSection() {
  return (
    <div className="profile-area-personal">
      <div className="profile-area-text">
        <span className="font-big">이강산</span>
        <span className="font-mid orange" style={{ marginBottom: '10%', margin: '0 0 1vw 1vw' }}>
          Lee KangSan
        </span>
        <span className="font-sml">PhotoShop과 Illustrator, AdobeXd를 통해 웹사이트를 설계한 후</span>
        <span className="font-sml">BootStrap을 활용하여 구체화 시킵니다.</span>
        <span className="font-sml">SpringBoot와 mySql를 통해 사이트를 백엔드 기능을 공부하고</span>
        <span className="font-sml">aws를 통해 배포하는 연습을 하고 있습니다.</span>
      </div>
      <div className="profile-area-img">
        {/* Next.js에서는 이미지를 public 폴더 기준 경로로 불러옵니다 */}
        <img src="/img/profile_jpg.jpg" alt="profile" />
      </div>
    </div>
  );
}