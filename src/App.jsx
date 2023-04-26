/* eslint-disable react/button-has-type */
import './App.scss';
import './components/GoogleLoginButton.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Views/Home';
import Login from './Views/Login';
import NotFound from './Views/404';
import GoogleLoginButton from './components/GoogleLoginButton';
import ResetPassword from './Views/reset/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/google" element={<GoogleLoginButton />} />
        <Route path="/reset-pass" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
