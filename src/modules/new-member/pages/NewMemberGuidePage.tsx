import React from 'react';
import './NewMemberGuidePage.css';

export default function NewMemberGuidePage(): JSX.Element {
  const guideTopics = [
    { icon: '⛪', title: 'Your New Ward Family', desc: 'Getting to know your congregation' },
    { icon: '🙏', title: 'Personal Prayer', desc: 'Building your relationship with God' },
    { icon: '📖', title: 'Scripture Study', desc: 'Daily habits for spiritual growth' },
    { icon: '🤝', title: 'Service Opportunities', desc: 'Ways to serve in your ward' },
    { icon: '👨‍👩‍👧‍👦', title: 'Family & Home', desc: 'Strengthening family bonds' },
  ];

  return (
    <div className="nm-guide">
      {/* Header */}
      <div className="nm-guide__header">
        <h1 className="nm-guide__title">New Member Guide</h1>
        <p className="nm-guide__subtitle">
          Essential topics for your journey as a new member
        </p>
      </div>

      {/* Placeholder */}
      <div className="nm-guide__placeholder">
        <div className="nm-guide__placeholder-icon">📚</div>
        <h2 className="nm-guide__placeholder-title">Growth Resources</h2>
        <p className="nm-guide__placeholder-text">
          A curated guide to help you navigate your first months as a member 
          of The Church of Jesus Christ of Latter-day Saints.
        </p>
        <span className="nm-guide__placeholder-badge">Sprint 3 - Placeholder</span>
      </div>

      {/* Topics Preview */}
      <div className="nm-guide__topics">
        {guideTopics.map((topic, index) => (
          <div key={index} className="nm-guide__topic">
            <span className="nm-guide__topic-icon">{topic.icon}</span>
            <div className="nm-guide__topic-content">
              <h3 className="nm-guide__topic-title">{topic.title}</h3>
              <p className="nm-guide__topic-desc">{topic.desc}</p>
            </div>
            <span className="nm-guide__topic-status">Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}
