import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import { useI18n } from '../../context/I18nContext';
import { FeaturedContentItem } from '../data/featuredContent';
import { getRandomFeaturedContent } from '../data/featuredContent';
import './FeaturedContentSection.css';

interface FeaturedContentSectionProps {
  items?: FeaturedContentItem[];
  maxItems?: number;
  showViewAll?: boolean;
}

export const FeaturedContentSection: React.FC<FeaturedContentSectionProps> = ({
  items,
  maxItems = 2,
  showViewAll = true,
}) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  // Use provided items or get random selection
  const displayItems = items || getRandomFeaturedContent(maxItems);

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
    <section id="featured-content" className="featured-content-section">
      <div className="featured-content-header">
        <h3 className="featured-content-title">{t('memberHome.featuredContent.title')}</h3>
        {showViewAll && (
          <Link to="/member/featured" className="featured-content-view-all">
            {t('memberHome.featuredContent.seeAll')}
            <FaChevronRight className="featured-content-chevron" />
          </Link>
        )}
      </div>
      
      {t('memberHome.featuredContent.subtitle') && (
        <p className="featured-content-subtitle">
          {t('memberHome.featuredContent.subtitle')}
        </p>
      )}

      <div className="featured-content-list">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="featured-content-card"
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
            <div
              className="featured-content-image"
              style={{ background: getImageGradient(item.imageType) }}
            >
              <div className="featured-content-image-overlay" />
            </div>
            
            <div className="featured-content-body">
              <h4 className="featured-content-card-title">
                {t(item.titleKey)}
              </h4>
              <p className="featured-content-card-description">
                {t(item.descriptionKey)}
              </p>
              
              <div className="featured-content-meta">
                <span className="featured-content-tag">
                  {t(item.topicTagKey)}
                </span>
                <span className="featured-content-time">
                  {t('memberHome.featuredContent.readTime', { minutes: item.estMinutes })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

