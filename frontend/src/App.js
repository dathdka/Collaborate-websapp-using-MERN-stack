import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import LoginPage from './authPages/LoginPage/LoginPage';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import DashBoard from './Dashboard/DashBoard';
import AlertNotification from './shared/components/AlertNotification';
function App() {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path='/login' element={<LoginPage/>} />
            <Route exact path='/register' element={<RegisterPage/>} />
            <Route exact path='/dashboard' element={<DashBoard/>} />
            <Route exact path='/' element={<Navigate to="/dashboard" replace />} />
          </Routes>
      </Router>
      <AlertNotification />
      </>
  );
}

export default App;
