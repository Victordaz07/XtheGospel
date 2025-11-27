import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../../theme/tokens';
import './TabBar.css';

interface TabItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabBarProps {
  items: TabItem[];
  className?: string;
}

export const TabBar: React.FC<TabBarProps> = ({ items, className = '' }) => {
  const location = useLocation();

  return (
    <nav className={`ui-tab-bar ${className}`}>
      {items.map((item) => {
        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`ui-tab-item ${isActive ? 'ui-tab-item--active' : ''}`}
          >
            {item.icon && <span className="ui-tab-icon">{item.icon}</span>}
            <span className="ui-tab-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

