import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { StorageService } from '../utils/storage';
import { FIRST_OPEN_WELCOME_KEY } from '../config/welcome';
import './FirstOpenWelcome.css';

interface Slide {
  title: string;
  description: string;
}

const FirstOpenWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        title: t('app.welcome.slides.0.title'),
        description: t('app.welcome.slides.0.description'),
      },
      {
        title: t('app.welcome.slides.1.title'),
        description: t('app.welcome.slides.1.description'),
      },
      {
        title: t('app.welcome.slides.2.title'),
        description: t('app.welcome.slides.2.description'),
      },
    ],
    [t],
  );

  const isLastStep = currentStep === slides.length - 1;

  const finishWelcome = () => {
    StorageService.setItem(FIRST_OPEN_WELCOME_KEY, 'true');
    navigate('/register', { replace: true });
  };

  const handleNext = () => {
    if (isLastStep) {
      finishWelcome();
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <main className="first-open-welcome">
      <section className="first-open-welcome__card">
        <p className="first-open-welcome__eyebrow">{t('app.welcome.eyebrow')}</p>
        <h1 className="first-open-welcome__title">{t('app.welcome.title')}</h1>
        <p className="first-open-welcome__subtitle">{t('app.welcome.subtitle')}</p>

        <div className="first-open-welcome__slide">
          <h2 className="first-open-welcome__slide-title">{slides[currentStep].title}</h2>
          <p className="first-open-welcome__slide-description">
            {slides[currentStep].description}
          </p>
        </div>

        <div className="first-open-welcome__dots" aria-label={t('app.welcome.progressLabel')}>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`first-open-welcome__dot ${
                index === currentStep ? 'first-open-welcome__dot--active' : ''
              }`}
            />
          ))}
        </div>

        <div className="first-open-welcome__actions">
          <button
            type="button"
            className="first-open-welcome__btn first-open-welcome__btn--ghost"
            onClick={finishWelcome}
          >
            {t('app.welcome.skip')}
          </button>
          <button
            type="button"
            className="first-open-welcome__btn first-open-welcome__btn--primary"
            onClick={handleNext}
          >
            {isLastStep ? t('app.welcome.start') : t('app.welcome.next')}
          </button>
        </div>
      </section>
    </main>
  );
};

export default FirstOpenWelcome;
