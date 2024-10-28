import { db } from './client';
import { getDoc, doc } from 'firebase/firestore';

export const getCode = async (uid: string) => {
  const docRef = doc(db, 'code_1', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().code;
  } else {
    return null;
  }
};
