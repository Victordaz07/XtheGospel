/**
 * Chat Service - Firestore
 * EPIC 3: conversations + messages, near-real-time
 */

import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  Unsubscribe,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from './firebase/firebaseApp';

const CONVERSATIONS_COLLECTION = 'conversations';
const MESSAGES_SUBCOLLECTION = 'messages';
const MESSAGES_LIMIT = 100;
const TEXT_MAX_LENGTH = 2000;

export interface Conversation {
  id: string;
  wardId: string;
  participantIds: string[];
  participantsHash: string;
  createdAt: number;
  lastMessageAt: number | null;
  lastMessageText: string | null;
  createdByUid: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: number;
}

function timestampToMs(t: Timestamp | { toMillis?: () => number } | undefined): number {
  if (!t) return 0;
  if (typeof (t as Timestamp).toMillis === 'function') return (t as Timestamp).toMillis();
  return 0;
}

/**
 * Ordena participantIds y genera hash estable para query
 */
export function makeParticipantsHash(participantIds: string[]): string {
  const sorted = [...participantIds].sort();
  const str = sorted.join('|');
  return str.length < 1500 ? str : str.slice(0, 1500);
}

export interface GetOrCreateConversationInput {
  wardId: string;
  participantIds: string[];
  createdByUid: string;
}

/**
 * Busca conversación existente por participantsHash + wardId.
 * Si no existe, crea una nueva.
 */
export async function getOrCreateConversation(
  input: GetOrCreateConversationInput
): Promise<{ conversationId: string }> {
  const db = getFirebaseDb();
  const hash = makeParticipantsHash(input.participantIds);

  const q = query(
    collection(db, CONVERSATIONS_COLLECTION),
    where('wardId', '==', input.wardId),
    where('participantsHash', '==', hash)
  );

  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return { conversationId: snapshot.docs[0].id };
  }

  const docRef = await addDoc(collection(db, CONVERSATIONS_COLLECTION), {
    wardId: input.wardId,
    participantIds: input.participantIds,
    participantsHash: hash,
    createdAt: serverTimestamp(),
    lastMessageAt: null,
    lastMessageText: null,
    createdByUid: input.createdByUid,
  });

  return { conversationId: docRef.id };
}

export type MessagesListenerCallback = (messages: ChatMessage[]) => void;
export type MessagesErrorCallback = (error: { code?: string; message?: string }) => void;

/**
 * Suscripción en tiempo real a mensajes
 */
export function listenToMessages(
  conversationId: string,
  onChange: MessagesListenerCallback,
  onError?: MessagesErrorCallback
): Unsubscribe {
  const db = getFirebaseDb();
  const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_SUBCOLLECTION);

  const q = query(
    messagesRef,
    orderBy('createdAt', 'asc'),
    limit(MESSAGES_LIMIT)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          senderId: data.senderId ?? '',
          text: data.text ?? '',
          createdAt: timestampToMs(data.createdAt),
        };
      });
      onChange(messages);
    },
    (err) => {
      console.error('listenToMessages error:', err);
      onError?.({ code: (err as { code?: string }).code, message: (err as Error).message });
      onChange([]);
    }
  );
}

/**
 * Envía mensaje y actualiza lastMessageAt en conversation
 */
export async function sendMessage(
  conversationId: string,
  senderId: string,
  text: string
): Promise<void> {
  const trimmed = text.trim();
  if (!trimmed) throw new Error('Mensaje vacío');
  if (trimmed.length > TEXT_MAX_LENGTH) throw new Error(`Máximo ${TEXT_MAX_LENGTH} caracteres`);

  const db = getFirebaseDb();
  const messagesRef = collection(db, CONVERSATIONS_COLLECTION, conversationId, MESSAGES_SUBCOLLECTION);
  const conversationRef = doc(db, CONVERSATIONS_COLLECTION, conversationId);

  await addDoc(messagesRef, {
    senderId,
    text: trimmed,
    createdAt: serverTimestamp(),
  });

  await updateDoc(conversationRef, {
    lastMessageAt: serverTimestamp(),
    lastMessageText: trimmed.length > 100 ? trimmed.slice(0, 100) + '…' : trimmed,
  });
}
