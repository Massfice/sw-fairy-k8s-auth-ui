import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

import { User } from '../types';

const CallbackPage = (): JSX.Element => {
    const query = new URLSearchParams(useLocation().search);

    const state = query.get('state');

    if (!state) {
        return <div></div>;
    }

    useEffect(() => {
        const broadcastChannel = new BroadcastChannel(state);

        setTimeout(() => {
            broadcastChannel.postMessage({
                isLogged: true,
                data: {
                    nick: 'Jhon',
                    email: 'jhon@gmail.com',
                },
                token: state,
            } as User);

            broadcastChannel.close();
        }, 5000);
    }, []);

    return <div>Login success!</div>;
};

export default CallbackPage;
