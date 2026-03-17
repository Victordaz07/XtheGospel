/**
 * LessonPriestPastoral - Priest-2: Servicio pastoral
 * Second Aaronic Priest lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonPriestPastoral.css';

const LESSON_ID = 'priest-2';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender el rol del Presbítero en bautismos (puede efectuarlos bajo autorización del obispo).',
  'Comprender que la confirmación de miembros nuevos requiere Sacerdocio de Melquisedec.',
  'Aprender a servir con respeto y coordinación.',
  'Fortalecer a miembros nuevos y acompañar a los que se preparan para ordenanzas.',
  'Plan personal de servicio pastoral.',
];

const SCRIPTURES = [
  { ref: 'DyC 20:41–43', text: 'Bautismo: por inmersión, en el nombre del Padre, del Hijo y del Espíritu Santo.' },
  { ref: 'Moroni 6:1–4', text: 'Bautismo y confirmación: dignidad y preparación.' },
  { ref: 'DyC 18:10–16', text: 'El valor de las almas es grande a la vista de Dios.' },
  { ref: 'Mosíah 18:8–10', text: 'Llevar las cargas unos de otros, consolar a los que necesitan consuelo.' },
  { ref: 'DyC 107:13–14', text: 'El Sacerdocio Aarónico tiene las llaves del ministerio de ángeles.' },
];

const PRACTICE_ITEMS = [
  'Acompañar a un nuevo miembro (o converso reciente) en una actividad o reunión',
  'Coordinar con un líder para saber cómo puedo ayudar en bautismos (o en ordenanzas vicarias del templo)',
  'Enviar un mensaje de ánimo a alguien que se prepara para una ordenanza',
  'Repasar el protocolo de bautismo o Santa Cena según mi delegación',
  'Observar y aprender de un Presbítero que sirve con dignidad',
  'Hacer un plan de seguimiento para 1 persona que acaba de bautizarse o confirmarse',
];

const REFLECTION_QUESTIONS = [
  '¿A quién puedo acompañar esta semana en su preparación para una ordenanza?',
  '¿Qué me cuesta más: coordinar con líderes o acercarme a los nuevos?',
  '¿Cómo cuidaré la reverencia cuando participe en bautismos o en ordenanzas del templo?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonPriestPastoralProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonPriestPastoral({ onPracticeProgress }: LessonPriestPastoralProps): JSX.Element {
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
    <div className="tr-lesson-priest-pastoral">
      <section className="tr-lesson-priest-pastoral__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-priest-pastoral__intro">
          El Presbítero puede efectuar bautismos por inmersión cuando se le asigna, con autorización del obispo. La confirmación (conferir el don del Espíritu Santo) requiere Sacerdocio de Melquisedec; el Presbítero no la realiza en bautismos de conversos. En el templo, los presbíteros sí pueden participar en ordenanzas vicarias (bautismos y confirmaciones) a favor de los fallecidos. Su rol principal es el bautismo, la Santa Cena y la obra misional. Acompañar bien a un nuevo miembro reduce desánimo; la delegación correcta protege la reverencia de la ordenanza.
        </Text>
      </section>

      <section className="tr-lesson-priest-pastoral__section">
        <Heading as="h3" size="lg" className="tr-lesson-priest-pastoral__heading">Objetivos</Heading>
        <ul className="tr-lesson-priest-pastoral__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-priest-pastoral__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-priest-pastoral__section">
        <Heading as="h3" size="lg" className="tr-lesson-priest-pastoral__heading">Escrituras clave</Heading>
        <div className="tr-lesson-priest-pastoral__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-priest-pastoral__scripture-card">
              <Text as="p" size="base" className="tr-lesson-priest-pastoral__scripture-text">{s.text}</Text>
              <div className="tr-lesson-priest-pastoral__scripture-ref"><ScriptureReferenceCard reference={s.ref} /></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-priest-pastoral__section">
        <div className="tr-lesson-priest-pastoral__callout">
          <Heading as="h4" size="base" className="tr-lesson-priest-pastoral__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-priest-pastoral__callout-list">
            <li><Text as="span" size="sm">El Presbítero puede bautizar bajo delegación del obispo; la confirmación requiere Melquisedec.</Text></li>
            <li><Text as="span" size="sm">En el templo, los presbíteros participan en bautismos y confirmaciones vicarias a favor de los fallecidos.</Text></li>
            <li><Text as="span" size="sm">Todas las ordenanzas se realizan bajo la dirección de quien posee las llaves (obispo o presidente de misión).</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-priest-pastoral__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-priest-pastoral__heading">Práctica</Heading>
        <p className="tr-lesson-priest-pastoral__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-priest-pastoral__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-priest-pastoral__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-priest-pastoral__checklist-item ${checkedItems[i] ? 'tr-lesson-priest-pastoral__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-priest-pastoral__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-priest-pastoral__section">
        <Heading as="h3" size="lg" className="tr-lesson-priest-pastoral__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-priest-pastoral__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-priest-pastoral__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-priest-pastoral__reflection-item">
              <label htmlFor={`tr-lesson-priest-pastoral-reflection-${i}`} className="tr-lesson-priest-pastoral__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-priest-pastoral-reflection-${i}`}
                className="tr-lesson-priest-pastoral__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-priest-pastoral__section">
        <Card variant="outlined" padding="md" className="tr-lesson-priest-pastoral__action-card">
          <Heading as="h4" size="base" className="tr-lesson-priest-pastoral__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-priest-pastoral__action-text">
            Acompañar a 1 persona en su preparación para una ordenanza.
          </Text>
        </Card>
      </section>
    </div>
  );
}
