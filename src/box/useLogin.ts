import { useReducer, useEffect, useState } from 'react';
import { Dispatch, SetStateAction, Reducer } from 'react';

import uuid from 'uuid';

import { User, LoginAction } from '../types';
import openWindowHandler from '../handlers/openWindowHandler';

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

        openWindowHandler('https://google.com', 750, 750, () => setIsOpenedWindow(false));

        setIsOpenedWindow(true);
    }, [loginId]);

    const login = () => {
        if (isOpenedWindow) {
            return;
        }

        const loginId = uuid.v4();

        setLoginId(loginId);
    };

    return { login, user };
};

export default useLogin;
