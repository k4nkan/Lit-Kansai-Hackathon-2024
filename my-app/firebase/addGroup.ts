import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { saveCode } from './saveCode';
import { db } from './client';

export const addGroup = async (uid: string, event_now: string) => {
  // 1. 現在あるグループの最大数を取得
  const countGroupRef = collection(db, 'events', event_now, 'groups');
  const groupSnapshot = await getCountFromServer(countGroupRef);
  let groupCount = groupSnapshot.data().count;
  let yourGroup = `group_${groupCount}`;
  console.log('groupCount:' + groupCount);
  console.log('yourGroup:' + yourGroup);

  // 2. 現在のグループのメンバー数を取得
  const memberRef = doc(db, 'events', event_now, 'groups', yourGroup);
  const memberSnap = await getDoc(memberRef);
  let memberCount = 0;

  if (memberSnap.exists()) {
    const memberData = memberSnap.data();
    memberCount = Object.keys(memberData).length;
  }

  // 3. メンバー数が4以上なら新しいグループに追加
  if (memberCount >= 4) {
    groupCount += 1;
    yourGroup = `group_${groupCount}`;
    memberCount = 0; // 新しいグループは最初のメンバーからカウント

    // 新規グループの作成
    const newGroupRef = doc(db, 'events', event_now, 'groups', yourGroup);
    await setDoc(newGroupRef, {}); // 空のドキュメントを作成
  }

  // 4. 新しいメンバーを追加
  const newMemberRef = doc(db, 'events', event_now, 'groups', yourGroup);
  await updateDoc(newMemberRef, {
    [`member_${memberCount + 1}`]: uid,
  });

  // 5. コードの保存（初回の登録のためコードは空白）
  const code = '';
  await saveCode(code, uid, yourGroup, event_now);
};
