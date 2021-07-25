import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { User, MessageType } from '../types';

import broadcastChannelHandler from '../handlers/broadcastChannelHandler';
import openWindowHandler from '../handlers/openWindowHandler';

const useRedirect = (
    messageId: string,
    type: MessageType,
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

        const {
            broadcastChannel,
            messageId: _messageId,
            receiveData,
        } = broadcastChannelHandler({ id: messageId, type });

        const url = constructUrl(_messageId);

        const openedWindow = openWindowHandler(url, screen.width / 2, screen.height / 1.5, () => {
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
