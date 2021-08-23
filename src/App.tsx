import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import CallbackPage from './pages/CallbackPage';
import User from './types/User';

const App = (): JSX.Element => {
    const [user, setUser] = useState<User>({ isLogged: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { login, logout } = useAuth({
        onUserChange: (user) => setUser(user),
        onLoadingChange: (isLoading) => setIsLoading(isLoading),
    });

    return (
        <BrowserRouter>
            <Route path='/' exact>
                <button onClick={login}>Login</button>
                <button onClick={logout}>Logout</button>
                {user.isLogged && user.data && (
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

export default App;
