import React from 'react';
import Header from './header';
import Content from './content';

const App = () => (
    <>
        <Header />
        <Content itemsLength={10} />
    </>
);

export default App;
