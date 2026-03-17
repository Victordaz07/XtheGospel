/**
 * LessonRestoration - Core-1: La Restauración del Evangelio
 * First real lesson content for Training module.
 * Structure reusable for core-2, core-3, core-4.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import './LessonRestoration.css';

import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';

const LESSON_ID = 'core-1';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Comprender qué significa la Restauración del Evangelio',
  'Identificar los eventos clave de la Restauración',
  'Reconocer el papel del Libro de Mormón como evidencia',
  'Reflexionar sobre cómo la Restauración impacta tu vida',
];

const SCRIPTURES = [
  { ref: 'José Smith—Historia 1:17', text: 'Vi a dos Personajes, cuyo fulgor y gloria desafían toda descripción...' },
  { ref: 'Doctrina y Convenios 1:30', text: 'Y también aquellos a quienes se dieron mandamientos de ir adelante y establecer la causa de Sión' },
  { ref: 'Artículos de Fe 1:6', text: 'Creemos en la misma organización que existió en la Iglesia Primitiva...' },
];

const PRACTICE_ITEMS = [
  'Leer José Smith—Historia 1:1–20',
  'Meditar sobre una pregunta que te gustaría hacer al Señor',
  'Compartir con alguien qué significa para ti la Restauración',
  'Revisar el prólogo del Libro de Mormón',
];

const REFLECTION_QUESTIONS = [
  '¿Qué aspecto de la Restauración te resulta más significativo en este momento?',
  '¿Cómo te ayuda el Libro de Mormón a conocer que la Restauración es verdadera?',
  '¿Qué puedes hacer esta semana para fortalecer tu testimonio de la Restauración?',
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

export interface LessonRestorationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonRestoration({ onPracticeProgress }: LessonRestorationProps): JSX.Element {
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
    <div className="tr-lesson-restoration">
      {/* Intro */}
      <section className="tr-lesson-restoration__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-restoration__intro">
          La Restauración del Evangelio de Jesucristo es el acontecimiento más importante desde la resurrección del Salvador. En esta lección explorarás sus fundamentos y cómo aplicarlos en tu vida.
        </Text>
      </section>

      {/* Objetivos */}
      <section className="tr-lesson-restoration__section">
        <Heading as="h3" size="lg" className="tr-lesson-restoration__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-restoration__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-restoration__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      {/* Sección doctrinal (placeholder conciso) */}
      <section className="tr-lesson-restoration__section">
        <Heading as="h3" size="lg" className="tr-lesson-restoration__heading">
          La Restauración en breve
        </Heading>
        <Text as="p" size="base" color="secondary">
          Tras siglos de apostasía, el Padre Celestial y Jesucristo se manifestaron a José Smith en la primavera de 1820. A través de él se restauraron la autoridad del sacerdocio, las ordenanzas y las escrituras adicionales, incluyendo el Libro de Mormón.
        </Text>
      </section>

      {/* Escrituras clave */}
      <section className="tr-lesson-restoration__section">
        <Heading as="h3" size="lg" className="tr-lesson-restoration__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-restoration__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-restoration__scripture-card">
              <Text as="p" size="base" className="tr-lesson-restoration__scripture-text">
                {s.text}
              </Text>
              <div className="tr-lesson-restoration__scripture-ref">
                <ScriptureReferenceCard reference={s.ref} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ¿Sabías que...? */}
      <section className="tr-lesson-restoration__section">
        <div className="tr-lesson-restoration__callout">
          <Heading as="h4" size="base" className="tr-lesson-restoration__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-restoration__callout-list">
            <li>
              <Text as="span" size="sm">
                La Primera Visión ocurrió cuando José Smith tenía 14 años, en un bosque cerca de su hogar en Palmyra, Nueva York.
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                El Libro de Mormón se publicó en 1830, diez años después de la Primera Visión, como evidencia tangible de la Restauración.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      {/* Práctica (checklist) */}
      <section className="tr-lesson-restoration__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-restoration__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-restoration__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-restoration__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-restoration__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-restoration__checklist-item ${checkedItems[i] ? 'tr-lesson-restoration__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-restoration__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Preguntas de reflexión */}
      <section className="tr-lesson-restoration__section">
        <Heading as="h3" size="lg" className="tr-lesson-restoration__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-restoration__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-restoration__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-restoration__reflection-item">
              <label
                htmlFor={`tr-lesson-restoration-reflection-${i}`}
                className="tr-lesson-restoration__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-restoration-reflection-${i}`}
                className="tr-lesson-restoration__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Acción esta semana */}
      <section className="tr-lesson-restoration__section">
        <Card variant="outlined" padding="md" className="tr-lesson-restoration__action-card">
          <Heading as="h4" size="base" className="tr-lesson-restoration__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-restoration__action-text">
            Comparte con un familiar o amigo una experiencia en la que hayas sentido que el Evangelio restaurado te ha bendecido.
          </Text>
        </Card>
      </section>
    </div>
  );
}
