import React, { useEffect, useMemo, useState } from 'react';
import '../Page.css';
import { useI18n } from '../../context/I18nContext';
import {
  MemberFriend,
  MemberFriendsService,
  PreparedLevel,
} from '../../services/memberFriendsService';
import {
  getMemberFriendDoctrinePoints,
  getMemberFriendReflectionQuestions,
} from '../../utils/memberData';
import { CustomSelect } from '../../vineyard/components/CustomSelect';

const preparedLevels: PreparedLevel[] = ['cold', 'warm', 'hot'];

const MemberFriends: React.FC = () => {
  const { t } = useI18n();
  const [friends, setFriends] = useState<MemberFriend[]>([]);
  const [form, setForm] = useState<Omit<MemberFriend, 'id'>>({
    name: '',
    relationship: '',
    spiritualSituation: '',
    lastPositiveContact: '',
    preparedLevel: 'cold',
    notes: '',
    isPraying: false,
    readyForMissionaries: false,
    interactions: [],
  });
  const [interactionInputs, setInteractionInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setFriends(MemberFriendsService.getFriends());
  }, []);

  const handleInputChange = (field: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddFriend = () => {
    if (!form.name.trim()) {
      alert(t('common.error') + ': ' + t('member.friends.labels.name'));
      return;
    }
    const newFriend = MemberFriendsService.addFriend(form);
    setFriends((prev) => [...prev, newFriend]);
    setForm({
      name: '',
      relationship: '',
      spiritualSituation: '',
      lastPositiveContact: '',
      preparedLevel: 'cold',
      notes: '',
      isPraying: false,
      readyForMissionaries: false,
      interactions: [],
    });
  };

  const handleToggleReady = (friend: MemberFriend) => {
    const updated = { ...friend, readyForMissionaries: !friend.readyForMissionaries };
    MemberFriendsService.updateFriend(updated);
    setFriends((prev) => prev.map((f) => (f.id === friend.id ? updated : f)));
    if (!friend.readyForMissionaries) {
      alert(t('member.ui.readyForMissionaries'));
    }
  };

  const handleAddInteraction = (friend: MemberFriend) => {
    const text = interactionInputs[friend.id];
    if (!text || !text.trim()) return;
    const updated: MemberFriend = {
      ...friend,
      interactions: [
        ...friend.interactions,
        { id: Date.now().toString(), description: text, date: new Date().toISOString() },
      ],
    };
    MemberFriendsService.updateFriend(updated);
    setFriends((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
    setInteractionInputs((prev) => ({ ...prev, [friend.id]: '' }));
  };

  const reflectionQuestions = useMemo(() => getMemberFriendReflectionQuestions(t), [t]);
  const doctrinePoints = useMemo(() => getMemberFriendDoctrinePoints(t), [t]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('member.friends.title')}</h1>
        <p className="page-subtitle">{t('member.friends.description')}</p>
      </div>
      <div className="page-content">
        <p>{t('member.friends.explanation')}</p>

        <div className="profile-card">
          <h2>{t('member.ui.newFriendTitle')}</h2>
          <div className="form-group">
            <label>{t('member.friends.labels.name')}</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>{t('member.friends.labels.relationship')}</label>
            <input
              type="text"
              value={form.relationship}
              onChange={(e) => handleInputChange('relationship', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>{t('member.friends.labels.spiritualSituation')}</label>
            <input
              type="text"
              value={form.spiritualSituation}
              onChange={(e) => handleInputChange('spiritualSituation', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>{t('member.friends.labels.lastPositiveContact')}</label>
            <input
              type="date"
              value={form.lastPositiveContact}
              onChange={(e) => handleInputChange('lastPositiveContact', e.target.value)}
            />
          </div>
          <div className="form-group">
            <CustomSelect
              label={t('member.friends.labels.preparedLevel')}
              value={form.preparedLevel}
              onChange={(value) => handleInputChange('preparedLevel', value as PreparedLevel)}
              options={preparedLevels.map((level) => ({
                value: level,
                label: t(`member.friends.preparedLevels.${level}`),
              }))}
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={form.isPraying}
                onChange={(e) => handleInputChange('isPraying', e.target.checked)}
              />
              {t('member.friends.labels.isPraying')}
            </label>
          </div>
          <div className="form-group">
            <label>{t('member.friends.labels.notes')}</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder={t('member.friends.spiritualNotesHint')}
            />
          </div>
          <button className="btn-primary btn-primary-spaced" onClick={handleAddFriend}>
            {t('member.ui.addFriend')}
          </button>
        </div>

        <div className="friends-list">
          {friends.length === 0 ? (
            <p>{t('member.ui.friendListEmpty')}</p>
          ) : (
            friends.map((friend) => (
              <div key={friend.id} className="baptism-section-card">
                <div className="baptism-section-header">
                  <div>
                    <h2>{friend.name}</h2>
                    <p>{friend.relationship}</p>
                  </div>
                  <span className="badge">{t(`member.friends.preparedLevels.${friend.preparedLevel}`)}</span>
                </div>
                <div className="baptism-section-content">
                  <p><strong>{t('member.friends.labels.spiritualSituation')}:</strong> {friend.spiritualSituation}</p>
                  {friend.lastPositiveContact && (
                    <p><strong>{t('member.friends.labels.lastPositiveContact')}:</strong> {friend.lastPositiveContact}</p>
                  )}
                  <p><strong>{t('member.friends.labels.isPraying')}:</strong> {friend.isPraying ? t('member.ui.yes') : t('member.ui.no')}</p>
                  <p><strong>{t('member.friends.labels.notes')}:</strong> {friend.notes || '—'}</p>
                  <button className="btn-primary" onClick={() => handleToggleReady(friend)}>
                    {friend.readyForMissionaries
                      ? t('member.ui.yes')
                      : t('member.friends.labels.readyForMissionaries')}
                  </button>
                  <div className="interaction-block">
                    <h3>{t('member.ui.addInteraction')}</h3>
                    <textarea
                      rows={2}
                      value={interactionInputs[friend.id] || ''}
                      placeholder={t('member.ui.interactionPlaceholder')}
                      onChange={(e) =>
                        setInteractionInputs((prev) => ({ ...prev, [friend.id]: e.target.value }))
                      }
                    />
                    <button className="btn-primary" onClick={() => handleAddInteraction(friend)}>
                      {t('member.ui.save')}
                    </button>
                    {friend.interactions.length > 0 && (
                      <ul className="interaction-list">
                        {friend.interactions.map((interaction) => (
                          <li key={interaction.id}>
                            <span>{new Date(interaction.date).toLocaleDateString()}</span> — {interaction.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="profile-card">
          <h2>{t('member.friends.doctrineBlock.title')}</h2>
          <ul>
            {doctrinePoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="profile-card">
          <h2>{t('member.friends.title')} · {t('member.devotional.promptTitle')}</h2>
          <ul>
            {reflectionQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberFriends;
