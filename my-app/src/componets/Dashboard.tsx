'use client';

import React, { useState, useEffect } from 'react';
import { getEvent } from '../../firebase/getEvent';
import { useAuth } from '../../context/auth';
import Link from 'next/link'; // Link をインポート
import LeftButton from '../assets/images/leftbutton.svg';
import RightButton from '../assets/images/rightbutton.svg';

const eventIds = ['event_5'];

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const user = useAuth();
  const [eventThemes, setEventThemes] = useState<string[]>([]);

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

  return (
    <div
      className="w-11/12 max-w-[1489px] mx-auto p-8 rounded-2xl bg-[#060038] flex flex-col gap-8 relative"
      style={{ border: '4px solid #F765A0', borderRadius: '16px' }}
    >
      <div className="flex justify-between gap-32 dashboard-border h-full">
        <div
          className="relative flex flex-col items-center"
          style={{ marginLeft: '5%' }}
        >
          <div
            className="absolute top-0 left-0 bg-[#A7F002] rounded-lg w-40 flex justify-between items-center shadow-md"
            style={{
              transform: 'translate(-20%, -120%)',
              width: '250px',
              height: '50px',
              padding: '0 12px',
            }}
          >
            <span
              className="font-bold text-sm"
              style={{ color: '#3341DF', fontSize: '1.5rem' }}
            >
              NAME:
            </span>
            <span
              className="user-name"
              style={{ color: '#3341DF', fontSize: '1.5rem' }}
            >
              {user?.name || 'N/A'}
            </span>
          </div>

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
                <div className="text-2xl">{item.icon}</div>
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

        <div
          className="relative flex-1 bg-[#1E1438] rounded-2xl p-8 flex flex-col gap-y-20 mt-11 mr-9"
          style={{ height: 'auto', transform: 'translateX(-40px)' }}
        >
          <div className="text-left">
            <h1
              className="font-bold text-[#A7F002]"
              style={{
                fontFamily: 'Suez One',
                fontSize: '10rem',
                lineHeight: '1',
                textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
              }}
            >
              {eventThemes[0] || 'Loading...'}
            </h1>
            <div className="mt-4 text-lg">
              <span
                style={{
                  color: '#A7F002',
                  marginLeft: '0.5rem',
                  fontSize: '2rem',
                }}
              >
                FROM:
              </span>
              <span
                style={{
                  color: '#3242DC',
                  marginLeft: '0.5rem',
                  fontSize: '2rem',
                }}
              >
                10/28
              </span>
              <span
                style={{
                  color: '#A7F002',
                  marginLeft: '0.5rem',
                  fontSize: '2rem',
                }}
              >
                TO:
              </span>
              <span
                style={{
                  color: '#3242DC',
                  marginLeft: '0.5rem',
                  fontSize: '2rem',
                }}
              >
                10/31
              </span>
            </div>
          </div>

          {/* ページ遷移ボタン */}
          <Link href="/coding">
            <button
              className="bg-[#4255FF] text-[#A7F002] font-bold px-12 py-4 rounded-lg absolute transition-transform duration-200 transform hover:scale-105"
              style={{
                bottom: '30px',
                right: '-70px',
                zIndex: 9,
                border: '2px solid #A7F002',
                borderRadius: '0',
              }}
            >
              START CODING
            </button>
          </Link>

          <div
            className="absolute text-[#A7F002] text-5xl font-bold"
            style={{ top: '-60px', left: '50px', zIndex: '10' }}
          >
            2 DAYS LEFT
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex justify-end pr-80">
        <div className="flex items-center gap-12">
          <button className="w-12 h-12">
            <img
              src={LeftButton.src}
              alt="Left Button"
              className="w-full h-full"
            />
          </button>
          <div className="flex gap-4">
            <span className="w-3 h-3 bg-[#3242DC] rounded-full"></span>
            <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-500 rounded-full"></span>
          </div>
          <button className="w-12 h-12">
            <img
              src={RightButton.src}
              alt="Right Button"
              className="w-full h-full"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
