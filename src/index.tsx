import React, { useState } from 'react';
import ReactDom from 'react-dom';

const App = (): JSX.Element => {
    const [test, setTest] = useState(false);

    const click = () => {
        setTest(true);
    };

    return (
        <div>
            {test && <div>My awsome App!</div>}
            <button onClick={click}>Button</button>
        </div>
    );
};

ReactDom.render(<App />, document.getElementById('app') as HTMLElement);
