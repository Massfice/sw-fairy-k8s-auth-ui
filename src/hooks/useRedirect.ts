import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { User } from '../types';

import broadcastChannelHandler from '../handlers/broadcastChannelHandler';
import openWindowHandler from '../handlers/openWindowHandler';

const useRedirect = (
    messageId: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setIsOpenedWindow: Dispatch<SetStateAction<boolean>>,
    setUser: Dispatch<SetStateAction<User>>,
    constructUrl: (messageId: string) => string,
): void => {
    useEffect(() => {
        if (!messageId) {
            return;
        }

        setIsLoading(true);

        const { broadcastChannel, receiveData } = broadcastChannelHandler(messageId);

        const url = constructUrl(messageId);

        const openedWindow = openWindowHandler(url, 750, 750, () => {
            setIsOpenedWindow(false);
            setIsLoading(false);
            broadcastChannel.close();
        });

        receiveData((user) => {
            setUser(user);
            setIsLoading(false);
            openedWindow.close();
        });

        setIsOpenedWindow(true);
    }, [messageId]);
};

export default useRedirect;
