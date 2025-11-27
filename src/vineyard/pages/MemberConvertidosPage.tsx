import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NewConvertSection } from '../data/memberTypes';
import { useNewConvertProgress } from '../../hooks/useNewConvertProgress';
import { useI18n, Locale } from '../../context/I18nContext';
import { NewConvertProgressBar } from '../../components/NewConvertProgressBar';
import { NewConvertSectionCard } from '../../components/NewConvertSectionCard';
import { newConvertGuideEs } from '../data/newConvertGuide.es';
import { newConvertGuideEn } from '../data/newConvertGuide.en';
import { newConvertGuideFr } from '../data/newConvertGuide.fr';
import { newConvertGuidePt } from '../data/newConvertGuide.pt';
import '../../pages/Page.css';

const guidesByLocale: Record<Locale, NewConvertSection[]> = {
  es: newConvertGuideEs,
  en: newConvertGuideEn,
  fr: newConvertGuideFr,
  pt: newConvertGuidePt,
};

const getGuideForLocale = (locale: Locale): NewConvertSection[] => guidesByLocale[locale] ?? guidesByLocale.es;

export const MemberConvertidosPage: React.FC = () => {
  const { locale, t } = useI18n();
  const navigate = useNavigate();
  const sections = useMemo(() => getGuideForLocale(locale), [locale]);

  const { isCompleted, progress } = useNewConvertProgress(sections, null, locale);

  const pageTitle = t('member.convertidos.title');
  const pageSubtitle = t('member.convertidos.subtitle');
  const progressLabel = t('member.convertidos.progressLabel');
  const detailsLabel = t('member.convertidos.detailsButton');
  const completedLabel = t('member.convertidos.sectionStatus.completed');

  return (
    <div className="page">
      <div className="page-header">
        <h1>{pageTitle}</h1>
        <p className="page-subtitle">{pageSubtitle}</p>
      </div>
      <div className="page-content">
        <NewConvertProgressBar value={progress} label={progressLabel} />

        <div className="new-convert-cards-grid" style={{ marginTop: '24px' }}>
        {sections.map((section) => (
          <NewConvertSectionCard
            key={section.id}
            section={section}
            completed={isCompleted(section.id)}
            onOpen={() => navigate(`/member/convertidos/${section.id}`)}
            completedLabel={completedLabel}
            detailsLabel={detailsLabel}
            badges={{
              bullets: t('member.convertidos.chips.bullets', {
                count: section.bullets?.length ?? 0,
              }),
              scriptures: t('member.convertidos.chips.scriptures', {
                count: section.scriptures?.length ?? 0,
              }),
              tips: t('member.convertidos.chips.tips', {
                count: section.tips?.length ?? 0,
              }),
            }}
          />
        ))}
        </div>
      </div>
    </div>
  );
};


