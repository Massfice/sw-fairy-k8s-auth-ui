import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CallbackPage, useLogin, types } from './box';

const App = (): JSX.Element => {
    const [user, setUser] = useState<types.User>({ isLogged: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login } = useLogin({
        onUserChange: (user) => setUser(user as types.User),
        onLoadingChange: (isLoading) => setIsLoading(isLoading as boolean),
    });

    return (
        <BrowserRouter>
            <Route path='/' exact>
                <button onClick={login}>Login</button>
                {user.isLogged && (
                    <div>
                        {user.data.nick} [{user.data.email}]
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
