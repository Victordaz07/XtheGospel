/**
 * Centralized Role Configuration
 * 
 * This file defines the canonical role system for the application.
 * 
 * IMPORTANT:
 * - Internal role keys are ALWAYS: 'investigator' | 'missionary' | 'member'
 * - UI labels (what users see) come from i18n translations
 * - Storage, routing, and logic MUST use these 3 keys only
 * - Never introduce new role strings elsewhere in the codebase
 */

export type UserRoleKey = 'investigator' | 'missionary' | 'member';

/**
 * Role metadata configuration
 * - id: Internal canonical key (used in storage, routing, logic)
 * - i18nKey: Translation key path for the role title
 * - icon: Icon identifier (can be SF symbols, heroicons, or emoji)
 * - defaultRoute: Default route when switching to this role
 */
export const ROLE_DEFINITIONS: Record<UserRoleKey, {
  id: UserRoleKey;
  i18nKey: string;
  icon: string;
  defaultRoute: string;
}> = {
  investigator: {
    id: 'investigator',
    i18nKey: 'roles.investigator.title',
    icon: '🔍',
    defaultRoute: '/home',
  },
  missionary: {
    id: 'missionary',
    i18nKey: 'roles.missionary.title',
    icon: '📘',
    defaultRoute: '/home',
  },
  member: {
    id: 'member',
    i18nKey: 'roles.member.title',
    icon: '👤',
    defaultRoute: '/member/home',
  },
};

/**
 * Array of all valid role keys
 */
export const ALL_ROLES: UserRoleKey[] = ['investigator', 'missionary', 'member'];

/**
 * Normalizes a stored role value to a canonical UserRoleKey
 * 
 * This function handles legacy/migrated role strings and converts them
 * to the canonical internal keys. Use this when reading from storage.
 * 
 * @param value - Raw value from storage (may be legacy string)
 * @returns Canonical UserRoleKey or null if invalid
 */
export function normalizeStoredRole(value: string | null): UserRoleKey | null {
  if (!value) return null;

  const normalized = value.toLowerCase().trim();

  // Canonical keys
  switch (normalized) {
    case 'investigator':
    case 'missionary':
    case 'member':
      return normalized as UserRoleKey;
  }

  // Legacy/invalid keys - migrate to canonical
  switch (normalized) {
    case 'investigador':
    case 'friend':
    case 'amigo':
    case 'learning':
      return 'investigator';
    case 'misionero':
    case 'serving':
      return 'missionary';
    case 'miembro':
      return 'member';
    default:
      console.warn(`[roles] Invalid role value in storage: "${value}". Defaulting to null.`);
      return null;
  }
}

/**
 * Validates if a string is a valid UserRoleKey
 */
export function isValidRole(value: string | null): value is UserRoleKey {
  return value !== null && ALL_ROLES.includes(value as UserRoleKey);
}

/**
 * Gets the default route for a role
 */
export function getRoleDefaultRoute(role: UserRoleKey): string {
  return ROLE_DEFINITIONS[role].defaultRoute;
}

/**
 * Gets the i18n key for a role's display title
 */
export function getRoleI18nKey(role: UserRoleKey): string {
  return ROLE_DEFINITIONS[role].i18nKey;
}

