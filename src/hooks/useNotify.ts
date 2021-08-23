import { useEffect } from 'react';
import NotifyHandler from '../types/NotifyHandler';

const useNotify = <T>(handler: NotifyHandler<T>): void => {
    useEffect(() => handler.notify(handler.dependency), [handler.dependency]);
};

export default useNotify;
