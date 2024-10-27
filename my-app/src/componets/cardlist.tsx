'use client';

import React, { useState } from 'react';

type Card = {
  title: string;
  coins: number;
};

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

  const paginatedCards = themes.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage);

  const nextPage = () => {
    if ((currentPage + 1) * cardsPerPage < themes.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div
      className="p-8 rounded-lg mx-auto relative"
      style={{ width: '90%', maxWidth: '1489px', backgroundColor: '#151454' }}
    >
      {/* ヘッダー */}
      <h2 className="text-2xl flex items-center gap-2 mb-8">
        <span style={{ color: '#A7F002' }}>▶</span>
        <span style={{ color: '#F765A0' }}>IN PROGRESS...</span>
      </h2>

      {/* ナビゲーションボタンを少し左に移動 */}
      <div className="absolute top-8" style={{ right: '40px', gap: '30px', display: 'flex' }}>
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="w-12 h-12 bg-indigo-800 text-white rounded-full flex items-center justify-center border border-white shadow-lg hover:scale-110 hover:shadow-xl transition-all disabled:opacity-50"
        >
          <span className="text-2xl rotate-180">➤</span>
        </button>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * cardsPerPage >= themes.length}
          className="w-12 h-12 bg-indigo-800 text-white rounded-full flex items-center justify-center border border-white shadow-lg hover:scale-110 hover:shadow-xl transition-all disabled:opacity-50"
        >
          <span className="text-2xl">➤</span>
        </button>
      </div>

      {/* カードリスト */}
      <div className="grid grid-cols-4 gap-8 mt-8">
        {paginatedCards.map((title, index) => (
          <div
            key={index}
            className="w-64 h-96 bg-[#1E1438] rounded-lg flex flex-col justify-between p-4 shadow-lg"
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
              }}
            >
              <img src="/eye-icon.png" alt="icon" className="w-5 h-5 mr-2" />
              {130}
            </div>

            {/* ダミーコンテンツ */}
            <div className="bg-white w-full h-48 rounded-md"></div>

            {/* タイトル */}
            <div
              className="flex items-center justify-center font-bold text-lg"
              style={{
                height: '70px',
                backgroundColor: '#1E1438',
                border: '2px solid #F765A0',
                borderRadius: '8px',
                color: '#A7F002',
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