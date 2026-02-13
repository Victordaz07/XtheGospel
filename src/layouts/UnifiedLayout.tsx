import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaHouse,
  FaBookOpen,
  FaBookBookmark,
  FaChartLine,
  FaUser,
  FaGraduationCap,
} from 'react-icons/fa6';
import { useJourneyStage } from '../core/journey/useJourneyStore';
import { useI18n } from '../context/I18nContext';
import { BottomNav, type BottomNavItem } from '../ui/components';
import './UnifiedLayout.css';

function pathnameToActiveId(pathname: string): string {
  if (pathname.startsWith('/training')) return 'training';
  if (pathname.startsWith('/lessons')) return 'lessons';
  if (pathname.startsWith('/journal')) return 'journal';
  if (pathname.startsWith('/progress')) return 'progress';
  if (pathname.startsWith('/profile')) return 'profile';
  return 'home';
}

interface UnifiedLayoutProps {
  children: React.ReactNode;
}

export default function UnifiedLayout({
  children,
}: UnifiedLayoutProps): JSX.Element {
  const { t } = useI18n();
  const stage = useJourneyStage();
  const location = useLocation();
  const navigate = useNavigate();
  const activeId = pathnameToActiveId(location.pathname);

  // Build nav items with i18n labels. Training only when covenanted.
  const baseNavItems: BottomNavItem[] = [
    { id: 'home', label: t('app.nav.home'), icon: <FaHouse /> },
    { id: 'lessons', label: t('app.nav.lessons'), icon: <FaBookOpen /> },
    ...(stage === 'covenanted'
      ? [{ id: 'training', label: 'Capacitación', icon: <FaGraduationCap /> }]
      : []),
    { id: 'journal', label: t('app.nav.journal'), icon: <FaBookBookmark /> },
    { id: 'progress', label: t('app.nav.progress'), icon: <FaChartLine /> },
    { id: 'profile', label: t('app.nav.profile'), icon: <FaUser /> },
  ];

  const handleSelect = (id: string) => {
    navigate(id === 'home' ? '/home' : `/${id}`);
  };

  return (
    <div className={`unified-layout unified-layout--${stage}`}>
      <div className="unified-layout-shell">
        <div className="unified-layout-deco unified-layout-deco-top" />
        <div className="unified-layout-deco unified-layout-deco-bottom" />

        <main className="unified-layout-content">{children}</main>

        <BottomNav
          items={baseNavItems}
          activeId={activeId}
          onSelect={handleSelect}
          className="unified-layout__bottom-nav"
        />
      </div>
    </div>
  );
}
