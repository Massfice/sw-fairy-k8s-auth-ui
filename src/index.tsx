import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CallbackPage, useAuth, User } from './box';

const App = (): JSX.Element => {
    const [user, setUser] = useState<User>({ isLogged: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login, logout } = useAuth({
        onUserChange: (user) => setUser(user as User),
        onLoadingChange: (isLoading) => setIsLoading(isLoading as boolean),
    });

    return (
        <BrowserRouter>
            <Route path='/' exact>
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
                {user.isLogged && (
                    <div>
                        {user.data.nick} [{user.data.email}] [code: {user.token}]
                    </div>
                )}
                {isLoading && <div>Loading...</div>}
            </Route>
            <Route path='/callback'>
                <CallbackPage />
            </Route>
        </BrowserRouter>
    );
};

ReactDom.render(<App />, document.getElementById('app') as HTMLElement);
