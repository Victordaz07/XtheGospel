import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { MemberMissionaryProfile } from '../types/memberProfile';

interface UseMemberProfileReturn {
  profile: MemberMissionaryProfile | null;
  loading: boolean;
  error?: Error;
}

/**
 * Hook to load member profile data.
 * For now, this is a placeholder that returns mock data.
 * Later, this should read from Firestore: memberProfiles/{uid}
 */
export const useMemberProfile = (): UseMemberProfileReturn => {
  const { userRole } = useAuth();
  const [profile, setProfile] = useState<MemberMissionaryProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const loadProfile = async () => {
      // Only load profile for members
      if (userRole !== 'member') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // TODO: Replace with actual Firestore fetch
        // For now, return mock data with isLeader: false by default
        // To test leader view, temporarily set isLeader: true
        const mockProfile: MemberMissionaryProfile = {
          uid: 'mock-uid',
          servedFullTimeMission: false,
          experienceLevel: 'none',
          preferredRoles: [],
          languages: [],
          availability: {
            weekdaysEvenings: false,
            weekdaysMornings: false,
            weekends: false,
            onlineOnly: false,
            inPerson: false,
          },
          roleFlags: {
            isLeader: false, // Change to true to test leader view
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        setProfile(mockProfile);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load profile'));
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userRole]);

  return { profile, loading, error };
};

