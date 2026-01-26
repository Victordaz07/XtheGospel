import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaBookOpen, FaPenToSquare } from 'react-icons/fa6';
import './NewMemberHomePage.css';

/**
 * New Member Home Page
 * Sprint 7 - Pastoral tone, no placeholders
 */
export default function NewMemberHomePage(): JSX.Element {
  return (
    <div className="nm-home">
      {/* Welcome Card */}
      <div className="nm-home__welcome">
        <p className="nm-home__welcome-greeting">Welcome 🌱</p>
        <h1 className="nm-home__welcome-title">Your New Beginning</h1>
        <p className="nm-home__welcome-subtitle">
          You've taken a beautiful step. This space is here to support you 
          as you grow in your new life as a member.
        </p>
      </div>

      {/* Featured Action */}
      <div className="nm-home__featured">
        <Link to="/lessons" className="nm-home__featured-card">
          <div className="nm-home__featured-content">
            <h2 className="nm-home__featured-title">Your Guide</h2>
            <p className="nm-home__featured-desc">
              Resources to help you feel at home in your ward and grow in the gospel
            </p>
          </div>
          <FaChevronRight className="nm-home__featured-arrow" />
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="nm-home__section">
        <h2 className="nm-home__section-title">Quick actions</h2>
        <div className="nm-home__actions">
          <Link to="/lessons" className="nm-home__action-btn">
            <div className="nm-home__action-icon">
              <FaBookOpen />
            </div>
            <span className="nm-home__action-label">Guide</span>
          </Link>
          <Link to="/journal" className="nm-home__action-btn">
            <div className="nm-home__action-icon">
              <FaPenToSquare />
            </div>
            <span className="nm-home__action-label">Journal</span>
          </Link>
        </div>
      </div>

      {/* Encouragement */}
      <div className="nm-home__encouragement">
        <p className="nm-home__encouragement-text">
          Remember: there's no rush. The Savior walks with you at every step, 
          and your ward family is here to support you.
        </p>
      </div>
    </div>
  );
}
