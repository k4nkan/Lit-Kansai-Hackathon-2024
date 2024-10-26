'use client';

import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { login } from '../lib/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [waiting, setWaiting] = useState<boolean>(false);
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/top');
    }
  }, [user, router]);

  const signIn = () => {
    setWaiting(true);

    login()
      .catch((error) => {
        console.error(error?.code);
      })
      .finally(() => {
        setWaiting(false);
      });
  };

  return (
    <div>
      <div>いま：{user ? user.name : 'ログインしていません'}</div>
      <button onClick={signIn}>ログイン</button>
    </div>
  );
}
