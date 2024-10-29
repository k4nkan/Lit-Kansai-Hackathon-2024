import React from 'react';

const Header = () => {
  return (
    <header className="header flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: '#151454', color: '#F765A0' }}>
      <div className="logo text-6xl font-bold px-4 py-2 border-2 rounded-md" style={{ borderColor: '#F765A0', color: '#F765A0' }}>
        SERVICE NAME
      </div>
      <nav className="nav-links flex gap-6">
        <a href="#home" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>HOME</a>
        <a href="#cording" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>CORDING</a>
        <a href="#profile" className="hover:glow-effect" style={{ color: '#F765A0', textDecoration: 'none' }}>PROFILE</a>
      </nav>
    </header>
  );
};

export default Header;