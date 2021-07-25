import { User, MessageType } from '../types';

const broadcastChannelHandler = ({
    id,
    type,
}: {
    id: string;
    type?: MessageType;
}): {
    broadcastChannel: BroadcastChannel;
    messageId: string;
    sendData: (user: User) => void;
    receiveData: (onData: (user: User) => void) => void;
} => {
    const messageId: string = type ? window.btoa(JSON.stringify({ id, type })) : id;

    const broadcastChannel = new BroadcastChannel(messageId);

    const sendData = (user: User): void => {
        broadcastChannel.postMessage(user);

        broadcastChannel.close();
    };

    const receiveData = (onData: (user: User) => void): void => {
        broadcastChannel.onmessage = (ev: MessageEvent<User>) => onData(ev.data);
    };

    return { broadcastChannel, messageId, sendData, receiveData };
};

export default broadcastChannelHandler;
