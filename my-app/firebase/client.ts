import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getAnalytics, isSupported, type Analytics as FirebaseAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDWMBtX9K7AQEfUrx0GRPqNAz7CbYcsazw',
  authDomain: 'lit-kansai-hackathon-2024.firebaseapp.com',
  projectId: 'lit-kansai-hackathon-2024',
  storageBucket: 'lit-kansai-hackathon-2024.appspot.com',
  messagingSenderId: '188471426362',
  appId: '1:188471426362:web:c258398ef2667bac472403',
  measurementId: 'G-B7S0P7H0ZF',
};

// Firebase アプリの初期化
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Firebase Analytics をブラウザ環境でのみ初期化
export let analytics: FirebaseAnalytics | undefined = undefined;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// 他ファイルで使うために Firebase 機能をエクスポート
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
