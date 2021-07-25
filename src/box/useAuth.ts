import { useState } from 'react';

import uuid from 'uuid';

import { User, AuthorizeRequestQuery, LogoutRequestQuery, OnChangeType } from '../types';
import useRedirect from '../hooks/useRedirect';
import useNotify from '../hooks/useNotify';
import createUrlHandler from '../handlers/createUrlHandler';

const useLogin = ({
    onUserChange,
    onLoadingChange,
}: {
    onUserChange: (user: OnChangeType) => void;
    onLoadingChange: (isLoadig: OnChangeType) => void;
}): { login: () => void; logout: () => void } => {
    const [loginId, setLoginId] = useState<string>(null);
    const [logoutId, setLogoutId] = useState<string>(null);
    const [isOpenedWindow, setIsOpenedWindow] = useState<boolean>(false);
    const [user, setUser] = useState<User>({ isLogged: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useRedirect(loginId, setIsLoading, setIsOpenedWindow, setUser, (messageId: string) => {
        const query: AuthorizeRequestQuery = {
            response_type: 'code',
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            redirect_uri: `${window.location.origin}/callback`,
            scope: 'profile email openid offline_access',
            state: messageId,
        };

        return createUrlHandler('https://dev-9gntu7bd.eu.auth0.com/authorize', query);
    });

    useRedirect(logoutId, setIsLoading, setIsOpenedWindow, setUser, (messageId) => {
        const query: LogoutRequestQuery = {
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            returnTo: `${window.location.origin}/callback?state=${messageId}`,
        };

        return createUrlHandler('https://dev-9gntu7bd.eu.auth0.com/logout', query);
    });

    useNotify<OnChangeType>([
        {
            dependency: user,
            notify: onUserChange,
        },
        {
            dependency: isLoading,
            notify: onLoadingChange,
        },
    ]);

    const login = (): void => {
        if (isOpenedWindow || user.isLogged) {
            return;
        }

        const loginId = uuid.v4();

        setLoginId(loginId);
    };

    const logout = (): void => {
        if (isOpenedWindow || !user.isLogged) {
            return;
        }

        const logoutId = uuid.v4();

        setLogoutId(logoutId);
    };

    return { login, logout };
};

export default useLogin;
