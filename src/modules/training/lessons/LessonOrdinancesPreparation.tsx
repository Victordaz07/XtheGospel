/**
 * LessonOrdinancesPreparation - Core-4: Preparación para las Ordenanzas
 * Fourth core lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonOrdinancesPreparation.css';

const LESSON_ID = 'core-4';
const STORAGE_KEY_PRACTICE = 'training:lesson:core-4:practice';
const STORAGE_KEY_REFLECTIONS = 'training:lesson:core-4:reflections';

const OBJECTIVES = [
  'Entender qué es una ordenanza y por qué es sagrada.',
  'Diferenciar ordenanzas vs costumbres.',
  'Comprender la preparación personal (arrepentimiento, fe, dignidad).',
  'Aprender cómo prepararse para la Santa Cena como renovación de convenios.',
  'Identificar hábitos de reverencia y orden que invitan al Espíritu.',
];

const SCRIPTURES = [
  { ref: 'DyC 20:77, 79', text: 'Para que siempre tengan su Espíritu con ellos.' },
  { ref: '3 Nefi 18:28–29', text: 'No toméis indignamente; preparaos con reverencia.' },
  { ref: 'Moroni 4–5', text: 'La Santa Cena: recordar al Salvador y renovar convenios.' },
  { ref: 'Juan 3:5', text: 'Nacer de agua y del Espíritu.' },
  { ref: 'Mosíah 18:8–10', text: 'Estar dispuestos a llevar las cargas unos de otros.' },
];

const PRACTICE_ITEMS = [
  'Explica en 1 frase qué es una ordenanza',
  'Antes de la Santa Cena: lista 2 cosas que harás (reverencia + enfoque)',
  'Revisa tu semana: 1 cosa a arrepentirte o ajustar (sin dramatizar, práctico)',
  'Lee DyC 20:77/79 y escribe 1 palabra clave ("recordar", "Espíritu", etc.)',
  'Llega 10 min antes el domingo y evita distracciones (teléfono/charlas)',
  'Haz 1 acto de reverencia: escuchar, servir, o ayudar a otro a prepararse',
];

const REFLECTION_QUESTIONS = [
  '¿Qué me distrae más en las ordenanzas y cómo lo corregiré?',
  '¿Qué convenio necesito recordar con más intención?',
  '¿Qué haré diferente este domingo para invitar al Espíritu?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonOrdinancesPreparationProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonOrdinancesPreparation({ onPracticeProgress }: LessonOrdinancesPreparationProps): JSX.Element {
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
    <div className="tr-lesson-ordinances">
      <section className="tr-lesson-ordinances__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-ordinances__intro">
          Las ordenanzas son actos sagrados autorizados por el sacerdocio, conectados a convenios. La preparación espiritual y la reverencia invitan al Espíritu y nos acercan a Cristo.
        </Text>
      </section>

      <section className="tr-lesson-ordinances__section">
        <Heading as="h3" size="lg" className="tr-lesson-ordinances__heading">Objetivos</Heading>
        <ul className="tr-lesson-ordinances__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-ordinances__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-ordinances__section">
        <Heading as="h3" size="lg" className="tr-lesson-ordinances__heading">
          Ordenanzas y convenios: poder, pureza y renovación
        </Heading>
        <Text as="p" size="base" color="secondary">
          Las ordenanzas requieren autoridad del sacerdocio, símbolos significativos y convenios con Dios. No son rutina: son pactos que nos acercan a Cristo y nos permiten tener Su Espíritu. La Santa Cena renueva esos convenios cada semana.
        </Text>
      </section>

      <section className="tr-lesson-ordinances__section">
        <Heading as="h3" size="lg" className="tr-lesson-ordinances__heading">Escrituras clave</Heading>
        <div className="tr-lesson-ordinances__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-ordinances__scripture-card">
              <Text as="p" size="base" className="tr-lesson-ordinances__scripture-text">{s.text}</Text>
              <div className="tr-lesson-ordinances__scripture-ref"><ScriptureReferenceCard reference={s.ref} /></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-ordinances__section">
        <div className="tr-lesson-ordinances__callout">
          <Heading as="h4" size="base" className="tr-lesson-ordinances__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-ordinances__callout-list">
            <li><Text as="span" size="sm">Las ordenanzas unen símbolo + convenio + autoridad: no es rutina, es pacto.</Text></li>
            <li><Text as="span" size="sm">La reverencia no es "cara seria": es espacio para el Espíritu.</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-ordinances__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-ordinances__heading">Práctica</Heading>
        <p className="tr-lesson-ordinances__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-ordinances__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-ordinances__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-ordinances__checklist-item ${checkedItems[i] ? 'tr-lesson-ordinances__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-ordinances__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-ordinances__section">
        <Heading as="h3" size="lg" className="tr-lesson-ordinances__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-ordinances__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-ordinances__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-ordinances__reflection-item">
              <label htmlFor={`tr-lesson-ordinances-reflection-${i}`} className="tr-lesson-ordinances__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-ordinances-reflection-${i}`}
                className="tr-lesson-ordinances__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-ordinances__section">
        <Card variant="outlined" padding="md" className="tr-lesson-ordinances__action-card">
          <Heading as="h4" size="base" className="tr-lesson-ordinances__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-ordinances__action-text">
            Santa Cena con intención: elegir 1 hábito concreto (llegar temprano, preparar escrituras, oración previa) y sostenerlo por 2 domingos seguidos.
          </Text>
        </Card>
      </section>
    </div>
  );
}
