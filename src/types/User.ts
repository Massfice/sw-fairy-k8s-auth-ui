interface UserData {
    nick: string;
    email: string;
}

export default interface User {
    data?: UserData;
    token?: string | null;
    isLogged: boolean;
}
