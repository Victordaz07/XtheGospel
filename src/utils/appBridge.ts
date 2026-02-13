/**
 * App Bridge - Cross-App Communication
 * 
 * Utilities for sharing data between xTheGospel apps:
 * - QR Code generation
 * - Deep links
 * - Clipboard sharing
 * - URL-based data transfer
 */

import { UniversalUserProfile, ShareableProfile } from '../types/user';

// ============================================
// APP URLS (configurable per environment)
// ============================================

export const APP_URLS = {
  member: import.meta.env.VITE_APP_URL_MEMBER || 'https://app.xthegospel.com',
  leader: import.meta.env.VITE_APP_URL_LEADER || 'https://leader.xthegospel.com',
  missionary: import.meta.env.VITE_APP_URL_MISSIONARY || 'https://missionary.xthegospel.com',
} as const;

// ============================================
// QR CODE DATA
// ============================================

/**
 * Generate QR code data for profile sharing
 * Returns a URL that leaders can scan to look up the member
 */
export function generateProfileQRData(profile: UniversalUserProfile | ShareableProfile): string {
  // Create a URL that the leader app can handle
  const data = {
    type: 'xtg-profile',
    id: profile.xthegospelId,
    name: profile.displayName,
    v: 1, // Version for future compatibility
  };
  
  // Encode as URL for easy scanning
  const params = new URLSearchParams({
    data: btoa(JSON.stringify(data)),
  });
  
  return `${APP_URLS.leader}/lookup?${params.toString()}`;
}

/**
 * Parse QR code data from a scanned URL
 */
export function parseProfileQRData(url: string): { 
  xthegospelId: string; 
  displayName?: string 
} | null {
  try {
    const urlObj = new URL(url);
    const dataParam = urlObj.searchParams.get('data');
    
    if (!dataParam) {
      // Try direct ID in path: /lookup/XTG-2026-ABC123
      const pathMatch = urlObj.pathname.match(/\/lookup\/?(XTG-\d{4}-[A-Z0-9]{6})/i);
      if (pathMatch) {
        return { xthegospelId: pathMatch[1].toUpperCase() };
      }
      return null;
    }
    
    const data = JSON.parse(atob(dataParam));
    
    if (data.type === 'xtg-profile' && data.id) {
      return {
        xthegospelId: data.id,
        displayName: data.name,
      };
    }
    
    return null;
  } catch {
    return null;
  }
}

// ============================================
// DEEP LINKS
// ============================================

/**
 * Generate a deep link to open the leader app with a specific profile
 */
export function generateLeaderDeepLink(xthegospelId: string): string {
  return `${APP_URLS.leader}/lookup/${xthegospelId}`;
}

/**
 * Generate a deep link to open the member app profile
 */
export function generateMemberDeepLink(xthegospelId: string): string {
  return `${APP_URLS.member}/profile/${xthegospelId}`;
}

/**
 * Open an app via deep link (web version)
 */
export function openApp(app: keyof typeof APP_URLS, path: string = '/'): void {
  const url = `${APP_URLS[app]}${path}`;
  window.open(url, '_blank');
}

// ============================================
// OPEN LEADERS APP (Member → Leaders PWA bridge)
// ============================================

export type OpenLeadersOptions = {
  target?: '_blank' | '_self';
  path?: string;
  returnTo?: string;
  context?: Record<string, string | number | boolean | null | undefined>;
};

/**
 * Open Leaders app with optional returnUrl and context.
 * Use from Member app Training teaser card.
 */
export function openLeadersApp(opts: OpenLeadersOptions = {}): void {
  const base = (APP_URLS.leader || '').replace(/\/$/, '');
  if (!base) {
    console.warn('APP_URLS.leader not configured. Set VITE_APP_URL_LEADER.');
    return;
  }

  const target = opts.target ?? '_blank';
  const path = opts.path ?? '/training';
  const url = new URL(base + path);

  const returnUrl =
    opts.returnTo ??
    (typeof window !== 'undefined' ? window.location.href : '');
  if (returnUrl) url.searchParams.set('returnUrl', returnUrl);

  if (opts.context) {
    for (const [k, v] of Object.entries(opts.context)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v ?? ''));
    }
  }

  window.open(url.toString(), target);
}

// ============================================
// CLIPBOARD SHARING
// ============================================

/**
 * Copy xTheGospel ID to clipboard with optional message
 */
export async function copyXtgIdToClipboard(
  profile: UniversalUserProfile | ShareableProfile,
  includeMessage: boolean = true
): Promise<boolean> {
  try {
    let text = profile.xthegospelId;
    
    if (includeMessage) {
      text = `Mi xTheGospel ID: ${profile.xthegospelId}\n` +
             `Nombre: ${profile.displayName}\n` +
             `\nUsa este ID para encontrarme en la app de líderes.`;
    }
    
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// ============================================
// NATIVE SHARE API
// ============================================

/**
 * Share profile using native share (mobile/desktop)
 */
export async function shareProfile(
  profile: UniversalUserProfile | ShareableProfile
): Promise<boolean> {
  const shareData = {
    title: 'Mi xTheGospel ID',
    text: `${profile.displayName}\nxTheGospel ID: ${profile.xthegospelId}`,
    url: generateLeaderDeepLink(profile.xthegospelId),
  };
  
  // Check if native share is available
  if (navigator.share && navigator.canShare?.(shareData)) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      // User cancelled or error
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error);
      }
      return false;
    }
  }
  
  // Fallback to clipboard
  return copyXtgIdToClipboard(profile);
}

// ============================================
// URL PARAMETER EXTRACTION
// ============================================

/**
 * Check if current URL has xTheGospel ID parameter
 * Useful for handling incoming links
 */
export function getXtgIdFromUrl(): string | null {
  // Check URL params
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('xtgId') || params.get('id');
  
  if (idParam && /^XTG-\d{4}-[A-Z0-9]{6}$/i.test(idParam)) {
    return idParam.toUpperCase();
  }
  
  // Check URL path: /profile/XTG-2026-ABC123 or /lookup/XTG-2026-ABC123
  const pathMatch = window.location.pathname.match(
    /\/(profile|lookup)\/(XTG-\d{4}-[A-Z0-9]{6})/i
  );
  
  if (pathMatch) {
    return pathMatch[2].toUpperCase();
  }
  
  return null;
}

// ============================================
// BROADCAST CHANNEL (Same Origin Communication)
// ============================================

type BroadcastEventType = 
  | 'profile-updated'
  | 'profile-verified'
  | 'logout';

interface BroadcastMessage {
  type: BroadcastEventType;
  payload: any;
  timestamp: number;
}

let broadcastChannel: BroadcastChannel | null = null;

/**
 * Initialize broadcast channel for cross-tab communication
 */
export function initBroadcastChannel(
  onMessage?: (message: BroadcastMessage) => void
): void {
  if (typeof BroadcastChannel === 'undefined') return;
  
  try {
    broadcastChannel = new BroadcastChannel('xthegospel-sync');
    
    if (onMessage) {
      broadcastChannel.onmessage = (event) => {
        onMessage(event.data as BroadcastMessage);
      };
    }
  } catch (error) {
    console.warn('BroadcastChannel not supported:', error);
  }
}

/**
 * Send message to other tabs/windows of the same app
 */
export function broadcastMessage(type: BroadcastEventType, payload: any): void {
  if (!broadcastChannel) return;
  
  const message: BroadcastMessage = {
    type,
    payload,
    timestamp: Date.now(),
  };
  
  broadcastChannel.postMessage(message);
}

/**
 * Close broadcast channel
 */
export function closeBroadcastChannel(): void {
  broadcastChannel?.close();
  broadcastChannel = null;
}
