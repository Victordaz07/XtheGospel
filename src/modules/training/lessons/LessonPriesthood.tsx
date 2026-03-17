/**
 * LessonPriesthood - Core-3: El Sacerdocio. Autoridad, llaves y servicio.
 * Third real lesson for Training module.
 * Same structure as LessonRestoration and LessonPlanOfSalvation.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonPriesthood.css';

const LESSON_ID = 'core-3';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender qué es el sacerdocio y por qué existe.',
  'Diferenciar autoridad vs poder del sacerdocio.',
  'Diferenciar llaves del sacerdocio vs autoridad delegada.',
  'Comprender la diferencia y propósito del Aarónico y el de Melquisedec.',
  'Identificar hábitos prácticos para ejercer el sacerdocio con dignidad y reverencia.',
];

const SCRIPTURES = [
  { ref: 'DyC 13', text: 'Upon you my fellow servants, in the name of Messiah I confer the Priesthood of Aaron...' },
  { ref: 'DyC 20:38–60', text: 'Deberes de oficios: bautismo, Santa Cena, bendiciones y ordenanzas.' },
  { ref: 'DyC 107:1–20', text: 'There are, in the church, two priesthoods...' },
  { ref: 'Mateo 16:19', text: 'Y a ti te daré las llaves del reino de los cielos...' },
  { ref: 'Hebreos 5:4', text: 'Y nadie toma para sí esta honra, sino el que es llamado de Dios...' },
];

const PRACTICE_ITEMS = [
  'Explicar con tus palabras la diferencia entre autoridad y poder del sacerdocio (1–2 líneas)',
  'Explicar con tus palabras qué son las llaves del sacerdocio (1–2 líneas)',
  'Identificar en tu barrio quién preside con llaves (obispo / presidente de estaca) y por qué',
  'Antes de la Santa Cena, hacer una preparación simple: oración + revisar tu conducta + reverencia',
  'Practicar reverencia: llegar 10 minutos antes y sentarte listo sin distracciones (1 domingo)',
  'Elegir 1 acto de servicio silencioso esta semana (sin anunciarlo ni postearlo)',
];

const REFLECTION_QUESTIONS = [
  '¿En qué área de mi vida necesito más "poder" del sacerdocio (más fe y obediencia), aunque ya tenga autoridad o acceso a ordenanzas?',
  '¿Qué me cuesta entender más: llaves, oficios o dignidad? ¿Por qué?',
  '¿Qué haré diferente este domingo para honrar el sacerdocio y la Santa Cena?',
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

export interface LessonPriesthoodProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPriesthood({ onPracticeProgress }: LessonPriesthoodProps): JSX.Element {
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
    <div className="tr-lesson-priesthood">
      <section className="tr-lesson-priesthood__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-priesthood__intro">
          El sacerdocio es el poder y la autoridad de Dios para actuar en Su nombre. En esta lección explorarás la diferencia entre autoridad y poder, el significado de las llaves, y cómo se ejerce a través del servicio y la rectitud.
        </Text>
      </section>

      <section className="tr-lesson-priesthood__section">
        <Heading as="h3" size="lg" className="tr-lesson-priesthood__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-priesthood__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-priesthood__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-priesthood__section">
        <Heading as="h3" size="lg" className="tr-lesson-priesthood__heading">
          El Sacerdocio: autoridad, llaves y servicio
        </Heading>
        <Text as="p" size="base" color="secondary">
          La autoridad del sacerdocio es el derecho de actuar en nombre de Dios; el poder depende de la rectitud, fe, humildad y obediencia. Las llaves son el derecho de presidir y dirigir cómo se usa la autoridad en un área. El sacerdocio Aarónico se enfoca en ordenanzas preparatorias y ministerio; el de Melquisedec en las ordenanzas espirituales y el gobierno de la Iglesia. Se ejerce mediante el servicio y la dignidad.
        </Text>
      </section>

      <section className="tr-lesson-priesthood__section">
        <Heading as="h3" size="lg" className="tr-lesson-priesthood__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-priesthood__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-priesthood__scripture-card">
              <Text as="p" size="base" className="tr-lesson-priesthood__scripture-text">
                {s.text}
              </Text>
              <div className="tr-lesson-priesthood__scripture-ref">
                <ScriptureReferenceCard reference={s.ref} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-priesthood__section">
        <div className="tr-lesson-priesthood__callout">
          <Heading as="h4" size="base" className="tr-lesson-priesthood__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-priesthood__callout-list">
            <li>
              <Text as="span" size="sm">
                Las llaves no son "más poder": son el derecho de presidir y dirigir cómo se usa la autoridad del sacerdocio en un área (barrio, estaca, ordenanzas).
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                El poder del sacerdocio no "se enciende" por el cargo: se manifiesta con rectitud, fe, humildad y obediencia. La autoridad puede estar; el poder depende del corazón.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-priesthood__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-priesthood__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-priesthood__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-priesthood__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-priesthood__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-priesthood__checklist-item ${checkedItems[i] ? 'tr-lesson-priesthood__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-priesthood__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-priesthood__section">
        <Heading as="h3" size="lg" className="tr-lesson-priesthood__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-priesthood__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-priesthood__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-priesthood__reflection-item">
              <label
                htmlFor={`tr-lesson-priesthood-reflection-${i}`}
                className="tr-lesson-priesthood__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-priesthood-reflection-${i}`}
                className="tr-lesson-priesthood__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-priesthood__section">
        <Card variant="outlined" padding="md" className="tr-lesson-priesthood__action-card">
          <Heading as="h4" size="base" className="tr-lesson-priesthood__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-priesthood__action-text">
            Preparación dominical: Esta semana, escoge una cosa concreta para llegar al domingo más preparado (ej.: dejar la ropa lista, dormir más temprano, leer 1 escritura, pedir perdón, apagar el celular en la reunión).
          </Text>
        </Card>
      </section>
    </div>
  );
}
