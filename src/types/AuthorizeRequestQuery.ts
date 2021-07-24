export default interface AuthorizeRequestQuery {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
}
