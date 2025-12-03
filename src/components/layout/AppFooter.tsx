import React from 'react';
import { Link } from 'react-router-dom';
import './app-footer.css';

export const AppFooter: React.FC = () => {
  return (
    <footer className="xtg-footer">
      <nav className="xtg-footer-nav">
        <Link to="/privacy" className="xtg-footer-link">
          Privacy
        </Link>
        <span className="xtg-footer-separator">•</span>
        <Link to="/terms" className="xtg-footer-link">
          Terms
        </Link>
        <span className="xtg-footer-separator">•</span>
        <Link to="/support" className="xtg-footer-link">
          Support
        </Link>
      </nav>
      <p className="xtg-footer-meta">
        xTheGospel / For The Gospel – Built to support investigators, missionaries and members.
      </p>
    </footer>
  );
};

