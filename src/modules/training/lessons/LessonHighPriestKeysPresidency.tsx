/**
 * LessonHighPriestKeysPresidency - High Priest-1: Presidencia y llaves
 * First Melchizedek High Priest lesson for Training module.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonHighPriestKeysPresidency.css';

const LESSON_ID = 'high-priest-1';
const STORAGE_KEY_PRACTICE = 'training:lesson:high-priest-1:practice';
const STORAGE_KEY_REFLECTIONS = 'training:lesson:high-priest-1:reflections';

const OBJECTIVES = [
  'Entender el propósito del oficio de Sumo Sacerdote en el Sacerdocio de Melquisedec.',
  'Diferenciar llaves vs autoridad vs poder.',
  'Comprender cómo el sacerdocio se ejerce para bendecir, no para controlar.',
  'Aprender a apoyar y sostener a los líderes con lealtad y orden.',
  'Definir hábitos de dignidad y servicio que fortalecen la confianza del Señor.',
];

const SCRIPTURES = [
  { ref: 'DyC 107:8–9', text: 'Melquisedec: llaves, poder y autoridad espiritual.' },
  { ref: 'DyC 121:41–42', text: 'Persuasión, longanimidad, benignidad, amor sincero.' },
  { ref: 'DyC 84:33–39', text: 'Juramento y convenio del sacerdocio.' },
  { ref: 'Hebreos 5:4', text: 'Nadie toma para sí esta honra, sino el que es llamado.' },
  { ref: 'DyC 20:60', text: 'El sacerdocio por el poder del Espíritu.' },
];

const PRACTICE_ITEMS = [
  'Escribir en 1 frase la diferencia entre: llaves / autoridad / poder',
  'Identificar quién posee llaves en tu barrio y qué área preside (obispo, presidentes, etc.)',
  'Practicar "sostener": hacer 1 acto concreto de apoyo a un líder sin esperar reconocimiento',
  'Revisar tu conducta dominical: ¿qué hábito debo cambiar para ser más digno y reverente?',
  'Elegir 1 cosa para mejorar tu forma de hablar (menos crítica, más edificación)',
  'Hacer un "chequeo DyC 121": ¿estoy persuadiendo o empujando?',
];

const REFLECTION_QUESTIONS = [
  '¿Dónde confundo autoridad con control?',
  '¿Qué hábitos debo corregir para ser confiable espiritualmente?',
  '¿Cómo puedo sostener mejor a mis líderes esta semana?',
];

function loadPractice(): Record<number, boolean> {
  const parsed = getLessonStorage<Record<string, boolean>>(STORAGE_KEY_PRACTICE, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

function loadReflections(): Record<number, string> {
  const parsed = getLessonStorage<Record<string, string>>(STORAGE_KEY_REFLECTIONS, {});
  return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [Number(k), v]));
}

export interface LessonHighPriestKeysPresidencyProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonHighPriestKeysPresidency({ onPracticeProgress }: LessonHighPriestKeysPresidencyProps): JSX.Element {
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
    <div className="tr-lesson-hp-keys">
      <section className="tr-lesson-hp-keys__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-hp-keys__intro">
          El Sumo Sacerdote entiende llaves, autoridad y poder. Las llaves no te hacen más santo; te hacen más responsable. El sacerdocio sin caridad se vuelve ruido; con caridad, se vuelve poder real.
        </Text>
      </section>

      <section className="tr-lesson-hp-keys__section">
        <Heading as="h3" size="lg" className="tr-lesson-hp-keys__heading">Objetivos</Heading>
        <ul className="tr-lesson-hp-keys__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-hp-keys__list-item"><Text as="span" size="base">{obj}</Text></li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-hp-keys__section">
        <Heading as="h3" size="lg" className="tr-lesson-hp-keys__heading">Escrituras clave</Heading>
        <div className="tr-lesson-hp-keys__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-hp-keys__scripture-card">
              <Text as="p" size="base" className="tr-lesson-hp-keys__scripture-text">{s.text}</Text>
              <Text as="p" size="sm" color="secondary" className="tr-lesson-hp-keys__scripture-ref">— {s.ref}</Text>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-hp-keys__section">
        <div className="tr-lesson-hp-keys__callout">
          <Heading as="h4" size="base" className="tr-lesson-hp-keys__callout-title">¿Sabías que…?</Heading>
          <ul className="tr-lesson-hp-keys__callout-list">
            <li><Text as="span" size="sm">Las llaves no te hacen “más santo”; te hacen más responsable.</Text></li>
            <li><Text as="span" size="sm">El sacerdocio sin caridad se vuelve “ruido”. Con caridad, se vuelve poder real.</Text></li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-hp-keys__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-hp-keys__heading">Práctica</Heading>
        <p className="tr-lesson-hp-keys__hint">Marca las actividades que completes (se guardan automáticamente)</p>
        <ul className="tr-lesson-hp-keys__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-hp-keys__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-hp-keys__checklist-item ${checkedItems[i] ? 'tr-lesson-hp-keys__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-hp-keys__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-hp-keys__section">
        <Heading as="h3" size="lg" className="tr-lesson-hp-keys__heading">Preguntas de reflexión</Heading>
        <p className="tr-lesson-hp-keys__hint">Escribe tus pensamientos (se guardan automáticamente)</p>
        <div className="tr-lesson-hp-keys__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-hp-keys__reflection-item">
              <label htmlFor={`tr-lesson-hp-keys-reflection-${i}`} className="tr-lesson-hp-keys__reflection-label">{q}</label>
              <textarea
                id={`tr-lesson-hp-keys-reflection-${i}`}
                className="tr-lesson-hp-keys__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-hp-keys__section">
        <Card variant="outlined" padding="md" className="tr-lesson-hp-keys__action-card">
          <Heading as="h4" size="base" className="tr-lesson-hp-keys__action-title">Acción esta semana</Heading>
          <Text as="p" size="base" className="tr-lesson-hp-keys__action-text">
            Sostener con hechos: elige 1 líder y apóyalo con una acción concreta (servicio, logística, ánimo, presencia).
          </Text>
        </Card>
      </section>
    </div>
  );
}
