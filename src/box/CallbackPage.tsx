import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import broadcastChannelHandler from '../handlers/broadcastChannelHandler';

const CallbackPage = (): JSX.Element => {
    const query = new URLSearchParams(useLocation().search);

    const state = query.get('state');
    const code = query.get('code');

    if (!state) {
        return <div></div>;
    }

    useEffect(() => {
        setTimeout(() => {
            const { sendData } = broadcastChannelHandler(state);

            sendData({
                isLogged: true,
                data: {
                    nick: 'Jhon',
                    email: 'jhon@gmail.com',
                },
                token: JSON.stringify({ state, code }),
            });
        }, 1000);
    }, []);

    return <div>Login success!</div>;
};

export default CallbackPage;
