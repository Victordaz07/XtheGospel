import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { featuredContentItems, FeaturedContentItem } from '../../member/data/featuredContent';
import { FeaturedContentSection } from '../../member/components/FeaturedContentSection';
import '../Page.css';
import './FeaturedContentPage.css';

export const FeaturedContentPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleCardClick = (item: FeaturedContentItem) => {
    navigate(item.targetRoute);
  };

  const getImageGradient = (imageType: FeaturedContentItem['imageType']): string => {
    // Soft, pastel gradients - calm and elegant
    const gradients: Record<FeaturedContentItem['imageType'], string> = {
      doctrine_of_christ: 'linear-gradient(135deg, #EEF3FF 0%, #E4E9F8 100%)',
      new_converts: 'linear-gradient(135deg, #F4F9FF 0%, #EAF1FE 100%)',
      temple_preparation: 'linear-gradient(135deg, #F0F4FF 0%, #E8EDFF 100%)',
      member_missionary: 'linear-gradient(135deg, #F2F7FF 0%, #E8F0FE 100%)',
      scriptures: 'linear-gradient(135deg, #F5F8FF 0%, #EBF2FF 100%)',
      service: 'linear-gradient(135deg, #F1F5FF 0%, #E7EDFF 100%)',
      inspiration: 'linear-gradient(135deg, #F6F9FF 0%, #ECF2FF 100%)',
      leadership: 'linear-gradient(135deg, #F3F7FF 0%, #E9F0FF 100%)',
    };
    return gradients[imageType] || gradients.doctrine_of_christ;
  };

  return (
    <div className="page">
      <div className="page-header">
        <button
          className="featured-content-back-button"
          onClick={() => navigate(-1)}
          aria-label={t('common.back') || 'Volver'}
        >
          <FaArrowLeft />
        </button>
        <h1>{t('memberHome.featuredContent.title')}</h1>
      </div>

      <div className="page-content">
        <p className="featured-content-page-subtitle">
          {t('memberHome.featuredContent.subtitle')}
        </p>

        <div className="featured-content-page-grid">
          {featuredContentItems.map((item) => (
            <div
              key={item.id}
              className="featured-content-card-gradient"
              style={{ background: getImageGradient(item.imageType) }}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(item);
                }
              }}
            >
              <div className="featured-content-gradient-body">
                <h4 className="featured-content-gradient-title">
                  {t(item.titleKey)}
                </h4>
                <p className="featured-content-gradient-description">
                  {t(item.descriptionKey)}
                </p>
                
                <div className="featured-content-gradient-meta">
                  <span className="featured-content-gradient-tag">
                    {t(item.topicTagKey)}
                  </span>
                  <span className="featured-content-gradient-time">
                    {t('memberHome.featuredContent.readTime', { minutes: item.estMinutes })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

