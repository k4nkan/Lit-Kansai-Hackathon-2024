'use client';

import { useAuth } from '../../../context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from "@/componets/hedder";
import ArchiveCardList from '@/componets/ArchiveCardList';

const Profile = () => {
  const user = useAuth();
  const router = useRouter();

  // ログインしていない場合、ログインページにリダイレクト
  useEffect(() => {
    if (!user) {
      router.push('/'); // ホームページがログインページの場合
    }
  }, [user, router]);

  if (!user) {
    return null; // ユーザーデータがロードされるまで何も表示しない
  }

  return (
    <div className="bg-[#060038] min-h-screen">
      <Header />
      <main className="p-8 flex flex-col items-center">
        <div className="text-center mt-8 mb-12">
          <span className="font-bold text-sm"style={{ color: '#A7F002', fontSize: '3rem', marginRight: '2rem'}}>NAME:</span>
          <span className="user-name"style={{ color: '#A7F002',fontSize:'3rem' }}>{user?.name || 'N/A'}</span>
        </div>
        <ArchiveCardList />
      </main>
    </div>
  );
};

export default Profile;