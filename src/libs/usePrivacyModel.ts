
import { create } from "zustand";

interface IUsePrivacyModel {
    isPrivacyOpen: boolean;
    onPrivacyOpen: () => void;
    onPrivacyClose: () => void;
    switchPrivacy: 'Public' | 'Private';
    switchToPublic: (switchPrivacy: 'Public') => void;
    switchToPrivate: (switchPrivacy: 'Private') => void;
};

export const usePrivacyModel = create<IUsePrivacyModel>((set) => ({
    isPrivacyOpen: false,
    switchPrivacy:'Public',
    onPrivacyClose: () => set({ isPrivacyOpen: false }),
    onPrivacyOpen: () => set({ isPrivacyOpen: true }),
    switchToPublic: (switchPrivacy) => set({switchPrivacy}),
    switchToPrivate: (switchPrivacy) => set({switchPrivacy})
    
})) 