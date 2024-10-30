'use client';

import React from 'react';

// ボタン画像をインポート
import LeftButton from '../assets/images/leftbutton.svg';
import RightButton from '../assets/images/rightbutton.svg';

const Dashboard: React.FC = () => {
  return (
    <div 
      className="w-11/12 max-w-[1489px] mx-auto p-8 rounded-2xl bg-[#060038] flex flex-col gap-8 relative"
      style={{ border: '4px solid #F765A0', borderRadius: '16px' }} // 全体の縁線
    >
      
      <div className="flex justify-between gap-32 dashboard-border h-full">
        {/* 左側の統計情報 */}
        <div className="relative flex flex-col items-center" style={{ marginLeft: '5%' }}>
          <div
            className="absolute top-0 left-0 bg-[#A7F002] rounded-lg w-40 flex justify-between items-center shadow-md"
            style={{ 
              transform: 'translate(-20%, -120%)', 
              width: '250px', 
              height: '50px', 
              padding: '0 12px' 
            }}
          >
            <span className="font-bold text-sm">NAME:</span>
            <span className="font-bold text-2xl">XXX</span>
          </div>

          {/* グリッドエリア */}
          <div 
            className="grid grid-cols-2 gap-8 place-items-center" 
            style={{ marginTop: '40%' }} 
          >
            {[
              { label: 'PEOPLE', value: 40, icon: '🧑' },
              { label: 'WORKS', value: 10, icon: '📕' },
              { label: 'VISITOR', value: 88, icon: '👀' },
              { label: 'LIKES', value: 18, icon: '🥰' },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#271D42] rounded-xl w-32 h-32 flex flex-col items-center justify-center text-center"
              >
                <div className="text-[#A7F002] text-lg">{item.label}</div>
                <div className="text-2xl">
                  {item.icon}
                </div>
                <div
                  className="text-6xl font-bold text-[#F765A0]"
                  style={{ fontFamily: 'Wendy One, sans-serif' }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右側のメインエリア */}
        <div className="relative flex-1 bg-[#1E1438] rounded-2xl p-8 flex flex-col gap-y-20 mt-11 mr-9"
          style={{
            height: 'auto',
            transform: 'translateX(-40px)',
          }}
        >
          {/* テキストコンテンツを左揃えに */}
          <div className="text-left">
            <h1
              className="font-bold text-[#A7F002]"
              style={{
                fontFamily: 'Suez One',
                fontSize: '10rem', // さらに大きく
                lineHeight: '1',   // 行間を狭める
              }}
            >
              MONS<br />TOR
            </h1>
            <div className="mt-4 text-lg">
              <span style={{ color: '#A7F002' }}>FROM:</span>
              <span style={{ color: '#3242DC', marginLeft: '8px' }}>10/28</span>
              <span style={{ color: '#A7F002', marginLeft: '16px' }}>TO:</span>
              <span style={{ color: '#3242DC', marginLeft: '8px' }}>10/31</span>
            </div>
          </div>

          {/* ボタンを右揃えに */}
            <button
              className="bg-[#4255FF] text-[#A7F002] font-bold px-12 py-4 rounded-lg absolute"
              style={{
                bottom: '30px',
                right: '-70px',
                zIndex: '9',
                border: '2px solid #A7F002', // 外枠の線
                borderRadius: '0',
              }}
            >
              START CODING
            </button>

          {/* 2 DAYS LEFT をメインエリアの外に配置 */}
          <div
            className="absolute text-[#A7F002] text-5xl font-bold"
            style={{
              top: '-60px',       // メインエリアの上部に揃える
              left: '50px',    // 左にずらしてメインエリアの外に配置
              zIndex: '10',      // 他の要素よりも上に配置
            }}
          >
            2 DAYS LEFT
          </div>
        </div>
      </div>

      {/* ナビゲーションとインジケーター */}
      <div className="relative mt-4 flex justify-end pr-80">
        <div className="flex items-center gap-12">
          <button className="w-12 h-12">
            <img src={LeftButton.src} alt="Left Button" className="w-full h-full" />
          </button>
          <div className="flex gap-4">
            <span className="w-3 h-3 bg-[#3242DC] rounded-full"></span>
            <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
          </div>
          <button className="w-12 h-12">
            <img src={RightButton.src} alt="Right Button" className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;