'use client';

import React, { useState, useEffect } from 'react';
import { getEvent } from '../../firebase/getEvent';
import LeftButton from '../assets/images/leftbutton.svg';
import RightButton from '../assets/images/rightbutton.svg';

const eventIds = ['event_1', 'event_2', 'event_3', 'event_4', 'event_5']; // 表示させたいイベント ID のリスト

const ArchiveCardList: React.FC = () => {
  const [eventThemes, setEventThemes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  useEffect(() => {
    const fetchAllEventData = async () => {
      const themes: string[] = [];
      for (const eventId of eventIds) {
        try {
          const data = await getEvent(eventId);
          if (data && data.theme) {
            themes.push(data.theme);
          }
        } catch (error) {
          console.error(`Failed to get event data for ${eventId}:`, error);
        }
      }
      setEventThemes(themes);
    };

    fetchAllEventData();
  }, []);

  const paginatedCards = eventThemes.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const nextPage = () => {
    if ((currentPage + 1) * cardsPerPage < eventThemes.length) {
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
            fontSize: '50px',
            color: '#A7F002',
            lineHeight: '1',
          }}
        >
          ▶︎
        </span>
        <span style={{ fontSize: '36px', color: '#F765A0', lineHeight: '1' }}>
          ARCHIVE
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
          disabled={(currentPage + 1) * cardsPerPage >= eventThemes.length}
          style={{ cursor: (currentPage + 1) * cardsPerPage >= eventThemes.length ? 'not-allowed' : 'pointer' }}
        >
          <img src={RightButton.src} alt="Right Button" className="w-full h-full" />
        </button>
      </div>

      {/* カードリスト */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {paginatedCards.length > 0 ? (
          paginatedCards.map((title, index) => (
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
                  color: '#FFFFFF',
                  fontSize: '14px',
                }}
              >
                <span className="mr-2 text-xl">❤️</span>
                {130}
              </div>

              {/* メディアアートプレビュー */}
              <iframe
                style={{ width: '100%', height: '48%', border: 'none', borderRadius: '8px' }}
                srcDoc={`
                  <html>
                    <head>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                      <style>
                        body, html, canvas { margin: 0; padding: 0; width: 100%; height: 100%; }
                      </style>
                    </head>
                    <body>
                      <script>
                        function setup() {
                          createCanvas(windowWidth, windowHeight);
                          background(30);
                          if ("${title}" === "FireFlower") {
                            drawFireworks();
                          } else if ("${title}" === "Space") {
                            drawDynamicSpace();
                          } else if ("${title}" === "Fire") {
                            drawFlames();
                          } else if ("${title}" === "Star") {
                            drawTwinklingStars();
                          } else if ("${title}" === "Monster") {
                            drawMonsterArt();
                          }
                        }

                        function drawFireworks() {
                          noLoop();
                          colorMode(HSB);
                          for (let i = 0; i < 100; i++) {
                            fill(random(360), 100, 100, 0.8);
                            ellipse(random(width), random(height), random(5, 15));
                          }
                        }

                        function drawDynamicSpace() {
                          setInterval(() => {
                            fill(255);
                            ellipse(random(width), random(height), 2);
                          }, 100);
                        }

                        function drawFlames() {
                          noStroke();
                          for (let i = 0; i < 50; i++) {
                            fill(255, random(100, 150), 0, 150);
                            ellipse(width / 2 + random(-50, 50), height - 100, random(20, 50), random(40, 80));
                          }
                        }

                        function drawTwinklingStars() {
                          for (let i = 0; i < 200; i++) {
                            let x = random(width);
                            let y = random(height);
                            fill(255, 255, 0);
                            ellipse(x, y, 3);
                            fill(255);
                            ellipse(x + random(-2, 2), y + random(-2, 2), 1);
                          }
                          setInterval(() => {
                            let x = random(width);
                            let y = random(height);
                            fill(255, 255, 0);
                            ellipse(x, y, 3);
                            fill(255);
                            ellipse(x + random(-2, 2), y + random(-2, 2), 1);
                          }, 300);
                        }

                        function drawMonsterArt() {
                          noLoop();
                          for (let i = 0; i < 100; i++) {
                            fill(random(255), random(0, 100), random(255), 150);
                            beginShape();
                            for (let j = 0; j < 8; j++) {
                              let angle = TWO_PI / 8 * j;
                              let x = width / 2 + cos(angle) * random(30, 100);
                              let y = height / 2 + sin(angle) * random(30, 100);
                              vertex(x, y);
                            }
                            endShape(CLOSE);
                          }
                        }
                      </script>
                    </body>
                  </html>
                `}
              ></iframe>

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
                  paddingLeft: '10px',
                  fontSize: '24px',
                }}
              >
                {title}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ArchiveCardList;