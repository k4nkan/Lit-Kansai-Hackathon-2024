import { db } from './client';
import { setDoc, doc } from 'firebase/firestore';

export const saveCode = async (
  code: string,
  uid: string,
  event_now: string
) => {
  try {
    const docRef = doc(db, 'events', event_now, 'participants', uid);
    await setDoc(docRef, {
      code,
      uid,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
