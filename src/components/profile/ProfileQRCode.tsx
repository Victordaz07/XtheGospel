/**
 * ProfileQRCode - QR Code for sharing xTheGospel ID
 * 
 * Generates a QR code that leaders can scan to look up the member.
 * Uses a simple SVG-based QR generation (no external library needed).
 */

import React, { useEffect, useState } from 'react';
import { FaQrcode, FaShareNodes, FaDownload } from 'react-icons/fa6';
import { UniversalUserProfile } from '../../types/user';
import { generateProfileQRData, shareProfile } from '../../utils/appBridge';
import './ProfileQRCode.css';

interface ProfileQRCodeProps {
  profile: UniversalUserProfile;
  size?: number;
  compact?: boolean;
}

/**
 * Simple QR Code generator using canvas
 * For production, consider using a library like 'qrcode' or 'qr-code-styling'
 */
export function ProfileQRCode({ profile, size = 200, compact = false }: ProfileQRCodeProps): JSX.Element {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const qrData = generateProfileQRData(profile);

  useEffect(() => {
    generateQRCode();
  }, [profile.xthegospelId]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      // Use QR code API service (free, no signup required)
      // In production, use a library like 'qrcode' to generate locally
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&bgcolor=FDFBF8&color=3A5F8A&margin=10`;
      
      // Pre-load the image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setQrDataUrl(apiUrl);
        setLoading(false);
      };
      img.onerror = () => {
        // Fallback to text display
        setLoading(false);
      };
      img.src = apiUrl;
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      setLoading(false);
    }
  };

  const handleShare = () => {
    shareProfile(profile);
  };

  const handleDownload = async () => {
    if (!qrDataUrl) return;

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `xthegospel-${profile.xthegospelId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download QR:', error);
    }
  };

  const qrSize = compact ? 160 : size;

  // Compact version
  if (compact) {
    return (
      <div className="profile-qr profile-qr--compact">
        <div className="profile-qr__compact-content">
          <div className="profile-qr__code-small">
            {loading ? (
              <div className="profile-qr__loading-small">
                <div className="profile-qr__spinner" />
              </div>
            ) : qrDataUrl ? (
              <img 
                src={qrDataUrl.replace(`${size}x${size}`, `${qrSize}x${qrSize}`)} 
                alt={`QR Code for ${profile.xthegospelId}`}
                className="profile-qr__image"
                width={qrSize}
                height={qrSize}
              />
            ) : (
              <div className="profile-qr__fallback-small">
                <FaQrcode />
              </div>
            )}
          </div>
          
          <p className="profile-qr__hint">
            Muestra este código a tu líder para registrarte
          </p>
        </div>

        <div className="profile-qr__actions-compact">
          <button className="profile-qr__btn profile-qr__btn--primary" onClick={handleShare}>
            <FaShareNodes />
            Compartir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-qr">
      <div className="profile-qr__header">
        <FaQrcode className="profile-qr__icon" />
        <h3 className="profile-qr__title">Mi Código QR</h3>
      </div>

      <p className="profile-qr__desc">
        Muestra este código a tu líder de barrio para que escanee y te registre
      </p>

      <div className="profile-qr__code-wrapper">
        {loading ? (
          <div className="profile-qr__loading">
            <div className="profile-qr__spinner" />
            <span>Generando código...</span>
          </div>
        ) : qrDataUrl ? (
          <img 
            src={qrDataUrl} 
            alt={`QR Code for ${profile.xthegospelId}`}
            className="profile-qr__image"
            width={size}
            height={size}
          />
        ) : (
          <div className="profile-qr__fallback">
            <span className="profile-qr__id">{profile.xthegospelId}</span>
            <span className="profile-qr__fallback-text">
              Comparte este ID con tu líder
            </span>
          </div>
        )}
      </div>

      <div className="profile-qr__id-display">
        <span className="profile-qr__id-label">xTheGospel ID</span>
        <span className="profile-qr__id-value">{profile.xthegospelId}</span>
      </div>

      <div className="profile-qr__actions">
        <button className="profile-qr__btn profile-qr__btn--primary" onClick={handleShare}>
          <FaShareNodes />
          Compartir
        </button>
        {qrDataUrl && (
          <button className="profile-qr__btn profile-qr__btn--secondary" onClick={handleDownload}>
            <FaDownload />
            Descargar
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileQRCode;
