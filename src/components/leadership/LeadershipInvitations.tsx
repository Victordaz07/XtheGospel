/**
 * Leadership Invitations Section
 * 
 * Shows all pending leadership invitations for the current user.
 * Displays in the member's profile page.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyPendingInvitations } from '../../services/firebase/invitationService';
import { LeadershipInvitation } from '../../types/leadershipInvitation';
import LeadershipInvitationCard from './LeadershipInvitationCard';
import './LeadershipInvitations.css';

interface LeadershipInvitationsProps {
  onInvitationAccepted?: () => void;
}

const LeadershipInvitations: React.FC<LeadershipInvitationsProps> = ({
  onInvitationAccepted,
}) => {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState<LeadershipInvitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false);
      return;
    }

    loadInvitations();
  }, [user?.uid]);

  const loadInvitations = async () => {
    if (!user?.uid) return;

    setIsLoading(true);
    setError(null);

    try {
      const pending = await getMyPendingInvitations(user.uid);
      setInvitations(pending);
    } catch (err) {
      console.error('Error loading invitations:', err);
      setError('Error al cargar invitaciones');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (accepted: boolean) => {
    if (accepted) {
      onInvitationAccepted?.();
    }
    // Reload invitations to update the list
    loadInvitations();
  };

  // Don't render if no user
  if (!user?.uid) {
    return null;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="li-section">
        <div className="li-section__loading">
          <span className="li-section__spinner">⏳</span>
          <span>Cargando invitaciones...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="li-section">
        <div className="li-section__error">
          <span>❌</span>
          <span>{error}</span>
          <button onClick={loadInvitations}>Reintentar</button>
        </div>
      </div>
    );
  }

  // No invitations
  if (invitations.length === 0) {
    return null; // Don't show section if no invitations
  }

  return (
    <div className="li-section">
      <div className="li-section__header">
        <h2 className="li-section__title">
          <span className="li-section__icon">📨</span>
          Invitaciones de Liderazgo
        </h2>
        {invitations.length > 1 && (
          <span className="li-section__count">{invitations.length}</span>
        )}
      </div>

      <div className="li-section__list">
        {invitations.map(invitation => (
          <LeadershipInvitationCard
            key={invitation.id}
            invitation={invitation}
            memberUid={user.uid}
            onResponse={handleResponse}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadershipInvitations;
