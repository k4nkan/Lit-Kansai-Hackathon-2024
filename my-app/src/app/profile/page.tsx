'use client';

import { useAuth } from '../../../context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from "@/componets/hedder";

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
    <div>
      <Header />
      <main className="p-8">
        <section className="bg-[#151454] text-[#F765A0] p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
          <p className="text-lg mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
        </section>
      </main>
    </div>
  );
};

export default Profile;