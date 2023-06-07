/* eslint-disable import/no-extraneous-dependencies */
import './App.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { io } from 'socket.io-client';
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
import UserProfile from './Views/UserProfile/UserProfile';
import GetOrder from './Views/orders/getOne';
import Orders from './Views/orders';
import ViewWishlist from './Views/ViewWishlist';
import CustomerSupport from './components/CustomerSupport';
import AdminOrders from './Views/admin/Orders';
import Adminmessage from './Views/admin/massage';
import LogsComponent from './Views/Logs';
import Dash from './Views/admin/Dash';
import SuccessSubscription from './Views/subscribe/success-subscription';
import AdminSubscribe from './Views/admin/subscribers';
import ChatIcon from './components/ChatIcon';

function App() {
  const room = 'brogrammers';
  const socket = io.connect('https://brogrammers-ecomerce1.onrender.com');
  socket.emit('join_room', room);
  const {
    user: { user },
  } = useSelector((state) => state);
  const { token, loading: tokenLoad } = useSelector((s) => s.login);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (!tokenLoad && token) {
      setTimeout(() => dispatch(UserThunk()), 1000);
    }
  }, [token]);

  const shouldRenderChatbot = () => {
    const allowedRoutes = [
      '/',
      '/cart',
      '/change-password',
      '/products',
      '/orders',
      '/settings',
      '/userprofile',
    ];
    const currentRoute = location.pathname;
    return allowedRoutes.includes(currentRoute);
  };

  useEffect(() => {
    setIsChatOpen(shouldRenderChatbot());
  }, [location.pathname]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Toaster position="top-right" />
      {isChatOpen && <ChatIcon socket={socket} room={room} user={user} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
          <Route path="/verifypass" element={<ResetVerify />} />
          <Route path="/verifyfail" element={<Resetfail />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/oneProduct/:id" element={<OneProduct />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/collection" element={<SellerCollection />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/products/addItem" element={<AddItem />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/settings" element={<Settings />} />
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
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/subscribe/success"
              element={<SuccessSubscription />}
            />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<PrivateRoute path="/admin/user" />}>
            <Route path="/logs" element={<LogsComponent />} />
            <Route path="/admin/user" element={<User />} />
            <Route path="/home" element={<Dash />} />
            <Route path="/admin/subscribes" element={<AdminSubscribe />} />
          </Route>
          <Route path="/" element={<PrivateRoute path="/admin/orders" />}>
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="/" element={<PrivateRoute path="/admin/orders" />}>
            <Route path="/admin/message" element={<Adminmessage />} />
          </Route>
          <Route path="/wishlist" element={<ViewWishlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
