import { CodeContextProvider } from 'components/Code/CodeContext';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MapMain from 'views/MapMain';
import Splash from 'views/Splash';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Splash />} />
        <Route path='/map' element={
          <CodeContextProvider>
            <MapMain />
          </CodeContextProvider>
        } />
      </Routes>
    </React.Fragment>
  );
}

export default App;
