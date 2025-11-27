import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaUser, FaCog, FaSignOutAlt, FaHome, FaBook, FaUsers, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../context/I18nContext';
import './MemberMenu.css';

interface MemberMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemberMenu: React.FC<MemberMenuProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const menuItems = [
    {
      icon: <FaHome />,
      label: t('tabs.home') || 'Inicio',
      path: '/member/home',
    },
    {
      icon: <FaBook />,
      label: t('tabs.lessons') || 'Estudio',
      path: '/member/study',
    },
    {
      icon: <FaUsers />,
      label: t('tabs.memberFriends') || 'Mis Amigos',
      path: '/member/friends',
    },
    {
      icon: <FaChartLine />,
      label: t('tabs.progress') || 'Progreso',
      path: '/member/progress',
    },
    {
      icon: <FaUser />,
      label: t('tabs.profile') || 'Perfil',
      path: '/member/profile',
    },
    {
      icon: <FaCog />,
      label: t('profile.settings') || 'Configuración',
      path: '/member/profile',
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div className="member-menu-overlay" onClick={onClose} />
      <div className="member-menu" ref={menuRef}>
        <div className="member-menu-header">
          <h2 className="member-menu-title">
            {t('memberHome.menu.title') || 'Menú'}
          </h2>
          <button
            className="member-menu-close"
            onClick={onClose}
            aria-label={t('common.close') || 'Cerrar'}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="member-menu-nav">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="member-menu-item"
              onClick={() => handleNavigate(item.path)}
            >
              <span className="member-menu-icon">{item.icon}</span>
              <span className="member-menu-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="member-menu-footer">
          <button
            className="member-menu-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>{t('profile.logout') || 'Cerrar sesión'}</span>
          </button>
        </div>
      </div>
    </>
  );
};

