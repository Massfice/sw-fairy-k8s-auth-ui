import { useState, useEffect } from 'react';

import uuid from 'uuid';

import { User, AuthorizeRequestQuery } from '../types';
import openWindowHandler from '../handlers/openWindowHandler';
import broadcastChannelHandler from '../handlers/broadcastChannelHandler';
import createUrlHandler from '../handlers/createUrlHandler';
import useNotify from '../hooks/useNotify';

const useLogin = ({ onUserChange }: { onUserChange: (user: User) => void }): { login: () => void } => {
    const [loginId, setLoginId] = useState<string>(null);
    const [isOpenedWindow, setIsOpenedWindow] = useState<boolean>(false);
    const [user, setUser] = useState<User>({ isLogged: false });

    useEffect(() => {
        if (!loginId) {
            return;
        }

        const { broadcastChannel, receiveData } = broadcastChannelHandler(loginId);

        const query: AuthorizeRequestQuery = {
            response_type: 'code',
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            redirect_uri: `${window.location.origin}/callback`,
            scope: 'profile email openid offline_access',
            state: loginId,
        };

        const url = createUrlHandler('https://dev-9gntu7bd.eu.auth0.com/authorize', query);

        const openedWindow = openWindowHandler(url, 750, 750, () => {
            setIsOpenedWindow(false);
            broadcastChannel.close();
        });

        receiveData((user) => {
            setUser(user);
            openedWindow.close();
        });

        setIsOpenedWindow(true);
    }, [loginId]);

    useNotify<User>([
        {
            dependency: user,
            notify: onUserChange,
        },
    ]);

    const login = () => {
        if (isOpenedWindow || user.isLogged) {
            return;
        }

        const loginId = uuid.v4();

        setLoginId(loginId);
    };

    return { login };
};

export default useLogin;
