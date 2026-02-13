import React from 'react';
import { useI18n } from '../../context/I18nContext';
import { useMemberProfile } from '../../hooks/useMemberProfile';
import { MemberHero } from '../../components/member/MemberHero';
import { MemberDevotionalCard } from '../../components/member/MemberDevotionalCard';
import { MemberSkillsPreview } from '../../components/member/MemberSkillsPreview';
import { MemberFriendsPreview } from '../../components/member/MemberFriendsPreview';
import '../../pages/Page.css';

const MemberHome: React.FC = () => {
  const { t } = useI18n();
  const { profile, loading: profileLoading } = useMemberProfile();

  // If loading profile, show nothing (or a loading state)
  if (profileLoading) {
    return (
      <div className="page">
        <div className="page-content">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  // Render normal member view with new components
  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('member.home.title')}</h1>
        <p className="page-subtitle">{t('member.home.welcomeSubtitle')}</p>
      </div>
      <div className="page-content">
        {/* Hero section with welcome and CTA cards */}
        <MemberHero />

        {/* Daily Devotional card */}
        <MemberDevotionalCard />

        {/* My Friends preview */}
        <MemberFriendsPreview />

        {/* Skills summary preview */}
        <MemberSkillsPreview />
      </div>
    </div>
  );
};

export default MemberHome;
