import React from 'react';
import { Link } from 'react-router-dom';
import { useMemberT } from '../../i18n/memberKeys';
import './MemberComponents.css';

/**
 * Hero section for Member Missionary home page
 * Displays welcome message and call-to-action cards
 */
export const MemberHero: React.FC = () => {
  const { t } = useMemberT();

  const cards = [
    {
      title: t('home.cards.study.title'),
      subtitle: t('home.cards.study.subtitle'),
      cta: t('home.cards.study.cta'),
      to: '/member/skills',
    },
    {
      title: t('home.cards.friends.title'),
      subtitle: t('home.cards.friends.subtitle'),
      cta: t('home.cards.friends.cta'),
      to: '/member/friends',
    },
    {
      title: t('home.cards.support.title'),
      subtitle: t('home.cards.support.subtitle'),
      cta: t('home.cards.support.cta'),
      to: '/member/support',
    },
    {
      title: t('home.cards.conversionCare.title'),
      subtitle: t('home.cards.conversionCare.subtitle'),
      cta: t('home.cards.conversionCare.cta'),
      to: '/member/conversion',
    },
  ];

  return (
    <div className="member-hero">
      <div className="hero-card">
        <h2>{t('home.welcomeTitle')}</h2>
        <p>{t('home.heroCallToAction')}</p>
      </div>

      <div className="cards-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="member-card">
            <h3>{card.title}</h3>
            <p>{card.subtitle}</p>
            <span className="member-card-cta">{card.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

