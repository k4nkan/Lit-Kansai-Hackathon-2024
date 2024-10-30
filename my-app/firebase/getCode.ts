import { db } from './client';
import { getDoc, doc } from 'firebase/firestore';

export const getCode = async (uid: string, event_now: string) => {
  const docRef = doc(db, 'events', event_now, "participants", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().code;
  } else {
    return null;
  }
};
