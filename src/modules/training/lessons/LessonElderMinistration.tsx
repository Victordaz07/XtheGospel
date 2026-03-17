/**
 * LessonElderMinistration - Elder-1: Deberes del Elder
 * First Melchizedek Elder lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonElderMinistration.css';

const LESSON_ID = 'elder-1';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender el rol del Elder en ministración.',
  'Aprender a dar bendiciones con fe y reverencia.',
  'Coordinar con líderes.',
  'Desarrollar hábitos de dignidad continua.',
  'Plan semanal de ministración.',
];

const SCRIPTURES = [
  { ref: 'DyC 20:38–45', text: 'Deberes del Elder: predicar, enseñar, bautizar, confirmar, administrar la Santa Cena.' },
  { ref: 'Santiago 5:14–15', text: 'Los ancianos de la iglesia oren sobre él, ungiéndole con aceite en el nombre del Señor.' },
  { ref: 'DyC 42:44', text: 'Los que tienen fe para ser sanados serán sanados.' },
  { ref: 'DyC 107:12', text: 'El oficio de Elder es administrar en las cosas espirituales.' },
  { ref: 'Marcos 16:18', text: 'Impondrán las manos sobre los enfermos y sanarán.' },
];

const PRACTICE_ITEMS = [
  'Preparación espiritual antes de oficiar (oración, dignidad)',
  'Pedir permiso antes de dar una bendición (a quien preside o a la familia)',
  'Usar palabras claras y reverentes al bendecir',
  'Coordinar con líderes para visitas de ministración',
  'Hacer seguimiento después de una bendición o visita',
  'Anotar en un diario: una experiencia de ministración esta semana',
];

const REFLECTION_QUESTIONS = [
  '¿Qué me frena al ministrar o dar bendiciones?',
  '¿Cómo puedo coordinar mejor con líderes y compañeros?',
  '¿Cómo puedo crecer en fe para bendecir?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonElderMinistrationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonElderMinistration({ onPracticeProgress }: LessonElderMinistrationProps): JSX.Element {
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
    <div className="tr-lesson-elder-min">
      <section className="tr-lesson-elder-min__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-elder-min__intro">
          El Elder ministra, bendice con fe y reverencia, y coordina con líderes. La fe del que bendice importa, pero también la del que recibe. Ministrar es constancia, no eventos aislados.
        </Text>
      </section>

      <section className="tr-lesson-elder-min__section">
        <Heading as="h3" size="lg" className="tr-lesson-elder-min__heading">Objetivos</Heading>
        <ul className="tr-lesson-elder-min__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-elder-min__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-elder-min__section">
        <Heading as="h3" size="lg" className="tr-lesson-elder-min__heading">Escrituras clave</Heading>
        <div className="tr-lesson-elder-min__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-elder-min__scripture-card">
              <Text as="p" size="base" className="tr-lesson-elder-min__scripture-text">{s.text}</Text>
              <div className="tr-lesson-elder-min__scripture-ref"><ScriptureReferenceCard reference={s.ref} /></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-elder-min__section">
        <div className="tr-lesson-elder-min__callout">
          <Heading as="h4" size="base" className="tr-lesson-elder-min__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-elder-min__callout-list">
            <li><Text as="span" size="sm">La fe del que bendice importa, pero también la del que recibe.</Text></li>
            <li><Text as="span" size="sm">Ministrar es constancia, no eventos aislados.</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-elder-min__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-elder-min__heading">Práctica</Heading>
        <p className="tr-lesson-elder-min__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-elder-min__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-elder-min__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-elder-min__checklist-item ${checkedItems[i] ? 'tr-lesson-elder-min__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-elder-min__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-elder-min__section">
        <Heading as="h3" size="lg" className="tr-lesson-elder-min__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-elder-min__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-elder-min__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-elder-min__reflection-item">
              <label htmlFor={`tr-lesson-elder-min-reflection-${i}`} className="tr-lesson-elder-min__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-elder-min-reflection-${i}`}
                className="tr-lesson-elder-min__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-elder-min__section">
        <Card variant="outlined" padding="md" className="tr-lesson-elder-min__action-card">
          <Heading as="h4" size="base" className="tr-lesson-elder-min__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-elder-min__action-text">
            Una visita de ministración con propósito.
          </Text>
        </Card>
      </section>
    </div>
  );
}
