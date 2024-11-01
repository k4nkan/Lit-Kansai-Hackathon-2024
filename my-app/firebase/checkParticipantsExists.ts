import { db } from './client';
import { getDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';

export const getParticipantGroupInEvent = async (
  event_now: string,
  uid: string
): Promise<string | null> => {
  try {
    // イベントドキュメントへの参照
    const eventRef = doc(db, 'events', event_now);

    // participantsサブコレクションへの参照とクエリの設定
    const participantsRef = collection(eventRef, 'participants');
    const q = query(participantsRef, where('__name__', '==', uid)); // ドキュメントIDをuidと比較

    // クエリ結果を取得
    const querySnapshot = await getDocs(q);

    // uidに一致するドキュメントが存在するか確認
    if (!querySnapshot.empty) {
      const participantDoc = querySnapshot.docs[0];
      const participantData = participantDoc.data();

      // groupフィールドが存在する場合、その値を返す
      return participantData.group || null;
    } else {
      console.log('該当するparticipantが見つかりません');
      console.log(uid);
      return null;
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
    return null;
  }
};
