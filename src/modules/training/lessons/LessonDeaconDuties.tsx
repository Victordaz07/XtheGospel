/**
 * LessonDeaconDuties - Deacon-1: Deberes del Diácono
 * First Aaronic Deacon lesson for Training module.
 * Same structure as core lessons.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonDeaconDuties.css';

const LESSON_ID = 'deacon-1';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender el propósito del oficio de diácono.',
  'Identificar deberes clave de un diácono en el barrio.',
  'Aprender reverencia y conducta apropiada en la reunión sacramental.',
  'Entender por qué "ser diácono" es servir, no "tener un puesto".',
  'Establecer un plan simple semanal para cumplir deberes con dignidad.',
];

const SCRIPTURES = [
  { ref: 'DyC 20:59', text: 'Velar por la iglesia... y ser con ella.' },
  { ref: 'DyC 84:111', text: 'Los oficios menores... para la ministración.' },
  { ref: 'Mosíah 2:17', text: 'Al servicio de vuestros semejantes...' },
  { ref: 'DyC 107:85–87', text: 'Deberes del diácono: ayudar y ministrar.' },
  { ref: '1 Timoteo 3:8–10', text: 'Dignidad y buen testimonio.' },
];

const PRACTICE_ITEMS = [
  'Llegar 10 minutos antes y sentarme listo sin distracciones (1 domingo)',
  'Revisar mi apariencia: ropa limpia, ordenada, actitud tranquila',
  'Identificar 1 cosa que puedo hacer para ayudar a los líderes (orden/sillas/himnarios/puertas)',
  'Durante la reunión: no hablar, no jugar con el celular, ojos al frente',
  'Anotar una cosa del mensaje que me ayude a mejorar esta semana',
  'Hacer un acto de servicio sencillo en casa (sin que me lo pidan)',
];

const REFLECTION_QUESTIONS = [
  '¿Qué significa para mí "representar al Salvador" en un oficio?',
  '¿Qué me distrae más en la reunión? ¿Qué haré para controlarlo?',
  '¿A quién puedo servir esta semana de forma simple?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(
    Object.entries(parsed).map(([k, v]) => [Number(k), v])
  );
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(
    Object.entries(parsed).map(([k, v]) => [Number(k), v])
  );
}

export interface LessonDeaconDutiesProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonDeaconDuties({ onPracticeProgress }: LessonDeaconDutiesProps): JSX.Element {
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
    <div className="tr-lesson-deacon">
      <section className="tr-lesson-deacon__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-deacon__intro">
          El oficio de diácono es el primer paso en el sacerdocio Aarónico. En esta lección aprenderás los deberes clave, la reverencia y la actitud de servicio que caracterizan a un diácono digno.
        </Text>
      </section>

      <section className="tr-lesson-deacon__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-deacon__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-deacon__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-deacon__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon__heading">
          Los deberes del diácono en breve
        </Heading>
        <Text as="p" size="base" color="secondary">
          Un diácono ayuda al obispo y a los líderes del barrio. Sus deberes incluyen asistir en reuniones, preparar el salón, repartir la Santa Cena, y servir en orden. Ser diácono no es "tener un puesto": es representar al Salvador mediante el servicio humilde y la reverencia.
        </Text>
      </section>

      <section className="tr-lesson-deacon__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-deacon__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-deacon__scripture-card">
              <Text as="p" size="base" className="tr-lesson-deacon__scripture-text">
                {s.text}
              </Text>
              <div className="tr-lesson-deacon__scripture-ref">
                <ScriptureReferenceCard reference={s.ref} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-deacon__section">
        <div className="tr-lesson-deacon__callout">
          <Heading as="h4" size="base" className="tr-lesson-deacon__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-deacon__callout-list">
            <li>
              <Text as="span" size="sm">
                Un diácono no "solo pasa la Santa Cena": representa un ministerio de ayuda y orden en la Iglesia.
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                La reverencia es parte del deber: no es "formalidad", es respeto por convenios.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-deacon__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-deacon__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-deacon__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-deacon__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-deacon__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-deacon__checklist-item ${checkedItems[i] ? 'tr-lesson-deacon__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-deacon__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-deacon__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-deacon__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-deacon__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-deacon__reflection-item">
              <label
                htmlFor={`tr-lesson-deacon-reflection-${i}`}
                className="tr-lesson-deacon__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-deacon-reflection-${i}`}
                className="tr-lesson-deacon__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-deacon__section">
        <Card variant="outlined" padding="md" className="tr-lesson-deacon__action-card">
          <Heading as="h4" size="base" className="tr-lesson-deacon__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-deacon__action-text">
            Plan del domingo: elige una cosa concreta para prepararte mejor (ej.: dormir temprano sábado, ropa lista, leer 1 escritura antes de ir).
          </Text>
        </Card>
      </section>
    </div>
  );
}
