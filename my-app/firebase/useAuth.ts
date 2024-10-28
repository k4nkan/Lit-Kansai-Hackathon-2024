"use client"

// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { auth } from '../firebase/client';
import { useRouter } from 'next/router';

import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../types/user';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser: FirebaseUser | null) => {
        if (!firebaseUser) {
          router.push('/');
        } else {
          const appUser: User = {
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            name: firebaseUser.uid,
            photoURL: firebaseUser.uid,
            email: firebaseUser.uid,
          };
          setUser(appUser);
        }
      }
    );
    return () => unsubscribe();
  }, [router]);

  return { user };
};

export default useAuth;
