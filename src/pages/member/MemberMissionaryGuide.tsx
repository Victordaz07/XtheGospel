import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { getMissionaryLessons } from '../../data/member';
import { PageContainer, TopBar, Card, IconButton } from '../../ui/components';
import { FaBell, FaChevronRight } from 'react-icons/fa6';
import '../Page.css';
import './MemberMissionaryGuide.css';

const MemberMissionaryGuide: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const lessons = getMissionaryLessons();

  const handleLessonClick = (lessonId: string) => {
    // Navegar a la página de detalle de la lección
    // TODO: Implementar página de detalle si no existe
    navigate(`/member/missionary-guide/${lessonId}`);
  };

  return (
    <PageContainer>
      <TopBar
        title={t('member.missionaryGuide.title') || 'Missionary Guide'}
        subtitle={
          t('member.missionaryGuide.subtitle') ||
          'Practica las lecciones y enseña con poder'
        }
        rightAction={
          <IconButton icon={<FaBell />} ariaLabel={t('common.notifications')} />
        }
      />

      <div className="page-content">
        <Card variant="gradient" className="member-missionary-guide-header">
          <h2 className="member-missionary-guide-header-title">
            {t('member.missionaryGuide.title') || 'Missionary Guide'}
          </h2>
          <p className="member-missionary-guide-header-subtitle">
            {t('member.missionaryGuide.description') ||
              'Practica las lecciones con estructura, escrituras, preguntas inspiradas y ejemplos reales antes de enseñar.'}
          </p>
        </Card>

        <div className="member-missionary-guide-lessons">
          {lessons.map(lesson => (
            <Card
              key={lesson.id}
              variant="default"
              className="member-missionary-guide-lesson-card"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <div className="member-missionary-guide-lesson-left">
                <div className="member-missionary-guide-lesson-badge">
                  {lesson.order}
                </div>
                <div className="member-missionary-guide-lesson-content">
                  <h3 className="member-missionary-guide-lesson-title">
                    {lesson.title}
                  </h3>
                  <p className="member-missionary-guide-lesson-subtitle">
                    {lesson.subtitle}
                  </p>
                  <p className="member-missionary-guide-lesson-objective">
                    {lesson.objective}
                  </p>
                </div>
              </div>
              <FaChevronRight className="member-missionary-guide-lesson-arrow" />
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default MemberMissionaryGuide;
