
import { create } from 'zustand';

interface IuserEmail {
    userEmail : string;
    userVerificationToken: string;
    setEmail: (email: string) => void;
    setVerificationToken: (verificationToken: string) => void;
}

export const useUserEmail = create<IuserEmail>((set) => ({
    userEmail: '',
    userVerificationToken:'',
    setEmail: (userEmail: string) => set({userEmail: userEmail }),
    setVerificationToken: (userVerificationToken: string) => set({userVerificationToken: userVerificationToken }),
}))
