import React from 'react';
import CounterAppOne from './components/CounterAppOne';

const App = (): JSX.Element => (
    <div style={{ margin: '20px' }}>
        <div>APP-1 - S4</div>
        <div>
            <CounterAppOne />
        </div>
    </div>
);

export default App;
