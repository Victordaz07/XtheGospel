import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa6';
import { getChildLessonsByParentId, getLessonById, isInvestigatorCoreTopicId } from '../data/lessons';
import { getLessonDetailScripture, getScriptureById } from '../data/scriptures';
import { useInvestigatorStore } from '../store/useInvestigatorStore';
import { useSpiritualMemoryStore } from '../../../core/memory/useSpiritualMemoryStore';
import { useI18n } from '../../../context/I18nContext';
import { ScriptureCard } from '../components/ScriptureCard';
import { AudioPlayer } from '../components/AudioPlayer';
import { ScriptureReferenceCard } from '../../../ui/components';
import './InvestigatorLessonDetailPage.css';

/**
 * Investigator Lesson Detail Page
 * Sprint 7 - Pastoral tone, no completion tracking
 * lessonId comes from URL: /lessons/:lessonId or /lessons/* (splat)
 */
export default function InvestigatorLessonDetailPage(): JSX.Element {
  const params = useParams();
  const location = useLocation();
  const { locale: i18nLocale, t } = useI18n();
  const contentLocale = i18nLocale;
  
  // Support both nested Route (:lessonId) and parent /lessons/* splat
  const lessonId: string =
    (params.lessonId as string | undefined) ??
    (params['*'] as string | undefined) ??
    (location.pathname.startsWith('/lessons/')
      ? location.pathname.replace(/^\/lessons\/?/, '').split('/')[0] || ''
      : '');
  const { setLastLessonId, addJournalEntry, setLessonStatus } = useInvestigatorStore();
  const { setLastLesson, markSavedToJournal } = useSpiritualMemoryStore();

  // Start exploring immediately - no intermediate screen
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [openExtraId, setOpenExtraId] = useState<'questions' | 'final' | null>(
    null,
  );
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const lesson = getLessonById(lessonId, contentLocale);
  const scripture =
    (lesson?.featuredScriptureId &&
      getScriptureById(lesson.featuredScriptureId, contentLocale)) ||
    getLessonDetailScripture(contentLocale);
  const nextLesson = lesson?.recommendedNext
    ? getLessonById(lesson.recommendedNext, contentLocale)
    : null;
  const childLessons = lesson ? getChildLessonsByParentId(lesson.id, contentLocale) : [];
  const faqItems = lesson?.faqItems ?? [];

  // Remember last visited lesson (both stores for compatibility)
  useEffect(() => {
    if (lesson) {
      setLastLessonId(lessonId);
      setLastLesson({ id: lessonId, title: lesson.title });
    }
  }, [lesson, lessonId, setLastLessonId, setLastLesson]);

  // Mark lesson as exploring when opened
  useEffect(() => {
    if (!lessonId) return;
    setLessonStatus(lessonId, 'exploring');
  }, [lessonId, setLessonStatus]);

  const handleSaveReflection = (): void => {
    if (reflection.trim()) {
      addJournalEntry({
        type: 'text',
        content: reflection,
        lessonId: lessonId,
      });
      markSavedToJournal();
      setReflection('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (!lesson || !isInvestigatorCoreTopicId(lessonId)) {
    return (
      <div className="inv-lesson-detail">
        <Link to="/lessons" className="inv-lesson-detail__back">
          <FaArrowLeft /> {t('app.lessons.backToExplore')}
        </Link>
        <div className="inv-lesson-detail__not-found">
          <div className="inv-lesson-detail__not-found-icon">📚</div>
          <h2 className="inv-lesson-detail__not-found-title">
            {t('app.lessons.notAvailableTitle')}
          </h2>
          <p className="inv-lesson-detail__not-found-text">
            {t('app.lessons.notAvailableText')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inv-lesson-detail">
      {/* Back Button */}
      <Link to="/lessons" className="inv-lesson-detail__back">
        <FaArrowLeft /> {t('app.lessons.backToExplore')}
      </Link>

      {/* Hero - Compact header */}
      <header className="inv-lesson-detail__hero">
        <div className="inv-lesson-detail__icon">{lesson.icon}</div>
        <h1 className="inv-lesson-detail__title">{lesson.title}</h1>
        <p className="inv-lesson-detail__subtitle">{lesson.subtitle}</p>
      </header>

      {/* Content - Always visible */}
      <div id="inv-lesson-content" className="inv-lesson-detail__content">
          {/* Intro (optional) */}
          {lesson.introParagraph && (
            <div className="inv-lesson-detail__intro">
              <p className="inv-lesson-detail__intro-text">
                {lesson.introParagraph}
              </p>
            </div>
          )}

          {/* Layer 2: Deepening (one-by-one) */}
          <div className="inv-lesson-detail__layers">
            {lesson.sections.map(section => {
              const isOpen = openSectionId === section.id;
              return (
                <div
                  key={section.id}
                  className={
                    isOpen
                      ? 'inv-lesson-detail__layer inv-lesson-detail__layer--open'
                      : 'inv-lesson-detail__layer'
                  }
                >
                  <button
                    type="button"
                    className="inv-lesson-detail__layer-trigger"
                    onClick={() =>
                      setOpenSectionId(prev =>
                        prev === section.id ? null : section.id,
                      )
                    }
                    aria-expanded={isOpen}
                  >
                    <span className="inv-lesson-detail__layer-title">
                      {section.title}
                    </span>
                    <FaChevronRight
                      className={
                        isOpen
                          ? 'inv-lesson-detail__layer-chevron inv-lesson-detail__layer-chevron--open'
                          : 'inv-lesson-detail__layer-chevron'
                      }
                    />
                  </button>

                  {isOpen && (
                    <div className="inv-lesson-detail__layer-body">
                      <div className="inv-lesson-detail__layer-text">
                        {section.content.split(/\n\n+/).map((para, i) => (
                          <p key={i}>{para.trim()}</p>
                        ))}
                      </div>

                      {section.hasAudio && (
                        <AudioPlayer label={section.title} />
                      )}

                      {section.scriptureRef && (
                        <div className="inv-lesson-detail__section-scripture">
                          <ScriptureReferenceCard reference={section.scriptureRef} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FAQ (quiet, optional, one-by-one) */}
          {faqItems.length > 0 && (
            <div className="inv-lesson-detail__faq">
              <h3 className="inv-lesson-detail__faq-title">{t('app.lessons.frequentDoubts')}</h3>
              <p className="inv-lesson-detail__faq-note">
                {t('app.lessons.frequentDoubtsNote')}
              </p>
              <div className="inv-lesson-detail__faq-list">
                {faqItems.map(item => {
                  const isOpen = openFaqId === item.id;
                  return (
                    <div key={item.id} className="inv-lesson-detail__faq-item">
                      <button
                        type="button"
                        className="inv-lesson-detail__faq-question"
                        onClick={() =>
                          setOpenFaqId(prev =>
                            prev === item.id ? null : item.id,
                          )
                        }
                        aria-expanded={isOpen}
                      >
                        <span className="inv-lesson-detail__faq-question-text">
                          {item.question}
                        </span>
                        <FaChevronRight
                          className={
                            isOpen
                              ? 'inv-lesson-detail__faq-chevron inv-lesson-detail__faq-chevron--open'
                              : 'inv-lesson-detail__faq-chevron'
                          }
                        />
                      </button>
                      {isOpen && (
                        <div className="inv-lesson-detail__faq-answer">
                          {item.answer.split(/\n\n+/).map((para, i) => (
                            <p key={i}>{para.trim()}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scripture Card (accent should whisper) */}
          <div className="inv-lesson-detail__scripture">
            <p className="inv-lesson-detail__scripture-label">
              {t('app.lessons.featuredScripture')}
            </p>
            <ScriptureCard scripture={scripture} />
          </div>

          {/* Extra: Preguntas doctrinales (collapsed by default) */}
          {lesson.reflectionQuestions &&
            lesson.reflectionQuestions.length > 0 && (
              <div className="inv-lesson-detail__extra">
                <button
                  type="button"
                  className="inv-lesson-detail__extra-trigger"
                  onClick={() =>
                    setOpenExtraId(prev =>
                      prev === 'questions' ? null : 'questions',
                    )
                  }
                  aria-expanded={openExtraId === 'questions'}
                >
                  <span>{t('app.lessons.doctrinalQuestions')}</span>
                  <FaChevronRight
                    className={
                      openExtraId === 'questions'
                        ? 'inv-lesson-detail__layer-chevron inv-lesson-detail__layer-chevron--open'
                        : 'inv-lesson-detail__layer-chevron'
                    }
                  />
                </button>
                {openExtraId === 'questions' && (
                  <div className="inv-lesson-detail__extra-body">
                    <p className="inv-lesson-detail__questions-note">
                      {t('app.lessons.doctrinalQuestionsNote')}
                    </p>
                    <ul className="inv-lesson-detail__questions-list">
                      {lesson.reflectionQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          {/* Layer 3: Interiorization */}
          <div className="inv-lesson-detail__reflection">
            <h3 className="inv-lesson-detail__reflection-label">
              {t('app.lessons.personalReflection')}
            </h3>
            <p className="inv-lesson-detail__reflection-prompt">
              {lesson.reflectionPrompt}
            </p>
            <textarea
              className="inv-lesson-detail__reflection-textarea"
              placeholder={t('app.lessons.reflectionPlaceholder')}
              value={reflection}
              onChange={e => setReflection(e.target.value)}
            />
            <p className="inv-lesson-detail__reflection-note">
              {t('app.lessons.reflectionNote')}
            </p>
            <button
              className="inv-lesson-detail__btn"
              onClick={handleSaveReflection}
              disabled={!reflection.trim()}
            >
              {saved ? t('app.lessons.savedToJournal') : t('app.lessons.saveToJournal')}
            </button>
            {saved && (
              <p className="inv-lesson-detail__saved-message">
                {t('app.lessons.savedMessage')}
              </p>
            )}
            <button
              type="button"
              onClick={() => lessonId && setLessonStatus(lessonId, 'completed')}
              className="inv-lesson-detail__btn inv-lesson-detail__btn--secondary"
            >
              {t('app.lessons.markCompleted')}
            </button>
          </div>

          {/* Mensaje final (collapsed by default) */}
          {lesson.finalMessage && (
            <div className="inv-lesson-detail__extra">
              <button
                type="button"
                className="inv-lesson-detail__extra-trigger"
                onClick={() =>
                  setOpenExtraId(prev => (prev === 'final' ? null : 'final'))
                }
                aria-expanded={openExtraId === 'final'}
              >
                <span>{t('app.lessons.finalMessage')}</span>
                <FaChevronRight
                  className={
                    openExtraId === 'final'
                      ? 'inv-lesson-detail__layer-chevron inv-lesson-detail__layer-chevron--open'
                      : 'inv-lesson-detail__layer-chevron'
                  }
                />
              </button>
              {openExtraId === 'final' && (
                <div className="inv-lesson-detail__extra-body">
                  <p className="inv-lesson-detail__final-text">
                    {lesson.finalMessage}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sub-topics (Topic padre) */}
          {childLessons.length > 0 && (
            <div className="inv-lesson-detail__subtopics">
              <p className="inv-lesson-detail__subtopics-label">{t('app.lessons.subTopics')}</p>
              <div className="inv-lesson-detail__subtopics-list">
                {childLessons.map(child => (
                  <Link
                    key={child.id}
                    to={`/lessons/${child.id}`}
                    className="inv-lesson-detail__subtopics-card"
                  >
                    <span className="inv-lesson-detail__next-icon">
                      {child.icon}
                    </span>
                    <span className="inv-lesson-detail__next-title">
                      {child.title}
                    </span>
                    <FaChevronRight className="inv-lesson-detail__next-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Siguiente tema recomendado */}
          {nextLesson && (
            <div className="inv-lesson-detail__next">
              <p className="inv-lesson-detail__next-label">
                {t('app.lessons.recommendedNext')}
              </p>
              <Link
                to={`/lessons/${nextLesson.id}`}
                className="inv-lesson-detail__next-card"
              >
                <span className="inv-lesson-detail__next-icon">
                  {nextLesson.icon}
                </span>
                <span className="inv-lesson-detail__next-title">
                  {nextLesson.title}
                </span>
                <FaChevronRight className="inv-lesson-detail__next-arrow" />
              </Link>
            </div>
          )}

          {/* Footer */}
          <footer className="inv-lesson-detail__footer">
            <p className="inv-lesson-detail__footer-text">
              {t('app.lessons.footerText')}
            </p>
          </footer>
        </div>
    </div>
  );
}
