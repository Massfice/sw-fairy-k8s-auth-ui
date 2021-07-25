import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import broadcastChannelHandler from '../handlers/broadcastChannelHandler';
import { MessageType } from '../types';

const CallbackPage = (): JSX.Element => {
    const query = new URLSearchParams(useLocation().search);

    const state = query.get('state');
    const code = query.get('code');

    if (!state) {
        return <div></div>;
    }

    const { type } = JSON.parse(window.atob(state));

    const text = {
        [MessageType.LOGIN]: 'Login',
        [MessageType.LOGOUT]: 'Logout',
    };

    useEffect(() => {
        setTimeout(() => {
            const { sendData } = broadcastChannelHandler({ id: state });

            const data = {
                [MessageType.LOGIN]: {
                    isLogged: true,
                    data: {
                        nick: 'Jhon Doe',
                        email: 'jhon@gmail.com',
                    },
                },
                [MessageType.LOGOUT]: {
                    isLogged: false,
                },
            };

            sendData({
                ...data[type],
                token: code,
            });
        }, 1000);
    }, []);

    return <div>{text[type]} success!</div>;
};

export default CallbackPage;
