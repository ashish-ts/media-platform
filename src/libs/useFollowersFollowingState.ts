import {create} from 'zustand';

interface FollowersFollowingState  {
  updatedFollowers: string[] | undefined ;
  updatedFollowing: string[]  | undefined ;
  setUpdatedFollowers: (updatedFollowers: string[] ) => void;
  setUpdatedFollowing: (updatedFollowing: string[] ) => void;
};

export const useFollowersFollowingState = create<FollowersFollowingState>((set) => ({
    updatedFollowers: [],
    updatedFollowing: [],
    setUpdatedFollowers: (updatedFollowers) => set({updatedFollowers}),
    setUpdatedFollowing: (updatedFollowing) => set({updatedFollowing}),
}));