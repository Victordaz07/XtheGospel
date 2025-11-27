import React, { useMemo, useState } from 'react';
import {
  MemberActivity,
  QuizOption,
  QuizSingleActivity,
  ScenarioActivity,
  ScriptureMatchActivity,
  CharacterGuessActivity,
  RealWorldMissionActivity,
  ReadingBlockActivity,
} from '../data/activitiesTypes';
import { useMemberProgressStore } from '../state/memberProgressStore';
import './ActivityRenderer.css';

interface ActivityRendererProps {
  activity: MemberActivity;
}

const OptionButton: React.FC<{
  option: QuizOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  disabled?: boolean;
}> = ({ option, isSelected, onSelect, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => onSelect(option.id)}
    className={`activity-option-button ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
  >
    <p className="activity-option-text">{option.text}</p>
    {isSelected && option.feedback && (
      <p className="activity-option-feedback">{option.feedback}</p>
    )}
  </button>
);

const renderQuiz = (
  activity: QuizSingleActivity | ScenarioActivity,
  selectedOption: string | null,
  setSelectedOption: (id: string) => void,
  disabled: boolean,
) => (
  <div className="activity-options-list">
    {activity.options.map((option) => (
      <OptionButton
        key={option.id}
        option={option}
        isSelected={selectedOption === option.id}
        onSelect={setSelectedOption}
        disabled={disabled}
      />
    ))}
  </div>
);

const renderScriptureMatch = (
  activity: ScriptureMatchActivity,
  selectedId: string | null,
  setSelectedId: (id: string) => void,
  disabled: boolean,
) => (
  <div className="activity-options-list">
    {activity.scriptures.map((scripture) => {
      const isSelected = scripture.id === selectedId;
      return (
        <button
          key={scripture.id}
          type="button"
          disabled={disabled}
          onClick={() => setSelectedId(scripture.id)}
          className={`activity-option-button activity-option-scripture ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
        >
          <p className="activity-option-text activity-option-reference">{scripture.reference}</p>
          <p className="activity-option-description">{scripture.text}</p>
          {isSelected && scripture.explanation && (
            <p className="activity-option-feedback">{scripture.explanation}</p>
          )}
        </button>
      );
    })}
  </div>
);

const renderCharacterGuess = (
  activity: CharacterGuessActivity,
  selected: string | null,
  setSelected: (value: string) => void,
  disabled: boolean,
) => (
  <div className="activity-options-list">
    {activity.options.map((option) => (
      <button
        key={option}
        type="button"
        disabled={disabled}
        onClick={() => setSelected(option)}
        className={`activity-option-button activity-option-character ${selected === option ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      >
        {option}
      </button>
    ))}
    {selected && (
      <div className="activity-feedback-message">
        {selected === activity.correctName ? 'Respuesta correcta.' : 'Sigue intentándolo; revisa las pistas.'}
      </div>
    )}
  </div>
);

const renderRealWorldMission = (
  activity: RealWorldMissionActivity,
  reflection: string,
  setReflection: (value: string) => void,
  disabled: boolean,
) => (
  <div className="activity-content-wrapper">
    <div className="activity-instructions-card">
      <h4 className="activity-instructions-title">Instrucciones</h4>
      <p className="activity-instructions-text">{activity.instructions}</p>
    </div>
    {activity.reflectionPrompt && (
      <div className="activity-reflection-section">
        <p className="activity-reflection-label">{activity.reflectionPrompt}</p>
        <textarea
          className="activity-textarea"
          rows={4}
          placeholder="Escribe tus impresiones..."
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          disabled={disabled}
        />
      </div>
    )}
  </div>
);

const renderReadingBlock = (
  activity: ReadingBlockActivity,
  reflection: string,
  setReflection: (value: string) => void,
  disabled: boolean,
) => (
  <div className="activity-content-wrapper">
    <div className="activity-reading-card">
      {activity.content}
    </div>
    {activity.reflectionQuestion && (
      <div className="activity-reflection-section">
        <p className="activity-reflection-label">{activity.reflectionQuestion}</p>
        <textarea
          className="activity-textarea"
          rows={3}
          placeholder="Registra tu reflexión..."
          value={reflection}
          onChange={(event) => setReflection(event.target.value)}
          disabled={disabled}
        />
      </div>
    )}
  </div>
);

export const ActivityRenderer: React.FC<ActivityRendererProps> = ({ activity }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);

  const progress = useMemberProgressStore((state) => state.progress);
  const completeActivity = useMemberProgressStore((state) => state.completeActivity);

  const isAlreadyCompleted = progress.completedActivityIds.includes(activity.id);

  const requiresChoice = useMemo(
    () => ['QUIZ_SINGLE', 'SCENARIO', 'QUIZ_SCRIPTURE_MATCH', 'CHARACTER_GUESS'].includes(activity.type),
    [activity.type],
  );

  const canFinish = useMemo(() => {
    if (isAlreadyCompleted) return true;
    if (requiresChoice) return Boolean(selectedOption);
    return true;
  }, [isAlreadyCompleted, requiresChoice, selectedOption]);

  const handleFinalize = () => {
    const { xpAwarded } = completeActivity(activity.id, activity.xp);
    setCompletionMessage(
      xpAwarded ? `¡Actividad completada! +${activity.xp} XP añadidos.` : 'Actividad ya completada anteriormente.',
    );
  };

  return (
    <section className="activity-renderer">
      <header className="activity-renderer-header">
        <p className="activity-renderer-type">Actividad</p>
        <h2 className="activity-renderer-title">{activity.title}</h2>
        {activity.description && (
          <p className="activity-renderer-description">{activity.description}</p>
        )}
        <div className="activity-renderer-meta">
          <span>XP: {activity.xp}</span>
          <span>Nivel sugerido: {activity.levelRecommended}</span>
        </div>
      </header>

      {activity.type === 'QUIZ_SINGLE' || activity.type === 'SCENARIO'
        ? renderQuiz(activity, selectedOption, setSelectedOption, isAlreadyCompleted)
        : null}

      {activity.type === 'QUIZ_SCRIPTURE_MATCH'
        ? renderScriptureMatch(activity, selectedOption, setSelectedOption, isAlreadyCompleted)
        : null}

      {activity.type === 'CHARACTER_GUESS'
        ? renderCharacterGuess(activity, selectedOption, setSelectedOption, isAlreadyCompleted)
        : null}

      {activity.type === 'REAL_WORLD_MISSION'
        ? renderRealWorldMission(activity, reflection, setReflection, isAlreadyCompleted)
        : null}

      {activity.type === 'READING_BLOCK'
        ? renderReadingBlock(activity, reflection, setReflection, isAlreadyCompleted)
        : null}

      <footer className="activity-renderer-footer">
        {completionMessage && (
          <div className="activity-completion-message">{completionMessage}</div>
        )}
        <button
          type="button"
          onClick={handleFinalize}
          disabled={!canFinish}
          className={`activity-finish-button ${isAlreadyCompleted ? 'completed' : canFinish ? 'enabled' : 'disabled'}`}
        >
          {isAlreadyCompleted ? 'Actividad completada' : `Finalizar actividad (+${activity.xp} XP)`}
        </button>
        {!isAlreadyCompleted && requiresChoice && !selectedOption && (
          <p className="activity-finish-hint">Selecciona una respuesta antes de finalizar.</p>
        )}
      </footer>
    </section>
  );
};
