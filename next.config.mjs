/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 핵심: 정적 파일(HTML)로 내보내기 설정
  images: {
    unoptimized: true, // GitHub Pages에서는 Next.js의 이미지 최적화 기능 사용 불가 (필수 설정)
  },
};

export default nextConfig;