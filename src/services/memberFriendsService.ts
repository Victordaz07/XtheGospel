import { StorageService } from '../utils/storage';

const STORAGE_KEY = 'memberFriends';

export type PreparedLevel = 'cold' | 'warm' | 'hot';

export interface MemberFriendInteraction {
  id: string;
  description: string;
  date: string;
}

export interface MemberFriend {
  id: string;
  name: string;
  relationship: string;
  spiritualSituation: string;
  lastPositiveContact: string;
  preparedLevel: PreparedLevel;
  notes: string;
  isPraying: boolean;
  readyForMissionaries: boolean;
  interactions: MemberFriendInteraction[];
}

const readFriends = (): MemberFriend[] => {
  const raw = StorageService.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as MemberFriend[];
  } catch (error) {
    console.error('Error parsing member friends from storage', error);
    return [];
  }
};

const writeFriends = (friends: MemberFriend[]) => {
  StorageService.setItem(STORAGE_KEY, JSON.stringify(friends));
};

export const MemberFriendsService = {
  getFriends: (): MemberFriend[] => {
    return readFriends();
  },
  saveFriends: (friends: MemberFriend[]) => {
    writeFriends(friends);
  },
  addFriend: (friend: Omit<MemberFriend, 'id'>): MemberFriend => {
    const current = readFriends();
    const newFriend: MemberFriend = { ...friend, id: Date.now().toString() };
    current.push(newFriend);
    writeFriends(current);
    return newFriend;
  },
  updateFriend: (updatedFriend: MemberFriend) => {
    const current = readFriends().map((friend) =>
      friend.id === updatedFriend.id ? updatedFriend : friend
    );
    writeFriends(current);
  },
  removeFriend: (friendId: string) => {
    const current = readFriends().filter((friend) => friend.id !== friendId);
    writeFriends(current);
  },
};

