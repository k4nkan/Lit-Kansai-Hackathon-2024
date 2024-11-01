import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="mx-auto px-10 py-5">
      <header
        className="header flex justify-between items-center p-4 rounded-lg"
        style={{
          backgroundColor: '#060038',
          color: '#F765A0',
          border: '2px solid #F765A0',
          borderRadius: '12px',
        }}
      >
        <div
          className="logo text-6xl font-bold px-4 py-2"
          style={{ color: '#F765A0' }}
        >
          SERVICE NAME
        </div>
        <nav className="nav-links flex gap-6">
          <Link href="/top" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>
            Home
          </Link>
          <Link href="/coding" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>
            Coding
          </Link>
          <Link href="/profile" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>
            Profile
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;