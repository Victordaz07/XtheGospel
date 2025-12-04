import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MemberFriend, FriendStage } from '../../data/memberTypes';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  ButtonPrimary,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import { FaBell, FaPlus, FaPencil } from 'react-icons/fa6';
import '../learning/Page.css';
import './MemberFriendsScreen.css';

const MemberFriendsScreen: React.FC = () => {
  const { t } = useI18n();
  const [friends, setFriends] = useState<MemberFriend[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<MemberFriend | null>(null);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendStage, setNewFriendStage] = useState<FriendStage>('gettingToKnowChurch');
  const [editingNotes, setEditingNotes] = useState(false);
  const [notes, setNotes] = useState('');

  // TODO: Load from service/Firestore
  useEffect(() => {
    // Mock data for now
    setFriends([]);
  }, []);

  const getStageLabel = (stage: FriendStage): string => {
    return t(`memberFriends.friendStages.${stage}`);
  };

  const getSuggestion = (stage: FriendStage): string => {
    return t(`memberFriends.suggestions.${stage}`);
  };

  const handleAddFriend = () => {
    if (!newFriendName.trim()) return;

    const newFriend: MemberFriend = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      displayName: newFriendName.trim(),
      stage: newFriendStage,
      createdAt: new Date().toISOString(),
    };

    setFriends([...friends, newFriend]);
    setNewFriendName('');
    setNewFriendStage('gettingToKnowChurch');
    setIsAddingFriend(false);
  };

  const handleSelectFriend = (friend: MemberFriend) => {
    setSelectedFriend(friend);
    setNotes(friend.notes || '');
    setEditingNotes(false);
  };

  const handleSaveNotes = () => {
    if (!selectedFriend) return;
    const updated = friends.map(f =>
      f.id === selectedFriend.id ? { ...f, notes } : f
    );
    setFriends(updated);
    setSelectedFriend({ ...selectedFriend, notes });
    setEditingNotes(false);
    // TODO: Save to service/Firestore
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <PageContainer>
      <TopBar
        title={t('memberFriends.header.title')}
        subtitle={t('memberFriends.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {friends.length === 0 && !isAddingFriend ? (
          <Card variant="outlined" className="member-friends-empty">
            <h3 className="empty-title">{t('memberFriends.list.emptyTitle')}</h3>
            <p className="empty-description">{t('memberFriends.list.emptyDescription')}</p>
            <ButtonPrimary onClick={() => setIsAddingFriend(true)}>
              <FaPlus /> {t('memberFriends.list.addFriendButton')}
            </ButtonPrimary>
          </Card>
        ) : (
          <>
            {/* Add Friend Form */}
            {isAddingFriend && (
              <Card variant="default" className="member-friend-form">
                <h3>{t('memberFriends.list.addFriendButton')}</h3>
                <div className="form-field">
                  <label>{t('memberFriends.detail.title')}</label>
                  <input
                    type="text"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    placeholder="Nombre o alias"
                  />
                </div>
                <div className="form-field">
                  <label>{t('memberFriends.friendCard.stageLabel')}</label>
                  <select
                    value={newFriendStage}
                    onChange={(e) => setNewFriendStage(e.target.value as FriendStage)}
                  >
                    {Object.keys({
                      gettingToKnowChurch: '',
                      learningActively: '',
                      preparingForBaptism: '',
                      attendingRegularly: '',
                      recentConvert_0_3: '',
                      recentConvert_3_12: '',
                    }).map((stage) => (
                      <option key={stage} value={stage}>
                        {getStageLabel(stage as FriendStage)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-actions">
                  <ButtonPrimary onClick={handleAddFriend}>
                    {t('memberFriends.list.addFriendButton')}
                  </ButtonPrimary>
                  <ButtonSecondary onClick={() => setIsAddingFriend(false)}>
                    {t('common.cancel')}
                  </ButtonSecondary>
                </div>
              </Card>
            )}

            {/* Friends List */}
            <Section title={t('memberFriends.header.title')}>
              <div className="member-friends-list">
                {friends.map((friend) => (
                  <Card
                    key={friend.id}
                    variant="default"
                    className={`member-friend-card ${selectedFriend?.id === friend.id ? 'selected' : ''}`}
                    onClick={() => handleSelectFriend(friend)}
                  >
                    <div className="friend-card-header">
                      <h4 className="friend-name">{friend.displayName}</h4>
                      <span className="friend-stage-badge">{getStageLabel(friend.stage)}</span>
                    </div>
                    {friend.lastContactAt && (
                      <p className="friend-last-contact">
                        {t('memberFriends.friendCard.lastContact', { date: formatDate(friend.lastContactAt) })}
                      </p>
                    )}
                    {!friend.lastContactAt && (
                      <p className="friend-last-contact">
                        {t('memberFriends.friendCard.noLastContact')}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </Section>

            {/* Friend Detail */}
            {selectedFriend && (
              <Card variant="default" className="member-friend-detail">
                <h3>{selectedFriend.displayName}</h3>
                <div className="friend-detail-section">
                  <h4>{t('memberFriends.friendCard.stageLabel')}</h4>
                  <p>{getStageLabel(selectedFriend.stage)}</p>
                </div>
                <div className="friend-detail-section">
                  <h4>{t('memberFriends.suggestions.title')}</h4>
                  <p>{getSuggestion(selectedFriend.stage)}</p>
                </div>
                <div className="friend-detail-section">
                  <div className="friend-notes-header">
                    <h4>{t('memberFriends.friendCard.notesLabel')}</h4>
                    {!editingNotes && (
                      <ButtonSecondary size="sm" onClick={() => setEditingNotes(true)}>
                        <FaPencil /> {t('memberFriends.detail.editNotes')}
                      </ButtonSecondary>
                    )}
                  </div>
                  {editingNotes ? (
                    <div className="friend-notes-editor">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={4}
                      />
                      <div className="friend-notes-actions">
                        <ButtonPrimary onClick={handleSaveNotes}>
                          {t('memberFriends.detail.saveNotes')}
                        </ButtonPrimary>
                        <ButtonSecondary onClick={() => {
                          setEditingNotes(false);
                          setNotes(selectedFriend.notes || '');
                        }}>
                          {t('memberFriends.detail.cancel')}
                        </ButtonSecondary>
                      </div>
                    </div>
                  ) : (
                    <p className="friend-notes-text">{notes || t('memberFriends.friendCard.noLastContact')}</p>
                  )}
                </div>
              </Card>
            )}

            {/* Add Friend Button */}
            {!isAddingFriend && (
              <div className="member-friends-add-button">
                <ButtonPrimary onClick={() => setIsAddingFriend(true)}>
                  <FaPlus /> {t('memberFriends.list.addFriendButton')}
                </ButtonPrimary>
              </div>
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default MemberFriendsScreen;

