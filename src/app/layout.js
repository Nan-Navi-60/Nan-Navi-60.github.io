import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'Nan-Navi-60 Portfolio',
  description: '이강산의 포트폴리오입니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-white">
        {/* 헤더는 모든 페이지에 공통으로 보입니다 */}
        <Header />
        
        {/* children 위치에 각 페이지(page.js)의 내용이 들어갑니다 */}
        {children}
      </body>
    </html>
  );
}