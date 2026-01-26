import React from 'react';
import './NewMemberHomePage.css';

export default function NewMemberHomePage(): JSX.Element {
  return (
    <div className="nm-home">
      {/* Welcome Card */}
      <div className="nm-home__welcome">
        <p className="nm-home__welcome-greeting">Welcome to the Vineyard 🌱</p>
        <h1 className="nm-home__welcome-title">New Member Home</h1>
        <p className="nm-home__welcome-subtitle">
          Your journey of growth and discipleship begins here.
        </p>
      </div>

      {/* Placeholder Content */}
      <div className="nm-home__placeholder">
        <div className="nm-home__placeholder-icon">🏠</div>
        <h2 className="nm-home__placeholder-title">Home Dashboard</h2>
        <p className="nm-home__placeholder-text">
          This is where you'll see your personalized content, upcoming activities, 
          and quick access to resources for new members.
        </p>
        <span className="nm-home__placeholder-badge">Sprint 3 - Placeholder</span>
      </div>

      <div className="nm-home__placeholder">
        <div className="nm-home__placeholder-icon">📅</div>
        <h2 className="nm-home__placeholder-title">Upcoming Activities</h2>
        <p className="nm-home__placeholder-text">
          Church activities, meetings with your ward family, and fellowship opportunities.
        </p>
        <span className="nm-home__placeholder-badge">Coming Soon</span>
      </div>
    </div>
  );
}
