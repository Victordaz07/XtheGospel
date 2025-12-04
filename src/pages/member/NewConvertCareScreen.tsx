import React, { useState, useEffect } from 'react';
import { useI18n } from '../../context/I18nContext';
import { MemberFriend, NewConvertCarePlan, NewConvertStage } from '../../data/memberTypes';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
} from '../../ui/components';
import { FaBell } from 'react-icons/fa6';
import '../learning/Page.css';
import './NewConvertCareScreen.css';

const NewConvertCareScreen: React.FC = () => {
  const { t } = useI18n();
  const [carePlans, setCarePlans] = useState<NewConvertCarePlan[]>([]);
  const [friends, setFriends] = useState<MemberFriend[]>([]);

  // TODO: Load from service/Firestore
  useEffect(() => {
    // Filter friends who are recent converts
    const recentConverts = friends.filter(f =>
      f.stage === 'recentConvert_0_3' || f.stage === 'recentConvert_3_12'
    );
    // Create care plans for them
    setCarePlans(recentConverts.map(friend => ({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      friendId: friend.id,
      startedAt: friend.createdAt,
      stage: friend.stage === 'recentConvert_0_3' ? 'baptism' : 'stabilizing',
      steps: [
        { id: '1', labelKey: 'newConvertCare.plan.stepSitTogether', done: false },
        { id: '2', labelKey: 'newConvertCare.plan.stepIntroduceLeaders', done: false },
        { id: '3', labelKey: 'newConvertCare.plan.stepInviteActivities', done: false },
        { id: '4', labelKey: 'newConvertCare.plan.stepScriptureHabits', done: false },
        { id: '5', labelKey: 'newConvertCare.plan.stepTempleGoal', done: false },
      ],
    })));
  }, [friends]);

  const getStageLabel = (stage: NewConvertStage): string => {
    return t(`newConvertCare.timeline.${stage}`);
  };

  const getFriendName = (friendId: string): string => {
    const friend = friends.find(f => f.id === friendId);
    return friend?.displayName || '';
  };

  const toggleStep = (planId: string, stepId: string) => {
    setCarePlans(carePlans.map(plan =>
      plan.id === planId
        ? {
            ...plan,
            steps: plan.steps.map(step =>
              step.id === stepId ? { ...step, done: !step.done } : step
            ),
          }
        : plan
    ));
    // TODO: Save to service/Firestore
  };

  if (carePlans.length === 0) {
    return (
      <PageContainer>
        <TopBar
          title={t('newConvertCare.header.title')}
          subtitle={t('newConvertCare.header.subtitle')}
          rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
        />
        <div className="page-content">
          <Card variant="outlined" className="new-convert-care-empty">
            <h3 className="empty-title">{t('newConvertCare.list.emptyTitle')}</h3>
            <p className="empty-description">{t('newConvertCare.list.emptyDescription')}</p>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TopBar
        title={t('newConvertCare.header.title')}
        subtitle={t('newConvertCare.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        <Section title={t('newConvertCare.header.title')}>
          <div className="new-convert-care-plans">
            {carePlans.map((plan) => (
              <Card key={plan.id} variant="default" className="new-convert-care-plan">
                <h3 className="care-plan-name">{getFriendName(plan.friendId)}</h3>
                <div className="care-plan-timeline">
                  {(['baptism', 'confirmation', 'firstCalling', 'firstTemple', 'stabilizing'] as NewConvertStage[]).map((stage, index) => (
                    <div
                      key={stage}
                      className={`timeline-item ${plan.stage === stage ? 'active' : ''} ${index < (['baptism', 'confirmation', 'firstCalling', 'firstTemple', 'stabilizing'] as NewConvertStage[]).indexOf(plan.stage) ? 'completed' : ''}`}
                    >
                      <div className="timeline-dot" />
                      <span className="timeline-label">{getStageLabel(stage)}</span>
                    </div>
                  ))}
                </div>
                <div className="care-plan-steps">
                  <h4>{t('newConvertCare.plan.stepsTitle')}</h4>
                  {plan.steps.map((step) => (
                    <label key={step.id} className="care-step-item">
                      <input
                        type="checkbox"
                        checked={step.done}
                        onChange={() => toggleStep(plan.id, step.id)}
                      />
                      <span>{t(step.labelKey)}</span>
                    </label>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </PageContainer>
  );
};

export default NewConvertCareScreen;

