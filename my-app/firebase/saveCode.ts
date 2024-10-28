import { db } from './client';
import { setDoc, doc } from 'firebase/firestore';

export const saveCode = async (code: string, uid: string) => {
  try {
    const docRef = doc(db, 'code_1', uid);
    await setDoc(docRef, {
      code,
      uid,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
