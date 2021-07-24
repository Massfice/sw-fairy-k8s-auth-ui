import { User } from '../types';

const broadcastChannelHandler = (
    messageId: string,
): {
    broadcastChannel: BroadcastChannel;
    sendData: (user: User) => void;
    receiveData: (onData: (user: User) => void) => void;
} => {
    const broadcastChannel = new BroadcastChannel(messageId);

    const sendData = (user: User): void => {
        broadcastChannel.postMessage(user);

        broadcastChannel.close();
    };

    const receiveData = (onData: (user: User) => void): void => {
        broadcastChannel.onmessage = (ev: MessageEvent<User>) => onData(ev.data);
    };

    return { broadcastChannel, sendData, receiveData };
};

export default broadcastChannelHandler;
