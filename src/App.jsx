import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import UserThunk from './redux/features/actions/user';

import Home from './Views/Home/Home';
import Login from './Views/Login';
import Signup from './Views/Signup';
import NotFound from './Views/404';
import ResetPassword from './Views/reset/ResetPassword';
import ResetVerify from './Views/ResetVerify';
import Resetfail from './Views/Resetfail';
import Header from './components/header';
import Footer from './components/footer';
import VerifyEmail from './Views/VerifyEmail';
import ChangePassword from './Views/Password';
import PrivateRoute from './components/PrivateRoute';
import Products from './Views/viewProducts';
import AddItem from './Views/products/addItem';
import User from './Views/admin/User';
// eslint-disable-next-line import/no-unresolved
import SellerCollection from './Views/SellerCollection';
// eslint-disable-next-line import/no-unresolved, import/extensions
import OneProduct from './components/OneProduct';
// eslint-disable-next-line import/no-unresolved
import Statistics from './Views/UserStatistics';

function App() {
  const { token, loading: tokenLoad } = useSelector((s) => s.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tokenLoad && token) {
      setTimeout(() => dispatch(UserThunk()), 1000);
    }
  }, [token]);

  return (
    <>
      <Header />
      <main>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
          <Route path="/verifypass" element={<ResetVerify />} />
          <Route path="/verifyfail" element={<Resetfail />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/oneProduct/:id" element={<OneProduct />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/collection" element={<SellerCollection />} />
          <Route path="/" element={<PrivateRoute path="/change-password" />}>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/products/addItem" element={<AddItem />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<PrivateRoute path="/admin/user" />}>
            <Route path="/admin/user" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
