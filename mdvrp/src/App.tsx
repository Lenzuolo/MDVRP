import React from 'react';
import logo from './logo.svg';
import { LandingPage } from './components';
import './App.css';
import { MainContextProvider } from './contexts';

function App() {
  return (
    <div className="App">
      <MainContextProvider>
        <LandingPage/>
      </MainContextProvider>
    </div>
  );
}

export default App;
