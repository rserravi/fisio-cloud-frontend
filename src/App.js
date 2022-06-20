import './App.css';
import React from 'react';
import SignInSide from './pages/sign-in/signIn-page';
import Dashboard from './pages/dashboard/dashbord-main';
import PasswordReset from './pages/passwordReset/passwordReset-page';
import {BrowserRouter as Router, Routes, Switch,  Route, Link} from "react-router-dom";
import LandingPage from './pages/landing-page/landing-page';
import SignUp from './pages/sign-up/sign-up';
import Customers from './pages/customers/customers-page';
import AddCustomer from './pages/customers/add-customer-page';


function App() {

  return (
    <div className="App">

      <Router><Routes>
         <Route exact path='/' element={<LandingPage />}/>
       </Routes>
        <Routes>
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/addcustomer" element={<AddCustomer />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
