/**
 * useChatNavigation - EPIC 3
 * Resuelve o crea conversación y navega al chat
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getUserWardMembership, getWard } from '../../../services/firebase/wardService';
import { getOrCreateConversation } from '../../../services/chatService';

export type ChatNavigationStatus = 'idle' | 'loading' | 'no-missionaries' | 'error';

export function useChatNavigation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ChatNavigationStatus>('idle');

  const openChat = async () => {
    if (!user?.uid) return;

    setStatus('loading');
    try {
      const membership = await getUserWardMembership(user.uid);
      if (!membership?.wardId) {
        setStatus('no-missionaries');
        return;
      }

      const ward = await getWard(membership.wardId);
      const leaderIds = ward?.leaderIds ?? [];
      const missionaryIds = leaderIds.slice(0, 2);

      if (missionaryIds.length === 0) {
        setStatus('no-missionaries');
        return;
      }

      const participantIds = [user.uid, ...missionaryIds];
      const { conversationId } = await getOrCreateConversation({
        wardId: membership.wardId,
        participantIds,
        createdByUid: user.uid,
      });

      setStatus('idle');
      navigate(`/chat/${conversationId}`);
    } catch (err) {
      console.error('openChat error:', err);
      setStatus('error');
    }
  };

  const clearStatus = () => setStatus('idle');

  return { openChat, status, clearStatus };
}
