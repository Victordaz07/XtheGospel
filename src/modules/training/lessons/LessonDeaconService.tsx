/**
 * LessonDeaconService - Deacon-2: Servicio como Diácono
 * Second Aaronic Deacon lesson for Training module.
 * Same structure as LessonDeaconDuties and core lessons.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Card, Heading, Text, ScriptureReferenceCard } from '../../../ui/components';
import { FaCheck, FaCircle } from 'react-icons/fa6';
import { getLessonStorage, setLessonStorage, setLessonStorageDebounced, flushLessonStorageDebounced } from './lessonStorage';
import './LessonDeaconService.css';

const LESSON_ID = 'deacon-2';
const STORAGE_KEY_PRACTICE = `training:lesson:${LESSON_ID}:practice`;
const STORAGE_KEY_REFLECTIONS = `training:lesson:${LESSON_ID}:reflections`;

const OBJECTIVES = [
  'Entender que el servicio es la forma principal de ejercer el oficio de diácono.',
  'Aprender a servir sin llamar la atención y sin esperar reconocimiento.',
  'Desarrollar iniciativa: ver necesidades y actuar con permiso y orden.',
  'Practicar respeto, reverencia y trabajo en equipo con otros poseedores del sacerdocio.',
  'Crear un plan simple de servicio semanal (en casa + en la Iglesia).',
];

const SCRIPTURES = [
  { ref: 'Mosíah 2:17', text: 'Cuando os halláis al servicio de vuestros semejantes, solo estáis al servicio de vuestro Dios.' },
  { ref: 'DyC 58:26–28', text: 'No conviene que sean compelidos... ser anxiously engaged en una buena causa.' },
  { ref: 'Mateo 20:26–28', text: 'El que quiera ser el mayor entre vosotros, sea vuestro servidor.' },
  { ref: 'Alma 37:6–7', text: 'Por cosas pequeñas se realizan grandes cosas.' },
  { ref: 'DyC 84:106', text: 'Fortalecer a los débiles, levantar las manos caídas.' },
];

const PRACTICE_ITEMS = [
  'Hacer una lista de 3 necesidades que veo en casa o en la Iglesia',
  'Elegir 1 necesidad y hacer un plan simple: qué haré, cuándo, y con quién debo coordinar',
  'Preguntar a un líder (papá/obispo/presidencia/quórum) si puedo ayudar en X cosa',
  'Servir sin anunciarlo (sin post ni comentario; solo hacerlo)',
  'Practicar "trabajo en equipo": ayudar a otro diácono a hacer su parte, sin mandarlo',
  'Al final del día, escribir una línea: "Hoy serví en ____ y me sentí ____."',
];

const REFLECTION_QUESTIONS = [
  '¿Qué me impide servir más: pereza, vergüenza, distracción o orgullo?',
  '¿A quién se le haría la vida más fácil si yo sirviera mejor esta semana?',
  '¿Cómo puedo mostrar reverencia mientras sirvo (sin prisa, sin relajo)?',
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

export interface LessonDeaconServiceProps {
  onPracticeProgress?: (checked: number, total: number) => void;
}

export function LessonDeaconService({ onPracticeProgress }: LessonDeaconServiceProps): JSX.Element {
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
    <div className="tr-lesson-deacon-service">
      <section className="tr-lesson-deacon-service__section">
        <Text as="p" size="base" color="secondary" className="tr-lesson-deacon-service__intro">
          El oficio de diácono se ejerce principalmente mediante el servicio. En esta lección aprenderás a servir con iniciativa, humildad y trabajo en equipo, sin buscar reconocimiento.
        </Text>
      </section>

      <section className="tr-lesson-deacon-service__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon-service__heading">
          Objetivos
        </Heading>
        <ul className="tr-lesson-deacon-service__list">
          {OBJECTIVES.map((obj, i) => (
            <li key={i} className="tr-lesson-deacon-service__list-item">
              <Text as="span" size="base">{obj}</Text>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-deacon-service__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon-service__heading">
          El servicio como diácono en breve
        </Heading>
        <Text as="p" size="base" color="secondary">
          Un diácono confiable ve necesidades y actúa con permiso y orden. Sirve sin llamar la atención, trabaja en equipo con otros poseedores del sacerdocio, y crea un plan semanal de servicio en casa y en la Iglesia. El oficio se trata de cargar con otros, no de lucirse.
        </Text>
      </section>

      <section className="tr-lesson-deacon-service__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon-service__heading">
          Escrituras clave
        </Heading>
        <div className="tr-lesson-deacon-service__scriptures">
          {SCRIPTURES.map((s, i) => (
            <Card key={i} variant="outlined" padding="md" className="tr-lesson-deacon-service__scripture-card">
              <Text as="p" size="base" className="tr-lesson-deacon-service__scripture-text">
                {s.text}
              </Text>
              <div className="tr-lesson-deacon-service__scripture-ref">
                <ScriptureReferenceCard reference={s.ref} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="tr-lesson-deacon-service__section">
        <div className="tr-lesson-deacon-service__callout">
          <Heading as="h4" size="base" className="tr-lesson-deacon-service__callout-title">
            ¿Sabías que…?
          </Heading>
          <ul className="tr-lesson-deacon-service__callout-list">
            <li>
              <Text as="span" size="sm">
                El servicio "silencioso" es entrenamiento espiritual: te enseña a actuar por amor, no por aplausos.
              </Text>
            </li>
            <li>
              <Text as="span" size="sm">
                La iniciativa no es desorden: un diácono con iniciativa pregunta, coordina y actúa con humildad.
              </Text>
            </li>
          </ul>
        </div>
      </section>

      <section className="tr-lesson-deacon-service__section" aria-label="Lista de práctica">
        <Heading as="h3" size="lg" className="tr-lesson-deacon-service__heading">
          Práctica
        </Heading>
        <p className="tr-lesson-deacon-service__hint">
          Marca las actividades que completes (se guardan automáticamente)
        </p>
        <ul className="tr-lesson-deacon-service__checklist" role="group" aria-label="Actividades de práctica">
          {PRACTICE_ITEMS.map((item, i) => (
            <li key={i} className="tr-lesson-deacon-service__checklist-item-wrapper">
              <button
                type="button"
                role="checkbox"
                aria-checked={checkedItems[i] ?? false}
                aria-label={`${item}. ${checkedItems[i] ? 'Completado' : 'Pendiente'}`}
                className={`tr-lesson-deacon-service__checklist-item ${checkedItems[i] ? 'tr-lesson-deacon-service__checklist-item--done' : ''}`}
                onClick={() => toggleCheck(i)}
              >
                <span className="tr-lesson-deacon-service__checklist-icon" aria-hidden>
                  {checkedItems[i] ? <FaCheck /> : <FaCircle />}
                </span>
                <Text as="span" size="base">{item}</Text>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="tr-lesson-deacon-service__section">
        <Heading as="h3" size="lg" className="tr-lesson-deacon-service__heading">
          Preguntas de reflexión
        </Heading>
        <p className="tr-lesson-deacon-service__hint">
          Escribe tus pensamientos (se guardan automáticamente)
        </p>
        <div className="tr-lesson-deacon-service__reflections">
          {REFLECTION_QUESTIONS.map((q, i) => (
            <div key={i} className="tr-lesson-deacon-service__reflection-item">
              <label
                htmlFor={`tr-lesson-deacon-service-reflection-${i}`}
                className="tr-lesson-deacon-service__reflection-label"
              >
                {q}
              </label>
              <textarea
                id={`tr-lesson-deacon-service-reflection-${i}`}
                className="tr-lesson-deacon-service__textarea"
                value={reflections[i] ?? ''}
                onChange={(e) => setReflection(i, e.target.value)}
                placeholder="Escribe aquí..."
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tr-lesson-deacon-service__section">
        <Card variant="outlined" padding="md" className="tr-lesson-deacon-service__action-card">
          <Heading as="h4" size="base" className="tr-lesson-deacon-service__action-title">
            Acción esta semana
          </Heading>
          <Text as="p" size="base" className="tr-lesson-deacon-service__action-text">
            Servicio semanal fijo: elige una acción que harás todas las semanas (ej.: recoger, ayudar a un hermano mayor, preparar cosas del domingo, ayudar a mamá/papá sin que lo pidan).
          </Text>
        </Card>
      </section>
    </div>
  );
}
