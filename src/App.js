import './App.css';
import React from 'react';
import { Button } from '@mui/material';
import SignInSide from './pages/sign-in/signIn-page';
import Dashboard from './pages/dashboard/dashbord-test';
import PasswordReset from './pages/passwordReset/passwordReset-page';

function App() {

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
