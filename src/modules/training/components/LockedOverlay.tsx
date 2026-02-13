/**
 * LockedOverlay - Overlay for locked content
 */

import React from 'react';
import { FaLock } from 'react-icons/fa6';
import './LockedOverlay.css';

export interface LockedOverlayProps {
  message?: string;
  className?: string;
}

export function LockedOverlay({
  message = 'Contenido bloqueado',
  className = '',
}: LockedOverlayProps): JSX.Element {
  return (
    <div className={`tr-locked-overlay ${className}`}>
      <div className="tr-locked-overlay__icon">
        <FaLock />
      </div>
      <p className="tr-locked-overlay__message">{message}</p>
    </div>
  );
}
