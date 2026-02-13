import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import {
  getAllGuideTopics,
  categoryLabels,
  GuideTopic,
} from '../data/guideTopics';
import { getNewMemberLibraryLessons } from '../../investigator/data/lessons';
import './NewMemberGuidePage.css';

/**
 * New Member Guide Page
 * Sprint 5 - Real content, no gamification
 *
 * Displays guide topics grouped by category.
 * Each topic links to /lessons/<topicId> for detail view.
 */
export default function NewMemberGuidePage(): JSX.Element {
  const topics = getAllGuideTopics();
  const libraryLessons = getNewMemberLibraryLessons();

  // Group topics by category
  const topicsByCategory = topics.reduce<Record<string, GuideTopic[]>>(
    (acc, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    },
    {},
  );

  // Order of categories
  const categoryOrder: GuideTopic['category'][] = [
    'worship',
    'covenant-living',
    'ordinances',
    'belonging',
  ];

  return (
    <div className="nm-guide">
      {/* Header */}
      <header className="nm-guide__header">
        <h1 className="nm-guide__title">Your Guide</h1>
        <p className="nm-guide__subtitle">
          Resources to help you grow in your new life as a member of the Church
        </p>
      </header>

      {/* Topics by Category */}
      {categoryOrder.map(category => {
        const categoryTopics = topicsByCategory[category];
        if (!categoryTopics || categoryTopics.length === 0) return null;

        return (
          <section key={category} className="nm-guide__category">
            <h2 className="nm-guide__category-title">
              {categoryLabels[category]}
            </h2>
            <div className="nm-guide__topics">
              {categoryTopics.map(topic => (
                <Link
                  key={topic.id}
                  to={`/lessons/${topic.id}`}
                  className="nm-guide__topic"
                >
                  <div className="nm-guide__topic-content">
                    <h3 className="nm-guide__topic-title">{topic.title}</h3>
                    <p className="nm-guide__topic-desc">{topic.subtitle}</p>
                  </div>
                  <span className="nm-guide__topic-arrow">
                    <FaChevronRight />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* Library (lessons.ts) */}
      {libraryLessons.length > 0 && (
        <details className="nm-guide__library">
          <summary className="nm-guide__library-summary">
            Profundizar (biblioteca)
          </summary>
          <p className="nm-guide__library-note">
            Aquí está todo el contenido ampliado que antes aparecía como tópicos
            del investigador. Ábrelo solo cuando lo necesites.
          </p>
          <div className="nm-guide__topics">
            {libraryLessons.map(lesson => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="nm-guide__topic"
              >
                <div className="nm-guide__topic-content">
                  <h3 className="nm-guide__topic-title">{lesson.title}</h3>
                  <p className="nm-guide__topic-desc">{lesson.subtitle}</p>
                </div>
                <span className="nm-guide__topic-arrow">
                  <FaChevronRight />
                </span>
              </Link>
            ))}
          </div>
        </details>
      )}

      {/* Closing encouragement */}
      <footer className="nm-guide__footer">
        <p className="nm-guide__footer-text">
          Take your time exploring these topics. There's no rush—your journey is
          personal and the Savior walks with you.
        </p>
      </footer>
    </div>
  );
}
