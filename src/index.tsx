import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CallbackPage, useLogin } from './box';
import { User } from './types';

const App = (): JSX.Element => {
    const { login } = useLogin({ onUserChange: (user: User) => console.log(user) });

    return (
        <BrowserRouter>
            <Route path='/' exact>
                <button onClick={login}>Login</button>
            </Route>
            <Route path='/callback'>
                <CallbackPage />
            </Route>
        </BrowserRouter>
    );
};

ReactDom.render(<App />, document.getElementById('app') as HTMLElement);
