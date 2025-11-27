import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import type { NewConvertSection } from '../data/memberTypes';
import { useNewConvertProgress } from '../../hooks/useNewConvertProgress';
import { useI18n, Locale } from '../../context/I18nContext';
import { newConvertGuideEs } from '../data/newConvertGuide.es';
import { newConvertGuideEn } from '../data/newConvertGuide.en';
import { newConvertGuideFr } from '../data/newConvertGuide.fr';
import { newConvertGuidePt } from '../data/newConvertGuide.pt';
import '../../pages/Page.css';
import './MemberConvertidosDetailPage.css';

const guidesByLocale: Record<Locale, NewConvertSection[]> = {
  es: newConvertGuideEs,
  en: newConvertGuideEn,
  fr: newConvertGuideFr,
  pt: newConvertGuidePt,
};

const getGuideForLocale = (locale: Locale): NewConvertSection[] => guidesByLocale[locale] ?? guidesByLocale.es;

export const MemberConvertidosDetailPage: React.FC = () => {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  
  const sections = useMemo(() => getGuideForLocale(locale), [locale]);
  const section = useMemo(() => {
    return sections.find(s => s.id === sectionId);
  }, [sections, sectionId]);

  const { isCompleted, toggleSection } = useNewConvertProgress(sections, null, locale);

  const completedLabel = t('member.convertidos.sectionStatus.completed');
  const inProgressLabel = t('member.convertidos.sectionStatus.inProgress');
  const bulletsTitle = t('member.convertidos.modal.bulletsTitle');
  const scripturesTitle = t('member.convertidos.modal.scripturesTitle');
  const tipsTitle = t('member.convertidos.modal.tipsTitle');
  const markComplete = t('member.convertidos.modal.markComplete');
  const markIncomplete = t('member.convertidos.modal.markIncomplete');
  const closeLabel = t('member.convertidos.modal.close');

  if (!section) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>{t('member.convertidos.title')}</h1>
        </div>
        <div className="page-content">
          <p>Sección no encontrada</p>
          <button onClick={() => navigate('/member/convertidos')}>Volver</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <button
        className="convertidos-detail-back-button"
        onClick={() => navigate('/member/convertidos')}
      >
        <FaArrowLeft />
        <span>{t('common.back') || 'Volver'}</span>
      </button>
      <div className="page-header">
        <h1>{section.title}</h1>
        <p className="page-subtitle">
          {isCompleted(section.id) ? completedLabel : inProgressLabel}
        </p>
      </div>
      <div className="page-content">
        <div className="convertidos-detail-card-wrapper">
          <div className="convertidos-detail-card">
          <div className="convertidos-detail-content">
            <p className="convertidos-detail-text">{section.content}</p>

            {section.bullets?.length ? (
              <section className="convertidos-detail-section">
                <h3 className="convertidos-detail-section-title">{bulletsTitle}</h3>
                <ul className="convertidos-detail-list">
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.id}-bullet-${index}`}>{bullet}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {section.scriptures?.length ? (
              <section className="convertidos-detail-section">
                <h3 className="convertidos-detail-section-title">{scripturesTitle}</h3>
                <ul className="convertidos-detail-list">
                  {section.scriptures.map((scripture, index) => (
                    <li key={`${section.id}-scripture-${index}`}>
                      <span className="convertidos-detail-scripture-ref">{scripture.ref}</span>
                      {scripture.note && (
                        <p className="convertidos-detail-scripture-note">{scripture.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {section.tips?.length ? (
              <section className="convertidos-detail-section">
                <h3 className="convertidos-detail-section-title">{tipsTitle}</h3>
                <ul className="convertidos-detail-list">
                  {section.tips.map((tip, index) => (
                    <li key={`${section.id}-tip-${index}`}>{tip}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <div className="convertidos-detail-actions">
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className={`convertidos-detail-toggle-button ${
                isCompleted(section.id) ? 'completed' : ''
              }`}
            >
              {isCompleted(section.id) ? markIncomplete : markComplete}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

