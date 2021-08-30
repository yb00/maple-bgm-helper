import React, { ReactElement } from 'react';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import { DataSourceProvider } from './context/DataSourceContext';

const App = (): ReactElement => {
    return (
        <DataSourceProvider>
            <Navbar />
            <HomePage />
        </DataSourceProvider>
    );
};

export default App;
