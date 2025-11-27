import { useState, useEffect, useCallback } from 'react';
import {
  MemberFriendsService,
  type MemberFriend,
  type PreparedLevel,
} from '../services/memberFriendsService';

/**
 * Hook to manage member friends list
 * 
 * This hook provides a React-friendly interface to the MemberFriendsService.
 * Currently uses local storage, but can be easily swapped to Firestore later.
 * 
 * @example
 * ```tsx
 * const { friends, addFriend, updateFriend, removeFriend, refresh } = useMemberFriends();
 * ```
 */
export const useMemberFriends = () => {
  const [friends, setFriends] = useState<MemberFriend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load friends from storage
  const refresh = useCallback(() => {
    setLoading(true);
    try {
      const loaded = MemberFriendsService.getFriends();
      setFriends(loaded);
    } catch (error) {
      console.error('Error loading friends:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Add a new friend
  const addFriend = useCallback((friend: Omit<MemberFriend, 'id'>) => {
    const newFriend = MemberFriendsService.addFriend(friend);
    setFriends((prev) => [...prev, newFriend]);
    return newFriend;
  }, []);

  // Update an existing friend
  const updateFriend = useCallback((updatedFriend: MemberFriend) => {
    MemberFriendsService.updateFriend(updatedFriend);
    setFriends((prev) =>
      prev.map((f) => (f.id === updatedFriend.id ? updatedFriend : f))
    );
  }, []);

  // Remove a friend
  const removeFriend = useCallback((friendId: string) => {
    MemberFriendsService.removeFriend(friendId);
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
  }, []);

  return {
    friends,
    loading,
    addFriend,
    updateFriend,
    removeFriend,
    refresh,
  };
};

