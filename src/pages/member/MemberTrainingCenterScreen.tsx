import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import {
  PageContainer,
  TopBar,
  Card,
  Section,
  IconButton,
} from '../../ui/components';
import { FaBell } from 'react-icons/fa6';
import '../learning/Page.css';
import './MemberTrainingCenterScreen.css';

const MemberTrainingCenterScreen: React.FC = () => {
  const { t } = useI18n();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'teachLikeChrist',
      title: t('memberTraining.modules.teachLikeChrist.title'),
      description: t('memberTraining.modules.teachLikeChrist.description'),
      points: [
        t('memberTraining.modules.teachLikeChrist.points.fromHeart'),
        t('memberTraining.modules.teachLikeChrist.points.simpleWords'),
        t('memberTraining.modules.teachLikeChrist.points.askInspired'),
        t('memberTraining.modules.teachLikeChrist.points.leaveSilence'),
      ],
    },
    {
      id: 'inviteWithLove',
      title: t('memberTraining.modules.inviteWithLove.title'),
      description: t('memberTraining.modules.inviteWithLove.description'),
      points: [
        t('memberTraining.modules.inviteWithLove.points.clearInvitation'),
        t('memberTraining.modules.inviteWithLove.points.respectNo'),
        t('memberTraining.modules.inviteWithLove.points.rightTiming'),
        t('memberTraining.modules.inviteWithLove.points.followUp'),
      ],
    },
    {
      id: 'explainLessonsSimply',
      title: t('memberTraining.modules.explainLessonsSimply.title'),
      description: t('memberTraining.modules.explainLessonsSimply.description'),
      lessons: {
        restoration: t('memberTraining.modules.explainLessonsSimply.lessons.restoration'),
        planOfSalvation: t('memberTraining.modules.explainLessonsSimply.lessons.planOfSalvation'),
        gospelOfChrist: t('memberTraining.modules.explainLessonsSimply.lessons.gospelOfChrist'),
        commandments: t('memberTraining.modules.explainLessonsSimply.lessons.commandments'),
        lawsAndOrdinances: t('memberTraining.modules.explainLessonsSimply.lessons.lawsAndOrdinances'),
      },
    },
  ];

  const rolePlayScenarios = [
    {
      id: 'scenario1',
      title: t('memberTraining.rolePlay.scenario1.title'),
      question: t('memberTraining.rolePlay.scenario1.question'),
      hint: t('memberTraining.rolePlay.scenario1.hint'),
      goodAnswer: t('memberTraining.rolePlay.scenario1.goodAnswer'),
    },
    {
      id: 'scenario2',
      title: t('memberTraining.rolePlay.scenario2.title'),
      question: t('memberTraining.rolePlay.scenario2.question'),
      hint: t('memberTraining.rolePlay.scenario2.hint'),
      goodAnswer: t('memberTraining.rolePlay.scenario2.goodAnswer'),
    },
  ];

  return (
    <PageContainer>
      <TopBar
        title={t('memberTraining.header.title')}
        subtitle={t('memberTraining.header.subtitle')}
        rightAction={<IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />}
      />

      <div className="page-content">
        {/* Training Modules */}
        <Section title={t('memberTraining.header.title')}>
          <div className="training-modules-list">
            {modules.map((module) => (
              <Card
                key={module.id}
                variant="default"
                className={`training-module-card ${expandedModule === module.id ? 'expanded' : ''}`}
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              >
                <div className="module-header">
                  <h3 className="module-title">{module.title}</h3>
                  <span className="module-toggle">{expandedModule === module.id ? '−' : '+'}</span>
                </div>
                <p className="module-description">{module.description}</p>
                {expandedModule === module.id && (
                  <div className="module-content">
                    {module.points && (
                      <ul className="module-points">
                        {module.points.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    )}
                    {module.lessons && (
                      <div className="module-lessons">
                        {Object.entries(module.lessons).map(([key, value]) => (
                          <div key={key} className="lesson-summary">
                            <strong>{key}:</strong> {value}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Section>

        {/* Role Play Scenarios */}
        <Section title={t('memberTraining.rolePlay.title')}>
          <div className="role-play-scenarios">
            {rolePlayScenarios.map((scenario) => (
              <Card key={scenario.id} variant="outlined" className="role-play-card">
                <h4 className="scenario-title">{scenario.title}</h4>
                <p className="scenario-question">{scenario.question}</p>
                <div className="scenario-hint">
                  <strong>💡 Pista:</strong>
                  <p>{scenario.hint}</p>
                </div>
                <div className="scenario-answer">
                  <strong>✓ Respuesta sugerida:</strong>
                  <p>{scenario.goodAnswer}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </PageContainer>
  );
};

export default MemberTrainingCenterScreen;

