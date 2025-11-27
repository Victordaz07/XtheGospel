import React, { useMemo, useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { collectSequentialStrings } from '../../utils/memberData';
import './MemberComponents.css';

/**
 * Daily devotional card component
 * Displays scripture, quote, and reflection input
 */
export const MemberDevotionalCard: React.FC = () => {
  const { t } = useI18n();
  const [reflection, setReflection] = useState('');
  const [feltSomething, setFeltSomething] = useState(false);

  const scriptures = useMemo(
    () => collectSequentialStrings(t, 'member.devotional.exampleScriptures'),
    [t]
  );

  const devotionalScripture = scriptures.length
    ? scriptures[new Date().getDate() % scriptures.length]
    : '';

  return (
    <div className="member-devotional-card profile-card">
      <h2>{t('member.devotional.title')}</h2>
      <p>{t('member.devotional.description')}</p>
      <div className="devotional-scripture">
        <strong>{devotionalScripture}</strong>
      </div>
      <blockquote>{t('member.devotional.exampleQuote')}</blockquote>
      <textarea
        rows={3}
        value={reflection}
        placeholder={t('member.devotional.reflectionPlaceholder')}
        onChange={(e) => setReflection(e.target.value)}
      />
      <div className="devotional-actions">
        <button className="btn-primary" onClick={() => setFeltSomething(true)}>
          {t('member.devotional.feltSomethingYes')}
        </button>
        <button className="btn-secondary" onClick={() => setFeltSomething(false)}>
          {t('member.devotional.feltSomethingNo')}
        </button>
      </div>
      {feltSomething && reflection && (
        <div className="devotional-feedback">
          <strong>{t('member.devotional.promptTitle')}</strong>
          <p>{reflection}</p>
        </div>
      )}
    </div>
  );
};

