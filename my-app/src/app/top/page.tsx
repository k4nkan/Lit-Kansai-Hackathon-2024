'use client';

import Link from 'next/link';
import Header from '@/componets/hedder';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { useAuth } from '../../../context/auth';
import { getEvent } from '../../../firebase/getEvent';
import { getParticipantGroupInEvent } from '../../../firebase/checkParticipantsExists';
import Dashboard from '@/componets/Dashboard';
import CardList from '@/componets/cardlist';
import ArchiveCardList from '@/componets/ArchiveCardList';

export default function Home() {
  const [waiting, setWaiting] = useState<boolean>(false);
  const router = useRouter();
  const user = useAuth();

  // 現在のイベント、イベントデータの保存先
  const event_now = 'event_1';
  const [group_now, setGroupnNow] = useState<any>(null);
  const [eventData, setEventData] = useState<any>(null);

  // 未ログイン時トップに飛ばす
  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  if (user === null) {
    return <p>Loading...</p>;
  }

  // ページ表示時にイベント情報を取得
  useEffect(() => {
    const getEventData = async () => {
      try {
        const data = await getEvent(event_now);
        setEventData(data);
        console.log(data);
      } catch (error) {
        console.error('failed to get event data:', error);
      }
      if (user?.uid) {
        const eventGroup = await getParticipantGroupInEvent(
          event_now,
          user.uid
        );
        console.log(eventGroup);
        setGroupnNow(eventGroup);
      } else {
        setGroupnNow(null);
      }
    };
    getEventData();
  }, [user, event_now]);

  // group_nowに応じたページ遷移の処理
  const handleNavigation = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (group_now === null) {
      console.log('not yet');
    } else {
      router.push('/coding');
    }
  };

  //サインアウト
  const signOut = (e: React.MouseEvent) => {
    e.preventDefault();
    setWaiting(true);

    logout()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error('Logout error:', error?.code);
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <div style={{ backgroundColor: '#060038', color: '#FFFFFF', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Header />
      </div>
      <div style={{ marginBottom: '200px' }}>
        <Dashboard />
      </div>
      <div style={{ marginBottom: '200px' }}>
        <CardList />
      </div>
      <div style={{ marginBottom: '200px' }}>
        <ArchiveCardList />
      </div>
      <ul style={{ marginBottom: '20px' }}>
        <li>
          <a href="/coding" onClick={handleNavigation}>
            Coding
          </a>
        </li>
      </ul>
      {eventData ? (
        <div style={{ marginBottom: '20px' }}>
          <div>start at: {eventData.start}</div>
          <div>end at: {eventData.end}</div>
          <div>theme: {eventData.theme}</div>
        </div>
      ) : (
        <div style={{ marginBottom: '20px' }}>now loading...</div>
      )}
      <a href="/top" onClick={signOut}>
        {waiting ? 'now loading' : 'log out'}
      </a>
    </div>
  );
}
