// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth } from '../firebase/client';
import { useRouter } from 'next/router';

const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  return user;
};

export default useAuth;
