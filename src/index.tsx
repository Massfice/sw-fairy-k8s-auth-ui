import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { CallbackPage } from './box';

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Route path='/' exact>
                <button>Login</button>
            </Route>
            <Route path='/callback'>
                <CallbackPage />
            </Route>
        </BrowserRouter>
    );
};

ReactDom.render(<App />, document.getElementById('app') as HTMLElement);
