import './App.css';
import React from 'react';
import SignInSide from './pages/sign-in/signIn-page';
import Dashboard from './pages/dashboard/dashbord-main';
import PasswordReset from './pages/passwordReset/passwordReset-page';
import {BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import LandingPage from './pages/landing-page/landing-page';
import SignUp from './pages/sign-up/sign-up';
import Customers from './pages/customers/customers-page';
import AddCustomer from './pages/customers/add-customer-page';
import SeeCustomer from './pages/customers/seecustomer-page';
import MyMap from './utils/tests/googlemaps-test';
import FourOuFour from './pages/404/404';
import Appointments from './pages/appointments/appointments-page';
import AddAppointment from './pages/appointments/add-appointment-page';
import DepositsPage from './pages/deposits/deposits-page';


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
          <Route path='/customer/:tid' element={<SeeCustomer />} />
          <Route path='/test' element={<MyMap/>} />
          <Route path='/404' element={<FourOuFour/>} /> 
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/addappointment' element={<AddAppointment />} />
          <Route path='/addappointment/:tid' element={<AddAppointment />} />
          <Route path='/addappointment/:tid/:aid' element={<AddAppointment />} />
          <Route path='/deposits' element={<DepositsPage/>} /> 
          {/* <Route path='/reports' element={<Reports/>} /> 
          <Route path='/integrations' element={<Integrations/>} /> 
          <Route path='/setup' element={<Setup/>} />
          <Route path='/usersetup/:tid' element={<UserSetup/>} />   */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
