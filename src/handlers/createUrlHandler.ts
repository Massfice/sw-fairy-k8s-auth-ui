import { AuthorizeRequestQuery, LogoutRequestQuery } from '../types';

const createUrlHandler = (url: string, queryParams: AuthorizeRequestQuery | LogoutRequestQuery): string => {
    const urlQueryParams = Object.keys(queryParams)
        .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
        .join('&');

    return `${url}?${urlQueryParams}`;
};

export default createUrlHandler;
