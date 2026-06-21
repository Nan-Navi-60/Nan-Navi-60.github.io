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
        <Header />
        {children}
      </body>
    </html>
  );
}
