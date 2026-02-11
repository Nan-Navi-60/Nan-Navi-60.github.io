import Link from 'next/link';

export default function Header() {
  return (
    <div className="header bg-navy">
      <Link href="/" style={{ flexGrow: 3, fontWeight: 'bolder', color: '#ef6d58' }}>
        Nan-Navi-60
      </Link>
      <Link style={{ flexGrow: 1 }} href="/">메뉴 1</Link>
      <Link style={{ flexGrow: 1 }} href="/">메뉴 2</Link>
      <Link style={{ flexGrow: 1 }} href="/">메뉴 3</Link>
      <Link style={{ flexGrow: 1 }} href="/">메뉴 4</Link>
    </div>
  );
}