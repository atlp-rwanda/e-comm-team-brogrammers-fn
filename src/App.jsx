/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import './App.scss';

import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Home from './Views/Home';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Login from './Views/Login';
// eslint-disable-next-line import/no-named-as-default
import Signup from './Views/Signup';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import NotFound from './Views/404';
// eslint-disable-next-line no-unused-vars
import ResetPassword from './Views/reset/ResetPassword';
import GoogleLoginButton from './components/GoogleLoginButton';
import ResetVerify from './Views/ResetVerify';
import Header from './components/header';
import Footer from './components/footer';
import VerifyEmail from './Views/VerifyEmail';
import Products from './Views/viewProducts';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
          <Route path="/verifypass" element={<ResetVerify />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login/google" element={<GoogleLoginButton />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
