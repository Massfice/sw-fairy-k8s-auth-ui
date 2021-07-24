import { useEffect } from 'react';
import { NotifyHandler } from '../types';

const useNotify = <T>(handlers: NotifyHandler<T>[]): void => {
    for (const handler of handlers) {
        useEffect(() => handler.notify(handler.dependency), [handler.dependency]);
    }
};

export default useNotify;
