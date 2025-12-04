import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaHeart } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { useDailyMessageForToday } from '../../hooks/useDailyMessageForToday';
import {
  PageContainer,
  TopBar,
  RoleBadge,
  Card,
  Section,
  ButtonSecondary,
  IconButton,
} from '../../ui/components';
import '../learning/Page.css';
import '../learning/HomePage.css';
import './MemberHomeScreen.css';

const MemberHomeScreen: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const dailyMessageId = useDailyMessageForToday("member");
  const msgKey = `dailyMessages.${dailyMessageId}`;

  // Mock service progress data (TODO: connect to real data)
  const [serviceProgress] = useState({
    accompaniedInvestigator: false,
    boreTestimony: false,
    helpedMissionaries: false,
    extendedInvitation: false,
  });

  const quickActions = [
    {
      icon: '🤝',
      title: t('memberHome.quickActions.helpMissionaries'),
      link: '/member/help-panel',
      color: 'primary'
    },
    {
      icon: '👥',
      title: t('memberHome.quickActions.friends'),
      link: '/member/friends',
      color: 'secondary'
    },
    {
      icon: '🎓',
      title: t('memberHome.quickActions.training'),
      link: '/member/training',
      color: 'accent'
    },
    {
      icon: '🌱',
      title: t('memberHome.quickActions.newConverts'),
      link: '/member/new-converts',
      color: 'success'
    }
  ];

  return (
    <PageContainer>
      <TopBar
        title={t('memberHome.header.title')}
        subtitle={t('memberHome.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {/* Daily Motivator */}
        <Card variant="gradient" className="member-daily-motivator">
          <h3 className="daily-message-title">
            <span className="daily-message-icon">✨</span>
            {t('memberHome.dailyMotivator.title')}
          </h3>
          
          <div className="daily-message-scripture">
            <div className="scripture-ref">
              {t('memberHome.dailyMotivator.defaultScriptureRef')}
            </div>
            <div className="scripture-text">
              {t('memberHome.dailyMotivator.defaultScriptureText')}
            </div>
          </div>

          <div className="daily-message-reflection">
            <p>{t('memberHome.dailyMotivator.defaultReflection')}</p>
          </div>

          <div className="daily-message-action">
            <strong>{t('home.dailyMessage.todayActionTitle')}</strong>
            <p>{t('memberHome.dailyMotivator.defaultAction')}</p>
          </div>
        </Card>

        {/* Quick Actions */}
        <Section title={t('memberHome.quickActions.title')}>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                variant="default"
                className={`action-card action-${action.color}`}
                onClick={() => navigate(action.link)}
              >
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h4 className="action-title">{action.title}</h4>
                </div>
                <div className="action-arrow">→</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Service Progress */}
        <Card variant="outlined" className="member-service-progress">
          <h3 className="service-progress-title">
            {t('memberHome.serviceProgress.title')}
          </h3>
          <div className="service-progress-checklist">
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.accompaniedInvestigator}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.accompaniedInvestigator')}</span>
            </label>
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.boreTestimony}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.boreTestimony')}</span>
            </label>
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.helpedMissionaries}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.helpedMissionaries')}</span>
            </label>
            <label className="service-progress-item">
              <input
                type="checkbox"
                checked={serviceProgress.extendedInvitation}
                readOnly
              />
              <span>{t('memberHome.serviceProgress.extendedInvitation')}</span>
            </label>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MemberHomeScreen;

