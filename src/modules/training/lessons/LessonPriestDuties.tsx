/**
 * LessonPriestDuties - Priest-1: Deberes del Presbítero
 * First Aaronic Priest lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonPriestDuties.css';

const LESSON_ID = 'priest-1';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender responsabilidades del Presbítero.',
  'Prepararse dignamente para bendecir/pasar la Santa Cena.',
  'Diferenciar función del Presbítero vs otros oficios.',
  'Aprender preparación espiritual antes de oficiar.',
  'Establecer hábitos de reverencia al oficiar.',
];

const SCRIPTURES = [
  { ref: 'DyC 20:46–52', text: 'Deberes del Presbítero: predicar, enseñar, bautizar, administrar la Santa Cena.' },
  { ref: 'DyC 13', text: 'Las llaves del ministerio de ángeles, del arrepentimiento y del bautismo.' },
  { ref: '3 Nefi 18:1–7', text: 'La Santa Cena: recordar al Salvador.' },
  { ref: 'DyC 84:33–39', text: 'Los que son ordenados son santificados por el Espíritu.' },
  { ref: 'Hebreos 5:4', text: 'Nadie toma para sí esta honra, sino el que es llamado.' },
];

const PRACTICE_ITEMS = [
  'Orar antes de la reunión para prepararse espiritualmente',
  'Repasar las oraciones sacramentales (DyC 20:77, 79)',
  'Llegar temprano para coordinar con quien preside',
  'Revisar postura y tono de voz al oficiar',
  'Coordinar con el que preside la reunión sacramental',
  'Breve autoevaluación post-reunión: ¿qué mejoraré?',
];

const REFLECTION_QUESTIONS = [
  '¿Qué hábito debo corregir para oficiar con más dignidad?',
  '¿Cómo me preparo mejor antes de bendecir o pasar la Santa Cena?',
  '¿Qué siento cuando sirvo en esta ordenanza?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonPriestDutiesProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPriestDuties({ onPracticeProgress }: LessonPriestDutiesProps): JSX.Element {
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
    <div className="tr-lesson-priest-duties">
      <section className="tr-lesson-priest-duties__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-priest-duties__intro">
          El Presbítero tiene responsabilidades especiales: bendecir y pasar la Santa Cena, bautizar (según delegación) y servir con dignidad. La ordenanza no es mecánica; la preparación previa cambia la experiencia del que recibe.
        </Text>
      </section>

      <section className="tr-lesson-priest-duties__section">
        <Heading as="h3" size="lg" className="tr-lesson-priest-duties__heading">Objetivos</Heading>
        <ul className="tr-lesson-priest-duties__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-priest-duties__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-priest-duties__section">
        <Heading as="h3" size="lg" className="tr-lesson-priest-duties__heading">Escrituras clave</Heading>
        <div className="tr-lesson-priest-duties__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-priest-duties__scripture-card">
              <Text as="p" size="base" className="tr-lesson-priest-duties__scripture-text">{s.text}</Text>
              <Text as="p" size="sm" color="secondary" className="tr-lesson-priest-duties__scripture-ref">— {s.ref}</Text>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-priest-duties__section">
        <div className="tr-lesson-priest-duties__callout">
          <Heading as="h4" size="base" className="tr-lesson-priest-duties__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-priest-duties__callout-list">
            <li><Text as="span" size="sm">La ordenanza no es "mecánica"; la dignidad importa.</Text></li>
            <li><Text as="span" size="sm">Preparación previa cambia la experiencia del que recibe.</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-priest-duties__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-priest-duties__heading">Práctica</Heading>
        <p className="tr-lesson-priest-duties__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-priest-duties__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-priest-duties__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-priest-duties__checklist-item ${checkedItems[i] ? 'tr-lesson-priest-duties__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-priest-duties__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-priest-duties__section">
        <Heading as="h3" size="lg" className="tr-lesson-priest-duties__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-priest-duties__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-priest-duties__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-priest-duties__reflection-item">
              <label htmlFor={`tr-lesson-priest-duties-reflection-${i}`} className="tr-lesson-priest-duties__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-priest-duties-reflection-${i}`}
                className="tr-lesson-priest-duties__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-priest-duties__section">
        <Card variant="outlined" padding="md" className="tr-lesson-priest-duties__action-card">
          <Heading as="h4" size="base" className="tr-lesson-priest-duties__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-priest-duties__action-text">
            Preparar la Santa Cena como si fuera para Cristo.
          </Text>
        </Card>
      </section>
    </div>
  );
}
