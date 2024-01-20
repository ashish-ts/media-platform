"use client";

import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

import { useSocket } from '@/contexts/socket-provider';
import { IConfirmRequestProps } from '@/types/type';


const ConfirmRequest: React.FC<IConfirmRequestProps> = ({ isSenderConfirmOrRejected,  setIsSenderConfirmOrRejected, friendRequests, receiverId, senderId, notification }) => {

    const { socket } = useSocket();

    const [isCancelLoading, setIsCancelLoading] = useState(false);
    const [isConfirmLoading, setIsConfirmLoading] = useState(false);
    const [senderConfirmOrRejected, setSenderConfirmOrRejected] = useState(friendRequests);

    useEffect(() => {
        if (senderConfirmOrRejected) {
            const isSenderConfirmOrRejectedsent = senderConfirmOrRejected.some((request) =>
                request.receiverId === senderId && request.status === 'pending'
            );
            console.log('isSenderConfirmOrRejectedsent', isSenderConfirmOrRejectedsent)
            setIsSenderConfirmOrRejected(isSenderConfirmOrRejectedsent)
        }

    }, [receiverId, senderConfirmOrRejected, senderId]);

    useEffect(() => {
        socket.on('connect', () => {
            socket.on('confirmRequest', (data: any) => {
                if (data.senderUser._id === receiverId) {
                    console.log(data.senderUser._id === receiverId)
                    setSenderConfirmOrRejected(data.senderUser.friendRequests);
                }
            });
            return () => {
                socket.off('confirmRequest');
            }
        })
    }, [socket, receiverId]);

    const handleCancelRequest = async () => {
        try {
            setIsCancelLoading(true);

            await axios.post('/api/socket/cancelFollowRequest', { senderId: senderId, receiverId: receiverId });

            setIsCancelLoading(false);
        } catch (error: any) {

            console.log(error);
            throw new Error(error);
        }
    }

    const handleConfirmRequest = async () => {
        try {
            setIsConfirmLoading(true);

            await axios.post('/api/socket/confirmFollowRequest', { senderId: senderId, receiverId: receiverId });

            setIsConfirmLoading(false);

        } catch (error: any) {
            console.log(error)
            throw new Error(error)
        }
    }

    return (
        <>
            {isSenderConfirmOrRejected &&
                <div className={` ${notification === 'notify' ? 'h-full w-[110px] ' : 'h-[74px] w-full'} flex justify-center items-center`}>
                    <div className={`w-full h-full flex justify-center  ${notification === 'notify' ? 'gap-2' : 'gap-20'}  items-center `}>
                        <button className={`${notification === 'notify' ? 'px-[8px] py-[4px] text-[14px] rounded-md' : 'px-8 py-2 text-md rounded-lg'} bg-[#2f8bfc] text-white  font-semibold border-none outline-none`}
                            onClick={handleConfirmRequest}
                        >
                            {isConfirmLoading
                                ? 'Loading..'
                                : 'Confirm'
                            }

                        </button>
                        <button className={`${notification === 'notify' ? 'px-2 py-1 text-sm' : 'px-8 py-2 text-md'} dark:bg-neutral-900  text-neutral-600 font-semibold rounded-lg outline-none border-none`}
                            onClick={handleCancelRequest}
                        >
                            {isCancelLoading
                                ? <ClipLoader color='#525151' size={14} loading={true} />
                                : <FaTimes />
                            }
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default ConfirmRequest