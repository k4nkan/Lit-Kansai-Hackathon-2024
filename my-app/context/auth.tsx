"use client"

import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/client';
import { User } from '../types/user';

//コンテクスト用の方を定義
type UserContextType = User | null | undefined;

//コンテクストを作成
const AuthContext = createContext<UserContextType>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 配布したいデータの定義
  const [user, setUser] = useState<UserContextType>();

  useEffect(() => {
    // ログイン状態を監視し、変化があったら発動
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ログインしていた場合、ユーザーコレクションからユーザーデータを参照
        const ref = doc(db, `users/${firebaseUser.uid}`);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          // ユーザーデータを取得して格納
          const appUser = (await getDoc(ref)).data() as User;
          setUser(appUser);
        } else {
          // ユーザーが未作成の場合、新規作成して格納
          const appUser: User = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName!,
            photoURL: firebaseUser.photoURL!,
            email: firebaseUser.email!,
          };

          // Firestoreにユーザーデータを保存
          setDoc(ref, appUser).then(() => {
            // 保存に成功したらコンテクストにユーザーデータを格納
            setUser(appUser);
          });
        }
      } else {
        // ログインしていない場合、ユーザー情報を空にする
        setUser(null);
      }

      // このコンポーネントが不要になったら監視を終了する
      return unsubscribe;
    });
  }, []);

  // プロバイダーを作成し、配布物を格納する
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

//コンテキストを受け取るメソッドを定義
export const useAuth = () =>useContext(AuthContext);