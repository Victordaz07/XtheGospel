import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AppRole = 'member' | 'leader';

const ROLE_KEY = 'app.currentRole';

interface RoleState {
  role: AppRole;
  isHydrated: boolean;
  setRole: (role: AppRole) => Promise<void>;
  hydrateRole: () => Promise<void>;
}

const createDefaultState = (): Pick<RoleState, 'role' | 'isHydrated'> => ({
  role: 'member',
  isHydrated: false,
});

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      ...createDefaultState(),
      hydrateRole: async () => {
        try {
          // The persist middleware will handle loading from localStorage
          // This is just to mark as hydrated after first load
          set({ isHydrated: true });
        } catch (e) {
          console.error('Error hydrating role from storage', e);
          set({ role: 'member', isHydrated: true });
        }
      },
      setRole: async (role: AppRole) => {
        set({ role });
      },
    }),
    {
      name: ROLE_KEY,
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Error rehydrating store:', error);
          }
          // Always mark as hydrated after rehydration attempt
          if (state) {
            state.isHydrated = true;
          }
        };
      },
    }
  )
);

// Auto-hydrate on module load for web
if (typeof globalThis !== 'undefined' && typeof (globalThis as any).window !== 'undefined') {
  // Small delay to ensure store is ready
  (globalThis as any).setTimeout(() => {
    const store = useRoleStore.getState();
    if (!store.isHydrated) {
      store.hydrateRole();
    }
  }, 0);
}

