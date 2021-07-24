import { useReducer, useState, useEffect } from 'react';
import { Dispatch, SetStateAction, Reducer } from 'react';

import uuid from 'uuid';

import { User, LoginAction } from '../types';
import openWindowHandler from '../handlers/openWindowHandler';
import broadcastChannelHandler from '../handlers/broadcastChannelHandler';
import createUrlHandler from '../handlers/createUrlHandler';
import AuthorizeRequestQuery from '../types/AuthorizeRequestQuery';

const reducer: React.Reducer<User, LoginAction> = (prevUser) => {
    return prevUser;
};

const useLogin = (): { user: User; login: () => void } => {
    const [loginId, setLoginId]: [string, Dispatch<SetStateAction<string>>] = useState<string>(null);
    const [isOpenedWindow, setIsOpenedWindow]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [user]: [User, Dispatch<LoginAction>] = useReducer<Reducer<User, LoginAction>, User>(
        reducer,
        { isLogged: false },
        (user) => user,
    );

    useEffect(() => {
        if (!loginId) {
            return;
        }

        const { broadcastChannel, receiveData } = broadcastChannelHandler(loginId);

        const query: AuthorizeRequestQuery = {
            response_type: 'code',
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            redirect_uri: 'http://localhost:3001/callback',
            scope: 'profile email openid offline_access',
            state: loginId,
        };

        const url = createUrlHandler('https://dev-9gntu7bd.eu.auth0.com/authorize', query);

        const openedWindow = openWindowHandler(url, 750, 750, () => {
            setIsOpenedWindow(false);
            broadcastChannel.close();
        });

        receiveData((user) => {
            console.log(user);
            openedWindow.close();
        });

        setIsOpenedWindow(true);
    }, [loginId]);

    const login = () => {
        if (isOpenedWindow || user.isLogged) {
            return;
        }

        const loginId = uuid.v4();

        setLoginId(loginId);
    };

    return { login, user };
};

export default useLogin;
