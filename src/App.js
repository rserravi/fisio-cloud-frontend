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
          <Route path='/customer/:tid/:tab' element={<SeeCustomer />} />
          <Route path='/404' element={<FourOuFour/>} /> 
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/addappointment' element={<AddAppointment />} />
          <Route path='/addappointment/:customerId' element={<AddAppointment />} />
          <Route path='/addappointment/:customerId/:appoId' element={<AddAppointment />} />
          <Route path='/deposits' element={<DepositsPage/>} /> 
          <Route path='/communications' element={<Communications />} />
          <Route path='/addcommunication/' element={<AddCommunication />} />
          <Route path='/addcommunication/:customerid' element={<AddCommunication />} />
          <Route path='/addcommunication/:customerid/:thread' element={<AddCommunication />} />
          <Route path='/addcommunication/:customerid/:thread/:action' element={<AddCommunication />} />
          <Route path='/addcommunication/:customerid/:thread/:action/:phonemail' element={<AddCommunication />} />
          <Route path='/edithistory/:customerId/:appoId' element={<EditHistory />} />
          <Route path="/reports/:period" element={<Reports />} />
          <Route path='/usersetup/:tid' element={<UserSetup/>} /> 
          <Route path='/setup' element={<Setup/>} />
          <Route path='/calendar' element={<BigCalendar />} />
          {/* 
         
          <Route path='/integrations' element={<Integrations/>} /> 
          */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
