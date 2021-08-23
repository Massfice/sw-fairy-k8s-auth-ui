import AuthorizeRequestQuery from '../types/AuthorizeRequestQuery';
import LogoutRequestQuery from '../types/LogoutRequestQuery';

const createUrlHandler = (url: string, queryParams: AuthorizeRequestQuery | LogoutRequestQuery): string => {
    const urlQueryParams = Object.keys(queryParams)
        .map(
            (key) =>
                `${key}=${encodeURIComponent(
                    queryParams[key as keyof (AuthorizeRequestQuery | LogoutRequestQuery)] as string,
                )}`,
        )
        .join('&');

    return `${url}?${urlQueryParams}`;
};

export default createUrlHandler;
