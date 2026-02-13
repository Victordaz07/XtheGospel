/**
 * LessonTeacherReverenceService - Teacher-2: Servicio y reverencia como Maestro
 * Second Aaronic Teacher lesson for Training module.
 * Same structure as Teacher-1 and other lessons.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonTeacherReverenceService.css';

const LESSON_ID = 'teacher-2';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender cómo el Maestro promueve reverencia sin conflicto ni vergüenza.',
  'Aprender a apoyar a líderes (obispado/quórum) con iniciativa ordenada.',
  'Practicar ministración simple: notar, acercarse, invitar, acompañar.',
  'Mejorar trabajo en equipo con diáconos/sacerdotes (sin competir).',
  'Establecer un plan semanal: reverencia + servicio + fortalecimiento.',
];

const SCRIPTURES = [
  { ref: 'DyC 121:43–44', text: 'Reprensión cuando sea necesario, luego amor, sin hipocresía.' },
  { ref: 'Moroni 6:5–6', text: 'Reuniones para orar, exhortar, fortalecer.' },
  { ref: 'DyC 20:53–54', text: 'Velar por la iglesia, fortalecer a los miembros.' },
  { ref: 'Mateo 5:16', text: 'Que vean vuestras buenas obras (sin presumir).' },
  { ref: 'Filipenses 2:3–4', text: 'Humildad, considerar a otros.' },
];

const PRACTICE_ITEMS = [
  'Antes de la reunión: escoger un "punto de enfoque" (ej.: escuchar 1 idea del discurso y anotarla)',
  'Reverencia sin pleito: practicar 2 frases suaves para invitar al orden (ej.: "vamos a ayudar con reverencia", "te acompaño un momento")',
  'Apoyo a líderes: preguntar a un líder "¿en qué puedo ayudar hoy?" y hacerlo',
  'Ministración simple: hablar con 1 persona (nuevo, solo, joven tímido) y hacer una invitación breve ("qué bueno verte", "siéntate aquí", "¿cómo te fue?")',
  'Trabajo en equipo: ayudar a un diácono o sacerdote a completar su tarea sin regañarlo',
  'Evaluación personal: escribir 1 cosa que hice bien y 1 cosa que mejoraré el próximo domingo',
];

const REFLECTION_QUESTIONS = [
  '¿Qué distracciones me roban la reverencia? ¿Cómo las cortaré?',
  '¿A quién puedo fortalecer esta semana con un gesto simple?',
  '¿Cómo puedo corregir sin orgullo y servir sin esperar reconocimiento?',
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

export interface LessonTeacherReverenceServiceProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonTeacherReverenceService({ onPracticeProgress }: LessonTeacherReverenceServiceProps): JSX.Element {
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
    <div className="tr-lesson-teacher-rev">
      <section className="tr-lesson-teacher-rev__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-teacher-rev__intro">
          Esta lección se enfoca en la ejecución real: reverencia, apoyo a líderes, ministración sencilla, y cómo un Maestro “sostiene” el orden espiritual sin ponerse intenso.
        </Text>
      </section>

      <section className="tr-lesson-teacher-rev__section">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-rev__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-teacher-rev__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-teacher-rev__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-teacher-rev__section">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-rev__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-teacher-rev__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-teacher-rev__scripture-card">
              <Text as="p" size="base" className="tr-lesson-teacher-rev__scripture-text">
                {s.text}
              </Text>
              <Text as="p" size="sm" color="secondary" className="tr-lesson-teacher-rev__scripture-ref">
                — {s.ref}
              </Text>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-teacher-rev__section">
        <div className="tr-lesson-teacher-rev__callout">
          <Heading as="h4" size="base" className="tr-lesson-teacher-rev__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-teacher-rev__callout-list">
            <li>
              <Text as="span" size="sm">
                Reverencia no es "estar callado por miedo": es enfocar el corazón en Cristo y en los convenios.
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                Un Maestro fuerte no es el que manda: es el que sirve y mejora el ambiente donde otros pueden adorar.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-teacher-rev__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-rev__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-teacher-rev__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-teacher-rev__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-teacher-rev__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-teacher-rev__checklist-item ${checkedItems[i] ? 'tr-lesson-teacher-rev__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-teacher-rev__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-teacher-rev__section">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-rev__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-teacher-rev__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-teacher-rev__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-teacher-rev__reflection-item">
              <label
                htmlFor={`tr-lesson-teacher-rev-reflection-${i}`}
                className="tr-lesson-teacher-rev__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-teacher-rev-reflection-${i}`}
                className="tr-lesson-teacher-rev__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-teacher-rev__section">
        <Card variant="outlined" padding="md" className="tr-lesson-teacher-rev__action-card">
          <Heading as="h4" size="base" className="tr-lesson-teacher-rev__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-teacher-rev__action-text">
            Domingo con intención: elige 1 hábito fijo para cada domingo (ej.: llegar temprano, orar antes, sentarme adelante, apuntar 1 idea y aplicarla).
          </Text>
        </Card>
      </section>
    </div>
  );
}
