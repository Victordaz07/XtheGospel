/**
 * LessonHighPriestShepherding - High Priest-2: Cuidado del rebaño
 * Second Melchizedek High Priest lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonHighPriestShepherding.css';

const LESSON_ID = 'high-priest-2';
const STORAGE_KEY_PRACTICE = 'training:lesson:high-priest-2:practice';
const STORAGE_KEY_REFLECTIONS = 'training:lesson:high-priest-2:reflections';

const OBJECTIVES = [
  'Aprender el enfoque "pastoral" del sacerdocio: cuidar almas, no números.',
  'Fortalecer unidad y paz en la Iglesia local (evitar chismes/contención).',
  'Entender cómo dar consejo con mansedumbre y claridad.',
  'Desarrollar discernimiento y prudencia (qué decir, cuándo, y a quién).',
  'Crear un plan de servicio espiritual de 30 días (simple pero real).',
];

const SCRIPTURES = [
  { ref: 'Juan 21:15–17', text: 'Apacienta mis ovejas.' },
  { ref: 'Mosíah 18:8–10', text: 'Llorar con los que lloran, consolar a los que necesitan consuelo.' },
  { ref: 'DyC 121:43–44', text: 'Corrección seguida de amor y confianza.' },
  { ref: 'Efesios 4:29', text: 'Hablar para edificar, no corromper.' },
  { ref: 'Alma 7:11–12', text: 'Cristo comprende para socorrer.' },
];

const PRACTICE_ITEMS = [
  'Identificar 1 fuente de contención que tú puedas cortar (chisme, sarcasmo, crítica)',
  'Practicar una frase de paz: "hablemos para edificar, no para dividir"',
  'Visitar o llamar a 1 persona que esté debilitándose (con respeto, sin presión)',
  'Preparar 1 consejo simple (1 idea + 1 escritura + 1 invitación)',
  'Hacer un servicio "invisible" (nadie tiene que saber)',
  'Plan de 30 días: escoger 1 hábito de cuidado (contacto semanal, oración diaria por alguien, etc.)',
];

const REFLECTION_QUESTIONS = [
  '¿Qué me hace reaccionar con orgullo cuando aconsejo?',
  '¿Cómo puedo ser más prudente con mis palabras?',
  '¿A quién debo cuidar sin juzgar?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonHighPriestShepherdingProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonHighPriestShepherding({ onPracticeProgress }: LessonHighPriestShepherdingProps): JSX.Element {
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
    <div className="tr-lesson-hp-shepherd">
      <section className="tr-lesson-hp-shepherd__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-hp-shepherd__intro">
          El Sumo Sacerdote cuida almas, no números. Muchas crisis en el barrio no son doctrinales: son relacionales (orgullo, malentendidos, cansancio). Un buen líder espiritual no “gana discusiones”; gana confianza.
        </Text>
      </section>

      <section className="tr-lesson-hp-shepherd__section">
        <Heading as="h3" size="lg" className="tr-lesson-hp-shepherd__heading">Objetivos</Heading>
        <ul className="tr-lesson-hp-shepherd__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-hp-shepherd__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-hp-shepherd__section">
        <Heading as="h3" size="lg" className="tr-lesson-hp-shepherd__heading">Escrituras clave</Heading>
        <div className="tr-lesson-hp-shepherd__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-hp-shepherd__scripture-card">
              <Text as="p" size="base" className="tr-lesson-hp-shepherd__scripture-text">{s.text}</Text>
              <div className="tr-lesson-hp-shepherd__scripture-ref"><ScriptureReferenceCard reference={s.ref} /></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-hp-shepherd__section">
        <div className="tr-lesson-hp-shepherd__callout">
          <Heading as="h4" size="base" className="tr-lesson-hp-shepherd__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-hp-shepherd__callout-list">
            <li><Text as="span" size="sm">Muchas crisis en el barrio no son doctrinales: son relacionales (orgullo, malentendidos, cansancio).</Text></li>
            <li><Text as="span" size="sm">Un buen líder espiritual no “gana discusiones”; gana confianza.</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-hp-shepherd__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-hp-shepherd__heading">Práctica</Heading>
        <p className="tr-lesson-hp-shepherd__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-hp-shepherd__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-hp-shepherd__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-hp-shepherd__checklist-item ${checkedItems[i] ? 'tr-lesson-hp-shepherd__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-hp-shepherd__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-hp-shepherd__section">
        <Heading as="h3" size="lg" className="tr-lesson-hp-shepherd__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-hp-shepherd__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-hp-shepherd__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-hp-shepherd__reflection-item">
              <label htmlFor={`tr-lesson-hp-shepherd-reflection-${i}`} className="tr-lesson-hp-shepherd__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-hp-shepherd-reflection-${i}`}
                className="tr-lesson-hp-shepherd__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-hp-shepherd__section">
        <Card variant="outlined" padding="md" className="tr-lesson-hp-shepherd__action-card">
          <Heading as="h4" size="base" className="tr-lesson-hp-shepherd__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-hp-shepherd__action-text">
            Unidad primero: durante 7 días, elimina 1 hábito que cause contención y reemplázalo por 1 hábito que edifique.
          </Text>
        </Card>
      </section>
    </div>
  );
}
