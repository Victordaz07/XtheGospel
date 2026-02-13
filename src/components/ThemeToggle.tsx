import React from 'react';
import { FaSun, FaMoon, FaCircleHalfStroke } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import './ThemeToggle.css';

type Theme = 'light' | 'dark' | 'system';

interface ThemeOption {
  value: Theme;
  icon: React.ReactNode;
  labelKey: string;
}

const themeOptions: ThemeOption[] = [
  { value: 'light', icon: <FaSun />, labelKey: 'app.settings.themeLight' },
  { value: 'dark', icon: <FaMoon />, labelKey: 'app.settings.themeDark' },
  { value: 'system', icon: <FaCircleHalfStroke />, labelKey: 'app.settings.themeSystem' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <div className="theme-toggle">
      <label className="theme-toggle__label">{t('app.settings.theme')}</label>
      <div className="theme-toggle__options">
        {themeOptions.map((option) => (
          <button
            key={option.value}
            className={`theme-toggle__btn ${theme === option.value ? 'theme-toggle__btn--active' : ''}`}
            onClick={() => setTheme(option.value)}
            aria-pressed={theme === option.value}
          >
            <span className="theme-toggle__icon">{option.icon}</span>
            <span className="theme-toggle__text">{t(option.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Simple toggle button for quick access
export function ThemeQuickToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-quick-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}
