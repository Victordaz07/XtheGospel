import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LESSONS } from '../data/lessonsData';
import { useI18n } from '../context/I18nContext';
import { useProgress } from '../context/ProgressContext';
import { NotesService } from '../services/notesService';
import { CommitmentsService } from '../services/commitmentsService';
import './LessonDetail.css';

// Mapeo de IDs de lecciones a claves de i18n
const LESSON_ID_TO_I18N_KEY: Record<string, string> = {
  'L1': 'lesson1',
  'L2': 'lesson2',
  'L3': 'lesson3',
  'L4': 'lesson4',
  'L5': 'lesson5',
  'L6': 'lesson6',
  'L7': 'lesson7',
};

// Número de temas por lección
const TOPICS_PER_LESSON: Record<string, number> = {
  'L1': 9,
  'L2': 7,
  'L3': 7,
  'L4': 9,
  'L5': 7,
  'L6': 7,
  'L7': 7,
};

// Preguntas de reflexión genéricas por tema (se pueden personalizar después)
const getReflectionQuestions = (t: (key: string) => string, locale: string): string[] => {
  return [
    t('lesson.reflectionQuestion1') || '¿Cómo puedo aplicar esto en mi vida?',
    t('lesson.reflectionQuestion2') || '¿Qué siento al leer esto?',
    t('lesson.reflectionQuestion3') || '¿Qué preguntas tengo sobre este tema?'
  ];
};

// Compromisos sugeridos genéricos (se pueden personalizar después)
const getSuggestedCommitments = (t: (key: string) => string, topicTitle: string, locale: string): string[] => {
  return [
    t('lesson.commitment1') || `Orar sobre: ${topicTitle}`,
    t('lesson.commitment2') || 'Leer las escrituras relacionadas',
    t('lesson.commitment3') || 'Hablar con los misioneros sobre este tema'
  ];
};

interface TopicData {
  id: number;
  title: string;
  description: string;
  scriptureMain: string;
  scriptureRef: string;
  moreScriptures: string[];
}

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { locale, t } = useI18n();
  const { updateLessonProgress, markLessonCompleted } = useProgress();
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([1])); // Primer tema expandido por defecto
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<Record<string, boolean>>({});

  const lesson = LESSONS.find(l => l.id === lessonId);

  useEffect(() => {
    if (lessonId) {
      loadNotes();
    }
  }, [lessonId]);

  const loadNotes = () => {
    if (!lessonId) return;
    const i18nKey = LESSON_ID_TO_I18N_KEY[lessonId];
    const numTopics = TOPICS_PER_LESSON[lessonId] || 0;
    const loadedNotes: Record<string, string> = {};
    
    for (let i = 1; i <= numTopics; i++) {
      const note = NotesService.loadNote(lessonId, `topic${i}`);
      if (note) {
        loadedNotes[`topic${i}`] = note.content;
      }
    }
    
    setNotes(loadedNotes);
  };

  const saveNote = async (topicId: string, content: string) => {
    if (!lessonId) return;
    setSavingNotes(prev => ({ ...prev, [topicId]: true }));
    try {
      await NotesService.saveNote(lessonId, topicId, content);
      setNotes(prev => ({ ...prev, [topicId]: content }));
    } catch (error) {
      console.error('Error guardando nota:', error);
    } finally {
      setSavingNotes(prev => ({ ...prev, [topicId]: false }));
    }
  };

  const addCommitment = async (commitmentText: string) => {
    try {
      await CommitmentsService.addCommitment({
        title: commitmentText,
        category: 'spiritual',
        completed: false,
        source: 'lesson',
      });
      alert(t('lesson.commitmentAdded') || 'Compromiso agregado');
    } catch (error) {
      console.error('Error agregando compromiso:', error);
    }
  };

  if (!lesson) {
    return (
      <div className="lesson-detail">
        <div className="lesson-not-found">
          <h2>{t('common.error')}</h2>
          <Link to="/lessons">{t('back')}</Link>
        </div>
      </div>
    );
  }

  const i18nKey = LESSON_ID_TO_I18N_KEY[lessonId || ''];
  const numTopics = TOPICS_PER_LESSON[lessonId || ''] || 0;

  const getTopics = (): TopicData[] => {
    const topics: TopicData[] = [];
    
    if (i18nKey) {
      for (let i = 1; i <= numTopics; i++) {
        const topicKey = `${i18nKey}.topic${i}`;
        const title = t(topicKey);
        const desc = t(`${topicKey}.desc`);
        const scriptureMain = t(`${topicKey}.scriptureMain`);
        
        if (title && title !== topicKey) {
          const refMatch = scriptureMain.match(/\(([^)]+)\)/);
          const scriptureRef = refMatch ? refMatch[1] : '';
          
          const moreScriptures: string[] = [];
          for (let j = 0; j < 3; j++) {
            const moreKey = `${topicKey}.more.${j}`;
            const more = t(moreKey);
            if (more && more !== moreKey) {
              moreScriptures.push(more);
            }
          }
          
          topics.push({
            id: i,
            title,
            description: desc && desc !== `${topicKey}.desc` ? desc : '',
            scriptureMain: scriptureMain && scriptureMain !== `${topicKey}.scriptureMain` ? scriptureMain : '',
            scriptureRef,
            moreScriptures
          });
        }
      }
    }
    
    return topics;
  };

  const topics = getTopics();
  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const handleComplete = async () => {
    await markLessonCompleted(lesson.id);
  };

  return (
    <div className="lesson-detail">
      <div className="lesson-header">
        <Link to="/lessons" className="back-button">← {t('back')}</Link>
        <h1>{lesson.title[locale]}</h1>
        <p className="lesson-description">{lesson.description[locale]}</p>
      </div>
      <div className="lesson-content">
        {topics.map((topic) => {
          const isExpanded = expandedTopics.has(topic.id);
          const topicKey = `topic${topic.id}`;
          const topicNote = notes[topicKey] || '';
          const reflectionQuestions = getReflectionQuestions(t, locale);
          const suggestedCommitments = getSuggestedCommitments(t, topic.title, locale);

          return (
            <div key={topic.id} className="topic-card">
              <div className="topic-header" onClick={() => toggleTopic(topic.id)}>
                <h2 className="topic-title">
                  <span className="topic-number">{topic.id}</span>
                  {topic.title}
                </h2>
                <span className="topic-toggle">{isExpanded ? '▼' : '▶'}</span>
              </div>
              
              {isExpanded && (
                <div className="topic-content">
                  {/* Escritura Principal */}
                  {topic.scriptureMain && (
                    <div className="topic-section scripture-section">
                      <h3>{t('lesson.mainScripture') || 'Escritura Principal'}</h3>
                      <div className="scripture-block">
                        <div className="scripture-ref">{topic.scriptureRef}</div>
                        <div className="scripture-text">{topic.scriptureMain}</div>
                      </div>
                      {topic.moreScriptures.length > 0 && (
                        <div className="more-scriptures">
                          <h4>{t('lesson.moreScriptures') || 'Escrituras Adicionales'}</h4>
                          {topic.moreScriptures.map((scripture, idx) => (
                            <div key={idx} className="scripture-item-small">{scripture}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explicación Sencilla */}
                  {topic.description && (
                    <div className="topic-section explanation-section">
                      <h3>{t('lesson.simpleExplanation') || 'Explicación Sencilla'}</h3>
                      <p className="explanation-text">{topic.description}</p>
                    </div>
                  )}

                  {/* Para Pensar y Sentir */}
                  <div className="topic-section reflection-section">
                    <h3>{t('lesson.thinkAndFeel') || 'Para Pensar y Sentir'}</h3>
                    <ul className="reflection-questions">
                      {reflectionQuestions.map((question, idx) => (
                        <li key={idx}>{question}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Compromiso Sugerido */}
                  <div className="topic-section commitment-section">
                    <h3>{t('lesson.suggestedCommitment') || 'Compromiso Sugerido'}</h3>
                    <ul className="suggested-commitments">
                      {suggestedCommitments.map((commitment, idx) => (
                        <li key={idx}>
                          {commitment}
                          <button
                            className="add-commitment-btn"
                            onClick={() => addCommitment(commitment)}
                          >
                            {t('lesson.addCommitment') || 'Agregar'}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Notas Personales */}
                  <div className="topic-section notes-section">
                    <h3>{t('lesson.personalNotes') || 'Tus Notas'}</h3>
                    <textarea
                      className="notes-textarea"
                      placeholder={t('lesson.notesPlaceholder') || 'Escribe aquí lo que sentiste o tus preguntas...'}
                      value={topicNote}
                      onChange={(e) => setNotes(prev => ({ ...prev, [topicKey]: e.target.value }))}
                      rows={4}
                    />
                    <button
                      className="save-notes-btn"
                      onClick={() => saveNote(topicKey, topicNote)}
                      disabled={savingNotes[topicKey]}
                    >
                      {savingNotes[topicKey] ? t('common.saving') || 'Guardando...' : t('lesson.saveNote') || 'Guardar nota'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Quiz Section */}
        <div className="quiz-section">
          <h2>{t('testLearning') || 'Pon a Prueba tu Aprendizaje'}</h2>
          {lesson.quiz.map((q, index) => (
            <div key={index} className="quiz-item">
              <h3>{q.question[locale]}</h3>
              <div className="quiz-options">
                {q.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={`quiz-option ${optIndex === q.answerIndex ? 'correct' : ''}`}
                  >
                    {option[locale]}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleComplete} className="complete-button">
          {t('completion.finishLesson') || 'Finalizar Lección'}
        </button>
      </div>
    </div>
  );
};

export default LessonDetail;
