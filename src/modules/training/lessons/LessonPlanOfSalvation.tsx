/**
 * LessonPlanOfSalvation - Core-2: El Plan de Salvación
 * Second real lesson for Training module.
 * Same structure as LessonRestoration (core-1).
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonPlanOfSalvation.css';

const LESSON_ID = 'core-2';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Comprender los tres reinos de gloria y el propósito de la vida terrenal',
  'Identificar el papel del Salvador en el Plan de Salvación',
  'Reconocer la importancia del albedrío y las consecuencias de nuestras decisiones',
  'Reflexionar sobre cómo el Plan te da propósito y esperanza',
  'Aplicar principios del Plan en decisiones diarias',
];

const SCRIPTURES = [
  { ref: '2 Nefi 2:25', text: 'Adán cayó para que los hombres existiesen; y los hombres existen para que tengan gozo.' },
  { ref: 'Alma 34:32', text: 'Porque he aquí, esta vida es cuando el hombre debe prepararse para comparecer ante Dios; sí, el día de esta vida es el día en que el hombre debe realizar su obra.' },
  { ref: 'Moisés 1:39', text: 'Porque he aquí, esta es mi obra y mi gloria: Llevar a cabo la inmortalidad y la vida eterna del hombre.' },
  { ref: '2 Nefi 2:27', text: 'Los hombres son libres según la carne... para escoger la libertad y la vida eterna... o la cautividad y la muerte.' },
  { ref: 'Doctrina y Convenios 76:22', text: 'Y ahora, después de los muchos testimonios que se han dado de él, este es el testimonio... que vive.' },
];

const PRACTICE_ITEMS = [
  'Leer 2 Nefi 2',
  'Meditar en Alma 34:32 y qué significa "prepararse" para ti',
  'Identificar una decisión reciente donde usaste tu albedrío',
  'Escribir una oración de gratitud por el Plan de Salvación',
  'Compartir con alguien qué te da esperanza del Plan',
];

const REFLECTION_QUESTIONS = [
  '¿Cómo te ayuda el Plan de Salvación a dar sentido a las pruebas que enfrentas?',
  '¿De qué manera el albedrío te ha permitido acercarte al Salvador?',
  '¿Qué aspecto del Plan (premortal, mortal, postmortal) te resulta más significativo ahora?',
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

export interface LessonPlanOfSalvationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPlanOfSalvation({ onPracticeProgress }: LessonPlanOfSalvationProps): JSX.Element {
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
    <div className="tr-lesson-plan">
      <section className="tr-lesson-plan__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-plan__intro">
          El Plan de Salvación explica nuestro origen, propósito en la tierra y destino eterno. En esta lección explorarás sus fundamentos y cómo te guía cada día.
        </Text>
      </section>

      <section className="tr-lesson-plan__section">
        <Heading as="h3" size="lg" className="tr-lesson-plan__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-plan__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-plan__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-plan__section">
        <Heading as="h3" size="lg" className="tr-lesson-plan__heading">
          El Plan en breve
        </Heading>
        <Text as="p" size="base" color="secondary">
          Vivimos con nuestro Padre Celestial antes de nacer. Venimos a la tierra para recibir un cuerpo, ser probados y progresar. Gracias al Salvador, podemos arrepentirnos, ser perdonados y regresar a la presencia de Dios. Nuestro albedrío nos permite elegir el camino que seguiremos.
        </Text>
      </section>

      <section className="tr-lesson-plan__section">
        <Heading as="h3" size="lg" className="tr-lesson-plan__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-plan__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-plan__scripture-card">
              <Text as="p" size="base" className="tr-lesson-plan__scripture-text">
                {s.text}
              </Text>
              <Text as="p" size="sm" color="secondary" className="tr-lesson-plan__scripture-ref">
                — {s.ref}
              </Text>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-plan__section">
        <div className="tr-lesson-plan__callout">
          <Heading as="h4" size="base" className="tr-lesson-plan__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-plan__callout-list">
            <li>
              <Text as="span" size="sm">
                La expresión "Plan de Salvación" aparece en el Libro de Mormón (Alma 42:5) y en Doctrina y Convenios, revelando que es un concepto central en la Restauración.
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                Los tres reinos de gloria (celestial, terrestre, telestial) fueron revelados a José Smith en 1832 (DyC 76), mostrando la misericordia de Dios hacia todos Sus hijos.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-plan__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-plan__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-plan__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-plan__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-plan__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-plan__checklist-item ${checkedItems[i] ? 'tr-lesson-plan__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-plan__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-plan__section">
        <Heading as="h3" size="lg" className="tr-lesson-plan__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-plan__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-plan__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-plan__reflection-item">
              <label
                htmlFor={`tr-lesson-plan-reflection-${i}`}
                className="tr-lesson-plan__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-plan-reflection-${i}`}
                className="tr-lesson-plan__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-plan__section">
        <Card variant="outlined" padding="md" className="tr-lesson-plan__action-card">
          <Heading as="h4" size="base" className="tr-lesson-plan__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-plan__action-text">
            En una oración, agradece al Padre Celestial por el Plan de Salvación y pide guía para una decisión que estés enfrentando.
          </Text>
        </Card>
      </section>
    </div>
  );
}
