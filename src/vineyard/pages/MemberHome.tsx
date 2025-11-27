import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaHeart, FaPen, FaBullseye, FaBell, FaBars, FaHome, FaCompass, FaUsers, FaChartLine, FaUser, FaTrophy } from 'react-icons/fa';
import { useI18n } from '../../context/I18nContext';
import { useMemberProgressStore } from '../state/memberProgressStore';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  ProgressBar,
  StatPill,
  IconButton,
} from '../../ui/components';
import { FeaturedContentSection } from '../../member/components/FeaturedContentSection';
import { NotificationsModal } from '../components/NotificationsModal';
import { MemberMenu } from '../components/MemberMenu';
import '../styles/memberMobile.css';
import './MemberHome.css';

export const MemberHome: React.FC = () => {
  const { t } = useI18n();
  const progress = useMemberProgressStore((state) => state.progress);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('memberHome.greeting.morning');
    if (hour < 18) return t('memberHome.greeting.afternoon');
    return t('memberHome.greeting.evening');
  };

  const quickActions = [
    { icon: FaBook, label: t('memberHome.quickActions.dailyReading'), color: 'blue', link: '/member/study' },
    { icon: FaHeart, label: t('memberHome.quickActions.meditation'), color: 'green', link: '/member/activities' },
    { icon: FaPen, label: t('memberHome.quickActions.journal'), color: 'yellow', link: '/member/progress' },
    { icon: FaBullseye, label: t('memberHome.quickActions.goals'), color: 'purple', link: '/member/progress' },
  ];

  return (
    <PageContainer>
      <TopBar
        title={`${getGreeting()}, Sarah`}
        subtitle={t('memberHome.greeting.subtitle')}
        rightAction={
          <>
            <IconButton 
              icon={<FaBell />} 
              ariaLabel={t('memberHome.notifications.title') || 'Notificaciones'}
              onClick={() => setNotificationsOpen(true)}
            />
            <IconButton 
              icon={<FaBars />} 
              ariaLabel={t('memberHome.menu.title') || 'Menú'}
              onClick={() => setMenuOpen(true)}
            />
          </>
        }
      />

      <NotificationsModal 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />
      <MemberMenu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />

      <div className="page-content">
        {/* Daily Inspiration Section */}
        <Card variant="gradient" className="member-gradient-card-primary">
          <h2>{t('memberHome.dailyInspiration.title')}</h2>
          <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
            {t('memberHome.dailyInspiration.quote')}
          </p>
          <p style={{ opacity: 0.75, fontSize: '12px' }}>{t('memberHome.dailyInspiration.author')}</p>
        </Card>

        {/* Quick Actions Section */}
        <section id="quick-actions" className="member-mb-6">
          <h3 className="member-section-title">{t('memberHome.quickActions.title')}</h3>
          <div className="member-grid-2">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="member-quick-action"
                >
                  <div className={`member-quick-action-icon member-quick-action-icon-${action.color}`}>
                    <IconComponent />
                  </div>
                  <span className="member-quick-action-text">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Content Section */}
        <FeaturedContentSection maxItems={2} />

        {/* Progress Overview Section */}
        <Section title={t('memberHome.progress.title')}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(to right, #34d399, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <FaTrophy />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, margin: 0 }}>{t('memberHome.progress.streak', { days: 7 })}</h4>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{t('memberHome.progress.keepItUp')}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '24px', fontWeight: 700, color: '#059669', margin: 0 }}>7</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{t('memberHome.progress.days')}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{t('memberHome.progress.readingGoal')}</span>
                <ProgressBar value={75} variant="info" size="sm" showLabel />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{t('memberHome.progress.meditation')}</span>
                <ProgressBar value={50} variant="success" size="sm" showLabel />
              </div>
            </div>
          </Card>
        </Section>

        {/* Community Highlights Section */}
        <section id="community-highlights" className="member-mb-6">
          <h3 className="member-section-title">{t('memberHome.community.title')}</h3>
          <div className="member-white-card">
            <div className="member-flex member-items-center member-gap-3 member-mb-4">
              <img 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" 
                alt="Member" 
                className="member-avatar-small"
              />
              <div style={{ flex: 1 }}>
                <h4 className="member-font-semibold member-text-gray-900 member-text-sm">{t('memberHome.community.sharedInsight', { name: 'Alex' })}</h4>
                <p className="member-text-xs member-text-gray-500">{t('memberHome.community.hoursAgo', { hours: 2 })}</p>
              </div>
              <button className="member-mobile-btn-icon">
                <FaBars className="member-text-sm" />
              </button>
            </div>
            <p className="member-text-sm member-text-gray-700 member-mb-3">
              "Today's meditation session helped me find clarity in a challenging situation. Grateful for this community!"
            </p>
            <div className="member-flex member-items-center member-gap-4">
              <button className="member-community-action-btn">
                <FaHeart className="member-text-sm" />
                <span className="member-text-xs">24</span>
              </button>
              <button className="member-community-action-btn">
                <FaUsers className="member-text-sm" />
                <span className="member-text-xs">8</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
};
