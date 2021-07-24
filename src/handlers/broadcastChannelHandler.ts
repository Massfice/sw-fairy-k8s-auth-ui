import { User, BroadcastType as Type } from '../types';

const typeHandlers = {
    [Type.SEND]: (
        messageId?: string,
        broadcastChannel?: BroadcastChannel,
        onMessage?: (user: User) => void,
        data?: User,
    ): BroadcastChannel => {
        if (!broadcastChannel) {
            throw new Error('Incorrect broadcast channel');
        }

        if (!data) {
            throw new Error('Incorrect data');
        }

        broadcastChannel.postMessage(data);

        broadcastChannel.close();

        return broadcastChannel;
    },

    [Type.RECEIVE]: (
        messageId?: string,
        broadcastChannel?: BroadcastChannel,
        onMessage?: (user: User) => void,
    ): BroadcastChannel => {
        if (!broadcastChannel) {
            throw new Error('Incorrect broadcast channel');
        }

        if (!onMessage) {
            throw new Error('Incorrect message handler');
        }

        broadcastChannel.onmessage = (ev: MessageEvent<User>) => onMessage(ev.data);

        return broadcastChannel;
    },

    [Type.CREATE]: (messageId?: string): BroadcastChannel => {
        if (!messageId) {
            throw new Error('Incorect message Id');
        }

        return new BroadcastChannel(messageId);
    },
};

const broadcastChannelHandler = (
    type: Type,
    {
        messageId = null,
        broadcastChannel = null,
        onMessage = null,
        data = null,
    }: {
        messageId?: string;
        broadcastChannel?: BroadcastChannel;
        onMessage?: (user: User) => void;
        data?: User;
    },
): BroadcastChannel => {
    const handler = typeHandlers[type];

    return handler(messageId, broadcastChannel, onMessage, data);
};

export default broadcastChannelHandler;
