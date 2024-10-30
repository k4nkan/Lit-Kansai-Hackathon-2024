'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { useAuth } from '../../../context/auth';

export default function Home() {
  const [waiting, setWaiting] = useState<boolean>(false);
  const router = useRouter();
  const user = useAuth();

  //未ログイン時トップに飛ばす
  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  if (user === null) {
    return <p>Loading...</p>;
  }

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
    <div>
      <div>this is top page</div>
      <ul>
        <li>
          <Link href="/top">Top Page</Link>
        </li>
        <li>
          <Link href="/coding">Coding</Link>
        </li>
      </ul>
      <a href="/top" onClick={signOut}>
        {waiting ? 'now loading' : 'log out'}
      </a>
    </div>
  );
}
