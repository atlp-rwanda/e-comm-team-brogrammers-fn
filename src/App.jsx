/* eslint-disable import/no-extraneous-dependencies */
import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import Products from './Views/products/viewProducts';
import AddItem from './Views/products/addItem';
import User from './Views/admin/User';
import SellerCollection from './Views/SellerCollection';
import OneProduct from './components/OneProduct';
import Statistics from './Views/UserStatistics';
import ManageProducts from './Views/products/ManageProducts';
import Settings from './components/Settings/Settings';
import PaymentSuccessPage from './Views/payments/Success';
import PaymentFailurePage from './Views/payments/Failure';
import Cart from './Views/Cart';
import GetOrder from './Views/orders/getOne';
import Orders from './Views/orders';
import ViewWishlist from './Views/ViewWishlist';

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
      <ToastContainer />
      <Toaster position="top-right" />
      <main>
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
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/products/addItem" element={<AddItem />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route
            path="/collection/manageProducts"
            element={<ManageProducts />}
          />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/orders/:id" element={<GetOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/orders/:id/payment-success"
              element={<PaymentSuccessPage />}
            />
            <Route
              path="/orders/payment-failed"
              element={<PaymentFailurePage />}
            />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<PrivateRoute path="/admin/user" />}>
            <Route path="/admin/user" element={<User />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/wishlist" element={<ViewWishlist />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
