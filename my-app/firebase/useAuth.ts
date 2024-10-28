'use client';

import { useEffect, useState } from 'react';
import { auth } from '../firebase/client';
import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../types/user';

const useAuth = ( router:any ) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser: FirebaseUser | null) => {
        if (!firebaseUser) {
          router.push('/');
        } else {
          const appUser: User = {
            uid: firebaseUser.uid,
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            email: firebaseUser.email || '',
          };
          setUser(appUser);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return { user };
};

export default useAuth;
