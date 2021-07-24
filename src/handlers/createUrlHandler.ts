import AuthorizeRequestQuery from '../types/AuthorizeRequestQuery';

const createUrlHandler = (url: string, queryParams: AuthorizeRequestQuery): string => {
    const urlQueryParams = Object.keys(queryParams)
        .map((key) => `${key}=${encodeURIComponent(queryParams[key] as string)}`)
        .join('&');

    return `${url}?${urlQueryParams}`;
};

export default createUrlHandler;
