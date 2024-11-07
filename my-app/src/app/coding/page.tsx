'use client';

import CodeMirrorEditor from '@/componets/CodeMirror';
import Header from '@/componets/hedder';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/auth';
import { getEvent } from '../../../firebase/getEvent';
import { checkParticipantsExists } from '../../../firebase/checkParticipantsExists';

export default function Home() {
  const router = useRouter();
  const user = useAuth();

  const event_now = "event_1";
  const [group_now, setGroupnNow] = useState<any>(null);

  // 未ログイン時にトップに飛ばす
  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  // ページ表示時にイベント情報を取得
  useEffect(() => {
    const getEventData = async () => {
      try {
        const data = await getEvent(event_now);
      } catch (error) {
        console.error('failed to get event data:', error);
      }
      if (user?.uid) {
        const eventGroup = await checkParticipantsExists(
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

  return (
    <div className="bg-[#060038] min-h-screen">
      <Header />
      <CodeMirrorEditor event_now = {event_now} group_now="group_1" />
    </div>
  );
}
