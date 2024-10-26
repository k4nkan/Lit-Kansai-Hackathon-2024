'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function Home() {
  const [waiting, setWaiting] = useState<boolean>(false);
  const router = useRouter();

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
    <div>
      <div>this is top page</div>
      <ul>
        <li>
          <Link href="/top">Top Page</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/connect">Connect</Link>
        </li>
      </ul>
      <a href="/top" onClick={signOut}>
        {waiting ? 'ログアウト中...' : 'ログアウト'}
      </a>
    </div>
  );
}
