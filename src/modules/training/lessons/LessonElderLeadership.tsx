/**
 * LessonElderLeadership - Elder-2: Liderazgo servicial
 * Second Melchizedek Elder lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonElderLeadership.css';

const LESSON_ID = 'elder-2';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Liderar sin dominar.',
  'Apoyar a los líderes del barrio.',
  'Acompañar a los débiles.',
  'Cuidar a la familia espiritualmente.',
  'Crear un plan personal de liderazgo servicial.',
];

const SCRIPTURES = [
  { ref: 'DyC 121:34–46', text: 'Solo por persuasión, longanimidad, benignidad, amor sincero.' },
  { ref: 'Juan 13:14–15', text: 'Si yo, el Señor y el Maestro, os he lavado los pies, vosotros también debéis lavaros los pies unos a otros.' },
  { ref: 'DyC 107:99–100', text: 'Los que presiden deben ser servidos antes que servir.' },
  { ref: 'Alma 17:11', text: 'El Señor los consoló y les dio fuerza.' },
  { ref: 'DyC 58:27', text: 'Ser anxiously engaged en una buena causa.' },
];

const PRACTICE_ITEMS = [
  'Hacer un acto de servicio oculto (sin que nadie lo sepa)',
  'Dar un consejo con humildad cuando me lo pidan',
  'Establecer un plan espiritual familiar (oración, lectura, noche de hogar)',
  'Coordinar con líderes para saber cómo apoyar',
  'Ofrecer mentoría 1 a 1 a alguien más joven o nuevo',
  'Revisión semanal: ¿qué hice bien y qué mejoraré?',
];

const REFLECTION_QUESTIONS = [
  '¿Cómo sirvo hoy? ¿Qué cambiaría?',
  '¿Dónde debo crecer como líder servicial?',
  '¿A quién puedo mentorear o acompañar?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonElderLeadershipProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonElderLeadership({ onPracticeProgress }: LessonElderLeadershipProps): JSX.Element {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(loadPractice);
  const [reflections, setReflections] = useState<Record<number, string>>(loadReflections);
  const totalPractice = PRACTICE_ITEMS.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  useEffect(() => {
    setLessonStorage(STORAGE_KEY_PRACTICE, checkedItems);
    onPracticeProgress?.(checkedCount, totalPractice);
  }, [checkedItems, checkedCount, totalPractice, onPracticeProgress]);

  useEffect(() => {
    setLessonStorageDebounced(STORAGE_KEY_REFLECTIONS, reflections, 400);
    return () => flushLessonStorageDebounced(STORAGE_KEY_REFLECTIONS);
  }, [reflections]);

  const toggleCheck = useCallback((idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  const setReflection = useCallback((idx: number, value: string) => {
    setReflections((prev) => ({ ...prev, [idx]: value }));
  }, []);

  return (
    <div className="tr-lesson-elder-lead">
      <section className="tr-lesson-elder-lead__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-elder-lead__intro">
          Liderazgo en el sacerdocio es influencia moral, no cargo. El Elder lidera sin dominar, apoya a los líderes, acompaña a los débiles y cuida a su familia. La constancia vence al carisma.
        </Text>
      </section>

      <section className="tr-lesson-elder-lead__section">
        <Heading as="h3" size="lg" className="tr-lesson-elder-lead__heading">Objetivos</Heading>
        <ul className="tr-lesson-elder-lead__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-elder-lead__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-elder-lead__section">
        <Heading as="h3" size="lg" className="tr-lesson-elder-lead__heading">Escrituras clave</Heading>
        <div className="tr-lesson-elder-lead__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-elder-lead__scripture-card">
              <Text as="p" size="base" className="tr-lesson-elder-lead__scripture-text">{s.text}</Text>
              <div className="tr-lesson-elder-lead__scripture-ref"><ScriptureReferenceCard reference={s.ref} /></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-elder-lead__section">
        <div className="tr-lesson-elder-lead__callout">
          <Heading as="h4" size="base" className="tr-lesson-elder-lead__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-elder-lead__callout-list">
            <li><Text as="span" size="sm">Liderazgo en el sacerdocio es influencia moral, no cargo.</Text></li>
            <li><Text as="span" size="sm">La constancia vence al carisma.</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-elder-lead__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-elder-lead__heading">Práctica</Heading>
        <p className="tr-lesson-elder-lead__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-elder-lead__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-elder-lead__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-elder-lead__checklist-item ${checkedItems[i] ? 'tr-lesson-elder-lead__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-elder-lead__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-elder-lead__section">
        <Heading as="h3" size="lg" className="tr-lesson-elder-lead__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-elder-lead__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-elder-lead__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-elder-lead__reflection-item">
              <label htmlFor={`tr-lesson-elder-lead-reflection-${i}`} className="tr-lesson-elder-lead__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-elder-lead-reflection-${i}`}
                className="tr-lesson-elder-lead__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-elder-lead__section">
        <Card variant="outlined" padding="md" className="tr-lesson-elder-lead__action-card">
          <Heading as="h4" size="base" className="tr-lesson-elder-lead__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-elder-lead__action-text">
            Elegir a 1 persona para acompañar por 30 días.
          </Text>
        </Card>
      </section>
    </div>
  );
}
