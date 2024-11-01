'use client';

import React, { useState } from 'react';

// ボタンの画像
import LeftButton from '../assets/images/leftbutton.svg';
import RightButton from '../assets/images/rightbutton.svg';

//　仮タイトル
const themes = ['FireFlower', 'Space', 'Fire', 'Star'];

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
//　仮実装
  const getSketchCode = (theme: string) => {
    switch (theme) {
      case 'FireFlower':
        return `
          let fireworks = [];
          let gravity;

          function setup() {
            createCanvas(windowWidth, windowHeight);
            colorMode(HSB);
            gravity = createVector(0, 0.2);
          }

          function draw() {
            background(0, 50);

            for (let i = fireworks.length - 1; i >= 0; i--) {
              fireworks[i].update();
              fireworks[i].show();
              if (fireworks[i].isFinished()) {
                fireworks.splice(i, 1);
              }
            }

            if (random(1) < 0.05) {
              fireworks.push(new Firework());
            }
          }

          class Firework {
            constructor() {
              this.exploded = false;
              this.particles = [];
              this.firework = new Particle(random(width), height, true);
            }

            update() {
              if (!this.exploded) {
                this.firework.applyForce(gravity);
                this.firework.update();
                if (this.firework.vel.y >= 0) {
                  this.exploded = true;
                  this.explode();
                }
              }

              for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].applyForce(gravity);
                this.particles[i].update();
                if (this.particles[i].isFinished()) {
                  this.particles.splice(i, 1);
                }
              }
            }

            explode() {
              for (let i = 0; i < 100; i++) {
                let p = new Particle(this.firework.pos.x, this.firework.pos.y, false);
                this.particles.push(p);
              }
            }

            isFinished() {
              return this.exploded && this.particles.length === 0;
            }

            show() {
              if (!this.exploded) {
                this.firework.show();
              }
              for (let p of this.particles) {
                p.show();
              }
            }
          }

          class Particle {
            constructor(x, y, firework) {
              this.pos = createVector(x, y);
              this.firework = firework;
              this.lifespan = 255;
              this.vel = firework ? createVector(0, random(-12, -8)) : p5.Vector.random2D().mult(random(2, 10));
              this.acc = createVector(0, 0);
              this.hue = random(360);
            }

            applyForce(force) {
              this.acc.add(force);
            }

            update() {
              if (!this.firework) {
                this.vel.mult(0.9);
                this.lifespan -= 4;
              }
              this.vel.add(this.acc);
              this.pos.add(this.vel);
              this.acc.mult(0);
            }

            isFinished() {
              return this.lifespan < 0;
            }

            show() {
              colorMode(HSB);
              if (!this.firework) {
                stroke(this.hue, 255, 255, this.lifespan);
                strokeWeight(2);
              } else {
                stroke(this.hue, 255, 255);
                strokeWeight(4);
              }
              point(this.pos.x, this.pos.y);
            }
          }
        `;
      case 'Space':
        return `
          let stars = [];
          let shootingStars = [];

          function setup() {
            createCanvas(windowWidth, windowHeight);
            for (let i = 0; i < 200; i++) {
              stars.push(new Star());
            }
          }

          function draw() {
            background(10, 10, 30);

            for (let star of stars) {
              star.show();
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
              shootingStars[i].update();
              shootingStars[i].show();
              if (shootingStars[i].isOffScreen()) {
                shootingStars.splice(i, 1);
              }
            }

            if (random(1) < 0.02) {
              shootingStars.push(new ShootingStar());
            }
          }

          class Star {
            constructor() {
              this.x = random(width);
              this.y = random(height);
              this.size = random(1, 3);
            }

            show() {
              fill(255);
              ellipse(this.x, this.y, this.size);
            }
          }

          class ShootingStar {
            constructor() {
              this.x = random(width);
              this.y = random(-50, 0);
              this.speedX = random(5, 10);
              this.speedY = random(5, 10);
              this.size = random(3, 6);
              this.color = color(255, 255, random(200, 255));
            }

            update() {
              this.x += this.speedX;
              this.y += this.speedY;
            }

            show() {
              fill(this.color);
              ellipse(this.x, this.y, this.size);
              fill(red(this.color), green(this.color), blue(this.color), 150);
              ellipse(this.x - this.speedX * 2, this.y - this.speedY * 2, this.size * 0.8);
            }

            isOffScreen() {
              return this.x > width || this.y > height;
            }
          }
        `;
      case 'Fire':
        return `
          let flames = [];

          function setup() {
            createCanvas(windowWidth, windowHeight);
            noStroke();
          }

          function draw() {
            background(0, 50);

            for (let i = flames.length - 1; i >= 0; i--) {
              flames[i].update();
              flames[i].show();
              if (flames[i].isOffScreen()) {
                flames.splice(i, 1);
              }
            }

            if (random(1) < 0.3) {
              flames.push(new Flame(random(width), height));
            }
          }

          class Flame {
            constructor(x, y) {
              this.x = x;
              this.y = y;
              this.speedX = random(-1, 1);
              this.speedY = random(-3, -1);
              this.size = random(10, 20);
              this.color = color(random(200, 255), random(50, 150), 0, random(150, 255));
            }

            update() {
              this.x += this.speedX;
              this.y += this.speedY;
              this.size *= 0.98;
            }

            show() {
              fill(this.color);
              ellipse(this.x, this.y, this.size);
            }

            isOffScreen() {
              return this.y < 0 || this.size < 2;
            }
          }
        `;
      case 'Star':
        return `
          function setup() {
            createCanvas(windowWidth, windowHeight);
            background(0);
          }
          function draw() {
            if (frameCount % 5 === 0) {
              let x = random(width);
              let y = random(height);
              fill(255, 255, 0);
              ellipse(x, y, 3);
              fill(255);
              ellipse(x + random(-2, 2), y + random(-2, 2), 1);
            }
            background(0, 0, 0, 5);
          }
        `;
      default:
        return '';
    }
  };
//↑仮実装
  return (
    <div className="p-8 rounded-lg mx-auto relative" style={{ width: '90%', maxWidth: '1489px', backgroundColor: '#151454' }}>
      {/* ヘッダー */}
      <h2 className="flex items-center gap-4 mb-8">
        <span style={{ fontSize: '50px', color: '#A7F002', lineHeight: '1' }}>▶︎</span>
        <span style={{ fontSize: '36px', color: '#F765A0', lineHeight: '1' }}>IN PROGRESS...</span>
      </h2>

      {/* ナビゲーションボタン */}
      <div className="absolute" style={{ top: '20px', right: '40px', display: 'flex', gap: '40px' }}>
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
          <div key={index} className="w-full md:w-64 h-96 bg-[#1E1438] rounded-lg flex flex-col justify-between p-4 shadow-lg">
            {/* アイコン枠 */}
            <div className="flex items-center font-bold" style={{
              width: '50%',
              height: '40px',
              backgroundColor: '#F765A0',
              border: '2px solid #F765A0',
              borderRadius: '9999px',
              padding: '8px 12px',
              fontFamily: 'Young Serif, serif',
              color: '#FFFFFF',
              fontSize: '14px',
            }}>
              <span className="mr-2 text-xl">👁️</span>
              {130}
            </div>

            {/* メディアアートプレビュー */}
            <iframe
              style={{ width: '100%', height: '48%', borderRadius: '8px', border: 'none' }}
              srcDoc={`
                <html>
                  <head>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
                    <style>
                      body, html, canvas { margin: 0; padding: 0; width: 100%; height: 100%; }
                    </style>
                  </head>
                  <body>
                    <script>${getSketchCode(title)}</script>
                  </body>
                </html>
              `}
            ></iframe>

            {/* タイトル */}
            <div className="flex items-center justify-start font-bold text-lg" style={{ height: '70px', backgroundColor: '#1E1438', border: '2px solid #F765A0', borderRadius: '8px', color: '#A7F002', fontFamily: 'Suez One, serif', paddingLeft: '10px', fontSize: '24px' }}>
              {title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;