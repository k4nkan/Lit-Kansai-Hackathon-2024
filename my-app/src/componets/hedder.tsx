import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="header flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#151454', color: '#F765A0' }}>
      <div className="logo text-6xl font-bold px-4 py-2 border-2 rounded-md" style={{ borderColor: '#F765A0', color: '#F765A0' }}>
        SERVICE NAME
      </div>
      <nav className="nav-links flex gap-6">
        <Link href="/top" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>Home</Link>
        <Link href="/coding" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>Coding</Link>
        <Link href="/profile" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>Profile</Link>
      </nav>
    </header>
  );
};

export default Header;