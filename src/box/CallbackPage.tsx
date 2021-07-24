import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import broadcastChannelHandler from '../handlers/broadcastChannelHandler';

import { BroadcastType } from '../types';

const CallbackPage = (): JSX.Element => {
    const query = new URLSearchParams(useLocation().search);

    const state = query.get('state');

    if (!state) {
        return <div></div>;
    }

    useEffect(() => {
        setTimeout(() => {
            const broadcastChannel = broadcastChannelHandler(BroadcastType.CREATE, { messageId: state });
            broadcastChannelHandler(BroadcastType.SEND, {
                broadcastChannel,
                data: {
                    isLogged: true,
                    data: {
                        nick: 'Jhon',
                        email: 'jhon@gmail.com',
                    },
                    token: state,
                },
            });
        }, 1000);
    }, []);

    return <div>Login success!</div>;
};

export default CallbackPage;
