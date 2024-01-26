import { create } from 'zustand';
// import { FriendRequest } from './useUser';

interface NotificationData {
    _id: string;
    userTo: string;
    userFrom: string;
    entityId: string;
    notificationType: string;
    notificationMessage: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface SenderUserData {
    _id: string;
    username: string;
    profilePicture: string;
    followers: string[];
    following: string[];
    isPrivate: boolean;
    friendRequests: any[];
}

interface SendNotification {
    _id: string;
    notificationData: NotificationData;
    senderUser: SenderUserData[];
}

interface INotificationData {
    notificationData: SendNotification[]
    setNotificationData: (notificationData: SendNotification[]) => void;
    NotificationLoading: Boolean;
    isNotificationLoading: () => void;
    onNotificationLoaded: () => void;
};

export const useNotificationData = create<INotificationData>((set) => ({
    notificationData: [],
    setNotificationData: (notificationData: SendNotification[]) => set({ notificationData }),
    NotificationLoading: false,
    isNotificationLoading: () => set({ NotificationLoading: true }),
    onNotificationLoaded: () => set({ NotificationLoading: false })

}))






