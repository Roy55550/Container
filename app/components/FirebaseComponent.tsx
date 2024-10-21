'use client';

import { useEffect } from 'react'
import { getFirestore } from '../../src/firebase/config'
import { collection, getDocs, Firestore } from 'firebase/firestore'

// Import or define the same InboxItem interface used in app/page.tsx
interface UnreadItem {
  id: string;
  source: string;
  header: string;
  summary: string;
  suggestedTags: string[];
  category: string;
  note: string;
  link: string;
}

interface InboxItem {
  id: string;
  name: string;
  unreadItems: any[];
  progress: number;
}

interface FirebaseComponentProps {
  setInbox: React.Dispatch<React.SetStateAction<InboxItem[]>>
}

const FirebaseComponent: React.FC<FirebaseComponentProps> = ({ setInbox }) => {
  useEffect(() => {
    const fetchInboxItems = async () => {
      const firestoreInstance = getFirestore();
      if (firestoreInstance) {
        try {
          const inboxCollection = collection(firestoreInstance as Firestore, 'inbox');
          const inboxSnapshot = await getDocs(inboxCollection);
          const inboxData = inboxSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as InboxItem[];
          setInbox(inboxData);
        } catch (error) {
          console.error('Error fetching inbox items:', error);
        }
      } else {
        console.error('Firestore is not initialized');
      }
    }

    fetchInboxItems();
  }, [setInbox])

  return null;
}

export default FirebaseComponent
