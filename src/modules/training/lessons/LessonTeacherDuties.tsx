/**
 * LessonTeacherDuties - Teacher-1: Deberes del Maestro
 * First Aaronic Teacher lesson for Training module.
 * Same structure as deacon lessons and core lessons.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonTeacherDuties.css';

const LESSON_ID = 'teacher-1';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender el propósito del oficio de Maestro en el Sacerdocio Aarónico.',
  'Identificar deberes clave: fortalecer, velar, y ayudar a que haya reverencia y orden.',
  'Aprender a corregir con amor (sin humillar ni discutir).',
  'Practicar preparación espiritual para servir (oración, dignidad, ejemplo).',
  'Crear un plan semanal simple para cumplir deberes (casa + Iglesia).',
];

const SCRIPTURES = [
  { ref: 'DyC 20:53–59', text: 'Deberes de maestros y diáconos: velar por la Iglesia, estar con ella.' },
  { ref: 'DyC 107:86', text: 'Deberes del Maestro: ayudar y ministrar.' },
  { ref: 'Moroni 6:4', text: 'Fortalecer a los miembros y nutrirlos con la palabra.' },
  { ref: 'Gálatas 6:1', text: 'Restaurar al tal con espíritu de mansedumbre.' },
  { ref: 'DyC 121:41–42', text: 'Persuasión, longanimidad, benignidad, amor sincero.' },
];

const PRACTICE_ITEMS = [
  'Preparación: orar 1 minuto antes de la reunión para pedir reverencia y caridad',
  'Observar sin criticar: identificar 1 necesidad real (alguien solo, alguien nuevo, alguien distraído)',
  'Hacer 1 acto de apoyo: saludar, ayudar a ubicar himno, acomodar sillas, guiar con respeto',
  'Practicar corrección con amor: escribir 2 frases que usarías sin humillar ("Ey bro, vamos a ayudar con reverencia", "Te acompaño afuera un momento")',
  'Servicio en casa: hacer 1 responsabilidad sin que te lo pidan (con buena actitud)',
  '"Mini-reporte personal": al final del día, escribir 1 línea: "Hoy ayudé a ____ y aprendí ____."',
];

const REFLECTION_QUESTIONS = [
  '¿Qué significa para mí "velar por la Iglesia" sin sentirme "policía"?',
  '¿Cómo reacciono cuando alguien me corrige? ¿Puedo corregir mejor de lo que me gusta que me corrijan?',
  '¿Qué haré esta semana para ser un ejemplo de reverencia y servicio?',
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

export interface LessonTeacherDutiesProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonTeacherDuties({ onPracticeProgress }: LessonTeacherDutiesProps): JSX.Element {
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
    <div className="tr-lesson-teacher-duties">
      <section className="tr-lesson-teacher-duties__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-teacher-duties__intro">
          El Maestro no es "teacher de clase", sino el oficio del Sacerdocio Aarónico: ayudar a los miembros a vivir el Evangelio, fortalecer, y apoyar la reverencia y el orden. Menos "yo paso" y más "yo cuido".
        </Text>
      </section>

      <section className="tr-lesson-teacher-duties__section">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-duties__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-teacher-duties__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-teacher-duties__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-teacher-duties__section">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-duties__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-teacher-duties__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-teacher-duties__scripture-card">
              <Text as="p" size="base" className="tr-lesson-teacher-duties__scripture-text">
                {s.text}
              </Text>
              <div className="tr-lesson-teacher-duties__scripture-ref">
                <ScriptureReferenceCard reference={s.ref} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-teacher-duties__section">
        <div className="tr-lesson-teacher-duties__callout">
          <Heading as="h4" size="base" className="tr-lesson-teacher-duties__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-teacher-duties__callout-list">
            <li>
              <Text as="span" size="sm">
                Un Maestro "vela" por la Iglesia: no es vigilancia rara, es cuidado espiritual y apoyo.
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                Corregir "con amor" no es debilidad: es liderazgo con dominio propio.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-teacher-duties__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-duties__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-teacher-duties__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-teacher-duties__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-teacher-duties__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-teacher-duties__checklist-item ${checkedItems[i] ? 'tr-lesson-teacher-duties__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-teacher-duties__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-teacher-duties__section">
        <Heading as="h3" size="lg" className="tr-lesson-teacher-duties__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-teacher-duties__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-teacher-duties__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-teacher-duties__reflection-item">
              <label
                htmlFor={`tr-lesson-teacher-duties-reflection-${i}`}
                className="tr-lesson-teacher-duties__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-teacher-duties-reflection-${i}`}
                className="tr-lesson-teacher-duties__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-teacher-duties__section">
        <Card variant="outlined" padding="md" className="tr-lesson-teacher-duties__action-card">
          <Heading as="h4" size="base" className="tr-lesson-teacher-duties__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-teacher-duties__action-text">
            Plan de cuidado: elige 1 persona (o 1 situación) que vas a apoyar esta semana (ej.: saludar a alguien nuevo, ayudar a un hermano mayor, apoyar a tu familia en casa sin quejarte).
          </Text>
        </Card>
      </section>
    </div>
  );
}
