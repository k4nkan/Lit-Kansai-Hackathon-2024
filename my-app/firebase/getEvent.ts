import { db } from './client';
import { getDoc, doc } from 'firebase/firestore';

export const getEvent = async (event_now: string) => {
  const docRef = doc(db, 'events', event_now);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};
