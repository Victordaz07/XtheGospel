import React, { useState } from 'react';
import { useI18n } from '../../context/I18nContext';
import { DIFFICULT_QUESTIONS } from '../../data/difficultQuestions';
import './Page.css';
import './DifficultQuestionsPage.css';

const DifficultQuestionsPage: React.FC = () => {
  const { locale, t } = useI18n();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{t('difficultQuestions.title') || 'Preguntas Difíciles'}</h1>
        <p>{t('difficultQuestions.subtitle') || 'Respuestas a preguntas comunes sobre el evangelio'}</p>
      </div>
      <div className="page-content">
        <div className="questions-list">
          {DIFFICULT_QUESTIONS.map((question) => {
            const isExpanded = expandedQuestion === question.id;
            return (
              <div key={question.id} className="question-card">
                <div
                  className="question-header"
                  onClick={() => toggleQuestion(question.id)}
                >
                  <h3>{question.question[locale]}</h3>
                  <span className="question-toggle">{isExpanded ? '▼' : '▶'}</span>
                </div>
                {isExpanded && (
                  <div className="question-answer">
                    <p>{question.answer[locale]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DifficultQuestionsPage;

