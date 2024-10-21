import { db } from './firebase';
import { collection, doc, setDoc, getDoc, deleteDoc, getDocs } from 'firebase/firestore';

export const createUserDocument = async (userId: string, userData: Record<string, unknown>) => {
  const userRef = doc(db, 'users', userId);
  await setDoc(userRef, userData, { merge: true });
};

export const getUserDocument = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  } else {
    return null;
  }
};

export const addItemToInbox = async (userId: string, item: Record<string, unknown>) => {
  const inboxRef = doc(collection(db, `users/${userId}/inbox`));
  await setDoc(inboxRef, item);
  return inboxRef.id;
};

export const getInboxItems = async (userId: string): Promise<InboxItem[]> => {
  const inboxRef = collection(db, `users/${userId}/inbox`);
  const snapshot = await getDocs(inboxRef);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      source: data.source || '',
      header: data.header || '',
      summary: data.summary || '',
      suggestedTags: data.suggestedTags || [],
      category: data.category || '',
      note: data.note || '',
      link: data.link || '',
    };
  });
};

export const moveItemToContentLibrary = async (userId: string, itemId: string, item: InboxItem) => {
  const contentLibraryRef = doc(collection(db, `users/${userId}/contentLibrary`), itemId);
  const movedItem: InboxItem = {
    ...item,
    isRead: item.isRead || false,
    date: item.date || new Date().toISOString(),
    movedAt: new Date().toISOString(),
  };
  await setDoc(contentLibraryRef, movedItem);
  await deleteDoc(doc(db, `users/${userId}/inbox/${itemId}`));
};

export const getContentLibraryItems = async (userId: string): Promise<InboxItem[]> => {
  const contentLibraryRef = collection(db, `users/${userId}/contentLibrary`);
  const snapshot = await getDocs(contentLibraryRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InboxItem));
};

// Add more functions as needed for updating, deleting, etc.

export interface InboxItem {
  id: string;
  source: string;
  header: string;
  summary: string;
  suggestedTags: string[];
  category: string;
  note: string;
  link: string;
  isRead?: boolean;
  date?: string;
}
