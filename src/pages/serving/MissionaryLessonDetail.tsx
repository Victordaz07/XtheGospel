import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useI18n } from '../../context/I18nContext';
import { getMissionaryLessonData } from '../../utils/missionaryData';
import { CommitmentsService } from '../../services/commitmentsService';
import './Page.css';
import './MissionaryLessonDetail.css';

const MissionaryLessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'scriptures' | 'quotes' | 'questions' | 'commitments'>('overview');

  if (!lessonId) {
    return (
      <div className="page">
        <div className="page-header">
          <Link to="/lessons" className="back-button">← {t('back')}</Link>
          <h1>{t('common.error')}</h1>
        </div>
      </div>
    );
  }

  // Convertir "1" a "lesson1", etc.
  const normalizedLessonId = lessonId.match(/^\d+$/) ? `lesson${lessonId}` : lessonId;
  const lessonData = getMissionaryLessonData(normalizedLessonId, t);

  if (!lessonData) {
    return (
      <div className="page">
        <div className="page-header">
          <Link to="/lessons" className="back-button">← {t('back')}</Link>
          <h1>{t('common.lessonNotFound')}</h1>
        </div>
      </div>
    );
  }

  const addCommitment = async (commitmentText: string) => {
    try {
      await CommitmentsService.addCommitment({
        title: commitmentText,
        category: 'spiritual',
        completed: false,
        source: 'missionary-lesson',
      });
      alert(t('lesson.commitmentAdded') || 'Compromiso agregado exitosamente');
    } catch (error) {
      console.error('Error agregando compromiso:', error);
    }
  };

  return (
    <div className="page">
      <div className="missionary-lesson-header">
        <Link to="/lessons" className="back-button">← {t('back')}</Link>
        <h1>{lessonData.title}</h1>
      </div>

      <div className="missionary-lesson-content">
        {/* Enfoque Doctrinal */}
        <section className="study-section">
          <h2 className="section-title">🎯 Enfoque Doctrinal</h2>
          <p className="section-content">{lessonData.doctrineFocus}</p>
        </section>

        {/* Resumen Doctrinal */}
        <section className="study-section">
          <h2 className="section-title">📋 Resumen Doctrinal</h2>
          <p className="section-content">{lessonData.overview}</p>
        </section>

        {/* Puntos Clave */}
        <section className="study-section">
          <h2 className="section-title">✨ Puntos Clave</h2>
          <ul className="key-points-list">
            {lessonData.keyPoints.map((point, index) => (
              <li key={index} className="key-point-item">
                <span className="point-number">{index + 1}</span>
                <span className="point-text">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tabs para contenido adicional */}
        <div className="study-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📖 Escrituras
          </button>
          <button
            className={`tab-button ${activeTab === 'quotes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            💬 Citas
          </button>
          <button
            className={`tab-button ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            ❓ Preguntas
          </button>
          <button
            className={`tab-button ${activeTab === 'commitments' ? 'active' : ''}`}
            onClick={() => setActiveTab('commitments')}
          >
            ✅ Compromisos
          </button>
        </div>

        {/* Contenido de tabs */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <section className="study-section">
              <h2 className="section-title">📖 Escrituras Clave</h2>
              <ul className="scriptures-list">
                {lessonData.keyScriptures.map((scripture, index) => (
                  <li key={index} className="scripture-item">
                    {scripture}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'quotes' && (
            <section className="study-section">
              <h2 className="section-title">💬 Citas Inspiradas</h2>
              <div className="quotes-list">
                {lessonData.prophetQuotes.map((quote, index) => (
                  <div key={index} className="quote-item">
                    <div className="quote-icon">💭</div>
                    <p className="quote-text">{quote}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'questions' && (
            <section className="study-section">
              <h2 className="section-title">❓ Preguntas para el Investigador</h2>
              <ul className="questions-list">
                {lessonData.questions.map((question, index) => (
                  <li key={index} className="question-item">
                    <span className="question-number">{index + 1}</span>
                    <span className="question-text">{question}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === 'commitments' && (
            <section className="study-section">
              <h2 className="section-title">✅ Compromisos Sugeridos</h2>
              <ul className="commitments-list">
                {lessonData.commitments.map((commitment, index) => (
                  <li key={index} className="commitment-item">
                    <span className="commitment-text">{commitment}</span>
                    <button
                      className="add-commitment-button"
                      onClick={() => addCommitment(commitment)}
                    >
                      ➕ Agregar
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Referencias de Apoyo */}
        <section className="study-section references-section">
          <h2 className="section-title">📚 Referencias de Apoyo</h2>
          <div className="references-content">
            <div className="reference-item">
              <strong>Predicad Mi Evangelio:</strong>
              <p>{lessonData.pmgRefs}</p>
            </div>
            <div className="reference-item">
              <strong>Manual Misional:</strong>
              <p>{lessonData.handbookRefs}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MissionaryLessonDetail;

