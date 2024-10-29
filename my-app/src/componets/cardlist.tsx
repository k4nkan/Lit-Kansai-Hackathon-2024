'use client';

import React, { useState } from 'react';

// ボタン画像をインポート
import LeftButton from '../assets/images/leftbutton.svg';
import RightButton from '../assets/images/rightbutton.svg';

const themes = [
  'Title1',
  'Title2',
  'Title3',
  'Title4',
  'Title5',
  'Title6',
  'Title7',
  'Title8',
];

const CardList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  const paginatedCards = themes.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * cardsPerPage < themes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      className="p-8 rounded-lg mx-auto relative"
      style={{ width: '90%', maxWidth: '1489px', backgroundColor: '#151454' }}
    >
      {/* ヘッダー */}
      <h2 className="flex items-center gap-4 mb-8">
        <span
          style={{
            fontSize: '50px', // アイコンの大きさを調整
            color: '#A7F002',
            lineHeight: '1', // 高さの調整
          }}
        >
          ▶︎
        </span>
        <span style={{ fontSize: '36px', color: '#F765A0', lineHeight: '1' }}>
          IN PROGRESS...
        </span>
      </h2>

      {/* ナビゲーションボタン */}
      <div
        className="absolute"
        style={{
          top: '20px',
          right: '40px',
          display: 'flex',
          gap: '40px',
        }}
      >
        <button
          onClick={prevPage}
          className="w-12 h-12"
          disabled={currentPage === 0}
          style={{ cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
        >
          <img src={LeftButton.src} alt="Left Button" className="w-full h-full" />
        </button>
        <button
          onClick={nextPage}
          className="w-12 h-12"
          disabled={(currentPage + 1) * cardsPerPage >= themes.length}
          style={{ cursor: (currentPage + 1) * cardsPerPage >= themes.length ? 'not-allowed' : 'pointer' }}
        >
          <img src={RightButton.src} alt="Right Button" className="w-full h-full" />
        </button>
      </div>

      {/* カードリスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {paginatedCards.map((title, index) => (
          <div
            key={index}
            className="w-full md:w-64 h-96 bg-[#1E1438] rounded-lg flex flex-col justify-between p-4 shadow-lg"
          >
            {/* アイコン枠 */}
            <div
              className="flex items-center font-bold"
              style={{
                width: '50%',
                height: '40px',
                backgroundColor: '#F765A0',
                border: '2px solid #F765A0',
                borderRadius: '9999px',
                padding: '8px 12px',
                fontFamily: 'Young Serif, serif',
                color: '#FFFFFF', // 数字の色を白に変更
                fontSize: '14px', // 数字のフォントサイズを小さく
              }}
            >
              <span className="mr-2 text-xl">👁️</span>
              {130}
            </div>

            {/* ダミーコンテンツ */}
            <div className="bg-white w-full h-48 rounded-md"></div>

            {/* タイトル */}
            <div
              className="flex items-center justify-start font-bold text-lg"
              style={{
                height: '70px',
                backgroundColor: '#1E1438',
                border: '2px solid #F765A0',
                borderRadius: '8px',
                color: '#A7F002',
                fontFamily: 'Suez One, serif',
                paddingLeft: '10px', // 左寄せ
                fontSize: '24px', // タイトルのフォントサイズを大きく
              }}
            >
              {title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;