import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { ScriptureReferenceCard } from '../../ui/components';
import { missionarySectionsByLesson } from '../../../data/missionaryGuideSections';
import type { LessonId } from '../../../data/missionaryGuideLessons';
import './Page.css';
import './MissionaryLessonDetail.css';

const MissionaryLessonDetailFull: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!lessonId) {
    return (
      <div className="page">
        <div className="page-header">
          <Link to="/lessons" className="back-button">← {t('back')}</Link>
          <h1>{t('common.error')}</h1>
        </div>
      </div>
    );
  }

  // Convertir "1" a "lesson_1_restoration", "Lesson1" a "lesson_1_restoration", etc.
  let normalizedLessonId: LessonId;
  if (lessonId.match(/^\d+$/)) {
    const num = parseInt(lessonId);
    const lessonMap: Record<number, LessonId> = {
      1: 'lesson_1_restoration',
      2: 'lesson_2_plan_of_salvation',
      3: 'lesson_3_gospel_of_jesus_christ',
      4: 'lesson_4_commandments',
      5: 'lesson_5_ordinances_and_covenants',
      6: 'lesson_6_laws_and_ordinances',
    };
    normalizedLessonId = lessonMap[num] || 'lesson_1_restoration';
  } else if (lessonId.startsWith('Lesson')) {
    const num = parseInt(lessonId.replace('Lesson', ''));
    const lessonMap: Record<number, LessonId> = {
      1: 'lesson_1_restoration',
      2: 'lesson_2_plan_of_salvation',
      3: 'lesson_3_gospel_of_jesus_christ',
      4: 'lesson_4_commandments',
      5: 'lesson_5_ordinances_and_covenants',
      6: 'lesson_6_laws_and_ordinances',
    };
    normalizedLessonId = lessonMap[num] || 'lesson_1_restoration';
  } else {
    normalizedLessonId = lessonId as LessonId;
  }

  const sections = missionarySectionsByLesson[normalizedLessonId] || [];
  const lessonTitle = t(`lesson${lessonId.match(/^\d+$/) ? lessonId : lessonId.replace(/[^0-9]/g, '')}.title`);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Función para obtener todas las preguntas de una sección
  const getQuestions = (section: any) => {
    const questions: string[] = [];
    if (section.questionsKeys) {
      section.questionsKeys.forEach((key: string) => {
        const question = t(key);
        if (question && question !== key) {
          questions.push(question);
        }
      });
    }
    // También buscar preguntas en formato numérico
    for (let i = 0; i < 10; i++) {
      const question = t(`${section.titleKey}.questions.${i}`);
      if (question && question !== `${section.titleKey}.questions.${i}`) {
        questions.push(question);
      }
    }
    return questions;
  };

  // Función para obtener todos los ejemplos de una sección
  const getExamples = (section: any) => {
    const examples: Array<{ title: string; story: string }> = [];
    for (let i = 0; i < 5; i++) {
      const title = t(`${section.titleKey}.examples.${i}.title`);
      const story = t(`${section.titleKey}.examples.${i}.story`);
      if (title && title !== `${section.titleKey}.examples.${i}.title`) {
        examples.push({ title, story });
      }
    }
    return examples;
  };

  // Función para obtener todos los diálogos de una sección
  const getDialogues = (section: any) => {
    const dialogues: Array<{ title: string; lines: string[] }> = [];
    for (let i = 0; i < 5; i++) {
      const title = t(`${section.titleKey}.dialogues.${i}.title`);
      const lines: string[] = [];
      for (let j = 0; j < 10; j++) {
        const line = t(`${section.titleKey}.dialogues.${i}.lines.${j}`);
        if (line && line !== `${section.titleKey}.dialogues.${i}.lines.${j}`) {
          lines.push(line);
        }
      }
      if (title && title !== `${section.titleKey}.dialogues.${i}.title` && lines.length > 0) {
        dialogues.push({ title, lines });
      }
    }
    return dialogues;
  };

  // Función para obtener todas las objeciones de una sección
  const getObjections = (section: any) => {
    const objections: Array<{ objection: string; answer: string }> = [];
    // Intentar formato directo
    for (let i = 0; i < 10; i++) {
      const objection = t(`${section.titleKey}.objections.${i}.objection`);
      const answer = t(`${section.titleKey}.objections.${i}.answer`);
      if (objection && objection !== `${section.titleKey}.objections.${i}.objection`) {
        objections.push({ objection, answer });
      }
    }
    // Intentar formato nested
    if (objections.length === 0) {
      for (let i = 0; i < 10; i++) {
        const objection = t(`${section.titleKey}.objections.objections.${i}.objection`);
        const answer = t(`${section.titleKey}.objections.objections.${i}.answer`);
        if (objection && objection !== `${section.titleKey}.objections.objections.${i}.objection`) {
          objections.push({ objection, answer });
        }
      }
    }
    return objections;
  };

  // Función para obtener escrituras adicionales
  const getMoreScriptures = (section: any) => {
    const scriptures: Array<{ ref: string; text: string; explanation: string }> = [];
    for (let i = 0; i < 10; i++) {
      const ref = t(`${section.titleKey}.more.${i}.ref`);
      const text = t(`${section.titleKey}.more.${i}.text`);
      const explanation = t(`${section.titleKey}.more.${i}.explanation`);
      if (ref && ref !== `${section.titleKey}.more.${i}.ref`) {
        scriptures.push({ ref, text, explanation });
      }
    }
    return scriptures;
  };

  if (sections.length === 0) {
    return (
      <div className="page">
        <div className="page-header">
          <Link to="/lessons" className="back-button">← {t('back')}</Link>
          <h1>{t('common.lessonNotFound')}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page missionary-guide-page">
      <div className="missionary-lesson-header">
        <Link to="/lessons" className="back-button">← {t('back')}</Link>
        <h1>{lessonTitle}</h1>
      </div>

      <div className="missionary-lesson-content">
        {sections.map((section, sectionIndex) => {
          const title = t(section.titleKey);
          const goal = section.goalKey ? t(section.goalKey) : '';
          const desc = section.descKey ? t(section.descKey) : '';
          const scriptureRef = section.scriptureRefKey ? t(section.scriptureRefKey) : '';
          const scriptureMain = section.scriptureMainKey ? t(section.scriptureMainKey) : '';
          const scriptureExplanation = section.scriptureExplanationKey ? t(section.scriptureExplanationKey) : '';
          
          const questions = getQuestions(section);
          const examples = getExamples(section);
          const dialogues = getDialogues(section);
          const objections = getObjections(section);
          const moreScriptures = getMoreScriptures(section);

          return (
            <section key={section.id} className="study-section full-section">
              <h2 className="section-title">
                {sectionIndex + 1}. {title}
              </h2>

              {goal && (
                <div className="section-goal">
                  <strong>🎯 Objetivo:</strong> {goal}
                </div>
              )}

              {desc && (
                <div className="section-content">
                  <p>{desc}</p>
                </div>
              )}

              {/* Escritura Principal */}
              {scriptureRef && scriptureMain && (
                <div className="scripture-block">
                  <h3 className="scripture-title">📖 Escritura Principal</h3>
                  <div className="scripture-reference"><ScriptureReferenceCard reference={scriptureRef} /></div>
                  <div className="scripture-text">"{scriptureMain}"</div>
                  {scriptureExplanation && (
                    <div className="scripture-explanation">
                      <strong>Explicación:</strong> {scriptureExplanation}
                    </div>
                  )}
                </div>
              )}

              {/* Escrituras Adicionales */}
              {moreScriptures.length > 0 && (
                <div className="expandable-section">
                  <button
                    className="expandable-header"
                    onClick={() => toggleSection(`${section.id}-more-scriptures`)}
                  >
                    <h3 className="scripture-title">📚 Escrituras Adicionales</h3>
                    <span>{expandedSections[`${section.id}-more-scriptures`] ? '▼' : '▶'}</span>
                  </button>
                  {expandedSections[`${section.id}-more-scriptures`] && (
                    <div className="expandable-content">
                      {moreScriptures.map((scripture, idx) => (
                        <div key={idx} className="scripture-block">
                          <div className="scripture-reference"><ScriptureReferenceCard reference={scripture.ref} /></div>
                          {scripture.text && <div className="scripture-text">"{scripture.text}"</div>}
                          {scripture.explanation && (
                            <div className="scripture-explanation">
                              <strong>Explicación:</strong> {scripture.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preguntas Inspiradas */}
              {questions.length > 0 && (
                <div className="expandable-section">
                  <button
                    className="expandable-header"
                    onClick={() => toggleSection(`${section.id}-questions`)}
                  >
                    <h3 className="scripture-title">💭 Preguntas Inspiradas</h3>
                    <span>{expandedSections[`${section.id}-questions`] ? '▼' : '▶'}</span>
                  </button>
                  {expandedSections[`${section.id}-questions`] && (
                    <div className="expandable-content">
                      <ul className="questions-list">
                        {questions.map((question, idx) => (
                          <li key={idx} className="question-item">
                            <span className="question-number">{idx + 1}</span>
                            <span className="question-text">{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Ejemplos */}
              {examples.length > 0 && (
                <div className="expandable-section">
                  <button
                    className="expandable-header"
                    onClick={() => toggleSection(`${section.id}-examples`)}
                  >
                    <h3 className="scripture-title">📖 Ejemplos Reales</h3>
                    <span>{expandedSections[`${section.id}-examples`] ? '▼' : '▶'}</span>
                  </button>
                  {expandedSections[`${section.id}-examples`] && (
                    <div className="expandable-content">
                      {examples.map((example, idx) => (
                        <div key={idx} className="example-block">
                          <h4 className="example-title">{example.title}</h4>
                          <p className="example-story">{example.story}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Diálogos */}
              {dialogues.length > 0 && (
                <div className="expandable-section">
                  <button
                    className="expandable-header"
                    onClick={() => toggleSection(`${section.id}-dialogues`)}
                  >
                    <h3 className="scripture-title">💬 Diálogos Modelo</h3>
                    <span>{expandedSections[`${section.id}-dialogues`] ? '▼' : '▶'}</span>
                  </button>
                  {expandedSections[`${section.id}-dialogues`] && (
                    <div className="expandable-content">
                      {dialogues.map((dialogue, idx) => (
                        <div key={idx} className="dialogue-block">
                          <h4 className="dialogue-title">{dialogue.title}</h4>
                          {dialogue.lines.map((line, lineIdx) => (
                            <div key={lineIdx} className="dialogue-line">{line}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Objeciones */}
              {objections.length > 0 && (
                <div className="expandable-section">
                  <button
                    className="expandable-header"
                    onClick={() => toggleSection(`${section.id}-objections`)}
                  >
                    <h3 className="scripture-title">❓ Objeciones Comunes</h3>
                    <span>{expandedSections[`${section.id}-objections`] ? '▼' : '▶'}</span>
                  </button>
                  {expandedSections[`${section.id}-objections`] && (
                    <div className="expandable-content">
                      {objections.map((obj, idx) => (
                        <div key={idx} className="objection-block">
                          <div className="objection-question">❓ {obj.objection}</div>
                          <div className="objection-answer">
                            <strong>Respuesta:</strong> {obj.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default MissionaryLessonDetailFull;

