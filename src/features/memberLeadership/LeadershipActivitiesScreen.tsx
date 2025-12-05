import React from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
  EmptyState,
} from '../../ui/components';
import { FaBell, FaCalendar } from 'react-icons/fa6';
import '../../pages/learning/Page.css';
import './LeadershipActivitiesScreen.css';

const LeadershipActivitiesScreen: React.FC = () => {
  const { t } = useI18n();

  // TODO: Load from service
  const activities: any[] = [];

  return (
    <PageContainer>
      <TopBar
        title={t('leadershipActivities.title')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {activities.length === 0 ? (
          <EmptyState
            title={t('leadershipActivities.emptyTitle')}
            description={t('leadershipActivities.emptyDescription')}
            icon={<FaCalendar />}
          />
        ) : (
          <Section title={t('leadershipActivities.title')}>
            {/* TODO: Implement activities list */}
          </Section>
        )}
      </div>
    </PageContainer>
  );
};

export default LeadershipActivitiesScreen;

