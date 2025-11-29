import React from 'react';
import { useRoleStore } from '../store/useRoleStore';
import './RoleSwitcher.css';

export const RoleSwitcher: React.FC = () => {
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);

  const isLeader = role === 'leader';

  const handleToggle = async () => {
    await setRole(isLeader ? 'member' : 'leader');
    // Reload to apply new layout
    window.location.href = isLeader ? '/member/home' : '/leader/home';
  };

  return (
    <div className="role-switcher">
      <div className="role-switcher-label">
        Modo actual: <strong>{isLeader ? 'Líder' : 'Miembro'}</strong>
      </div>
      <button className="role-switcher-button" onClick={handleToggle} type="button">
        Cambiar a modo {isLeader ? 'Miembro' : 'Líder'}
      </button>
      <div className="role-switcher-helper">
        El modo seleccionado se mantendrá aunque cierres la aplicación, hasta que lo cambies de nuevo.
      </div>
    </div>
  );
};

