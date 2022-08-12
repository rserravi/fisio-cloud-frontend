import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import SignInSide from './pages/sign-in/signIn-page';
import Dashboard from './pages/dashboard/dashbord-main';
import PasswordReset from './pages/passwordReset/passwordReset-page';
import LandingPage from './pages/landing-page/landing-page';
import SignUp from './pages/sign-up/sign-up';
import Customers from './pages/customers/customers-page';
import AddCustomer from './pages/customers/add-customer-page';
import SeeCustomer from './pages/customers/seecustomer-page';
import FourOuFour from './pages/404/404';
import Appointments from './pages/appointments/appointments-page';
import AddAppointment from './pages/appointments/add-appointment-page';
import DepositsPage from './pages/deposits/deposits-page';
import UserSetup from './pages/userSetup/user-setup-page';
import Setup from './pages/setup/setup-page';
import Communications from './pages/communications/communications-page';
import AddCommunication from './pages/communications/add-communications-page';
import BigCalendar from './pages/calendar/calendar-page';
import EditHistory from './pages/history/history-page';
import Reports from './pages/reports/reports-page';
import { PrivateRoute } from './components/PrivateRoute-comp';


function App() {


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path="/signin" element={<SignInSide />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/404' element={<FourOuFour/>} />
        </Routes>
          <PrivateRoute path="/dashboard" element={<Dashboard />} />
          <PrivateRoute path="/customers" element={<Customers />} />
          <PrivateRoute path="/addcustomer" element={<AddCustomer />} />
          <PrivateRoute path='/customer/:tid' element={<SeeCustomer />} />
          <PrivateRoute path='/customer/:tid/:tab' element={<SeeCustomer />} />
          <PrivateRoute path='/appointments' element={<Appointments />} />
          <PrivateRoute path='/addappointment' element={<AddAppointment />} />
          <PrivateRoute path='/addappointment/:customerId' element={<AddAppointment />} />
          <PrivateRoute path='/addappointment/:customerId/:appoId' element={<AddAppointment />} />
          <PrivateRoute path='/deposits' element={<DepositsPage/>} /> 
          <PrivateRoute path='/communications' element={<Communications />} />
          <PrivateRoute path='/addcommunication/' element={<AddCommunication />} />
          <PrivateRoute path='/addcommunication/:customerid' element={<AddCommunication />} />
          <PrivateRoute path='/addcommunication/:customerid/:thread' element={<AddCommunication />} />
          <PrivateRoute path='/addcommunication/:customerid/:thread/:action' element={<AddCommunication />} />
          <PrivateRoute path='/addcommunication/:customerid/:thread/:action/:phonemail' element={<AddCommunication />} />
          <PrivateRoute path='/edithistory/:customerId/:histoId' element={<EditHistory />} />
          <PrivateRoute path="/reports/:period" element={<Reports />} />
          <PrivateRoute path='/usersetup/' element={<UserSetup/>} /> 
          <PrivateRoute path='/usersetup/:tid' element={<UserSetup/>} /> 
          <PrivateRoute path='/setup' element={<Setup/>} />
          <PrivateRoute path='/calendar' element={<BigCalendar />} />
          {/* 
         
          <Route path='/integrations' element={<Integrations/>} /> 
          */}
      </Router>

    </div>
  );
}

export default App;
