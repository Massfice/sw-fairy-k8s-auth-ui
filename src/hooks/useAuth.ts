import { useState } from 'react';

import { v4 } from 'uuid';

import User from '../types/User';
import MessageType from '../types/MessageType';
import AuthorizeRequestQuery from '../types/AuthorizeRequestQuery';
import LogoutRequestQuery from '../types/LogoutRequestQuery';

import useRedirect from '../hooks/useRedirect';
import useNotify from '../hooks/useNotify';
import createUrlHandler from '../handlers/createUrlHandler';

const useAuth = ({
    onUserChange,
    onLoadingChange,
}: {
    onUserChange: (user: User) => void;
    onLoadingChange: (isLoadig: boolean) => void;
}): { login: () => void; logout: () => void } => {
    const [loginId, setLoginId] = useState<string | null>(null);
    const [logoutId, setLogoutId] = useState<string | null>(null);
    const [isOpenedWindow, setIsOpenedWindow] = useState<boolean>(false);
    const [user, setUser] = useState<User>({ isLogged: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useRedirect(loginId, MessageType.LOGIN, setIsLoading, setIsOpenedWindow, setUser, (messageId: string) => {
        const query: AuthorizeRequestQuery = {
            response_type: 'code',
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            redirect_uri: `${window.location.origin}/callback`,
            scope: 'profile email openid offline_access',
            state: messageId,
        };

        return createUrlHandler('https://dev-9gntu7bd.eu.auth0.com/authorize', query);
    });

    useRedirect(logoutId, MessageType.LOGOUT, setIsLoading, setIsOpenedWindow, setUser, (messageId) => {
        const query: LogoutRequestQuery = {
            client_id: 'ixIHAKVHg7ksQveRimdvsphtOdkVAbSh',
            returnTo: `${window.location.origin}/callback?state=${messageId}`,
        };

        return createUrlHandler('https://dev-9gntu7bd.eu.auth0.com/logout', query);
    });

    useNotify<User>({ dependency: user, notify: onUserChange });
    useNotify<boolean>({
        dependency: isLoading,
        notify: onLoadingChange,
    });

    const login = (): void => {
        if (isOpenedWindow || user.isLogged) {
            return;
        }

        const loginId = v4();

        setLoginId(loginId);
    };

    const logout = (): void => {
        if (isOpenedWindow || !user.isLogged) {
            return;
        }

        const logoutId = v4();

        setLogoutId(logoutId);
    };

    return { login, logout };
};

export default useAuth;
