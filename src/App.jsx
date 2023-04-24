import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserThunk from './redux/features/actions/user';
import Home from './Views/Home';
import Login from './Views/Login';
import Signup from './Views/Signup';
import NotFound from './Views/404';
import ResetPassword from './Views/reset/ResetPassword';
import GoogleLoginButton from './components/GoogleLoginButton';
<<<<<<< HEAD
import ResetVerify from './Views/ResetVerify';
import Resetfail from './Views/Resetfail';
import Header from './components/header';
import Footer from './components/footer';
import VerifyEmail from './Views/VerifyEmail';
import ChangePassword from './Views/Password';
import PrivateRoute from './components/PrivateRoute';
=======
import Header from './components/header';
import Footer from './components/footer';
>>>>>>> 38452ef (feat(buyer retieve all items):buyer should retrieve all items on available products #184995818)
import Products from './Views/viewProducts';
import AddItem from './Views/products/addItem';
import User from './Views/admin/User';

function App() {
  const { token, loading: tokenLoad } = useSelector((s) => s.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tokenLoad && token) {
      setTimeout(() => dispatch(UserThunk()), 1000);
    }
  }, [token]);

  return (
<<<<<<< HEAD
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
          <Route path="/" element={<PrivateRoute path="/change-password" />}>
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/products/addItem" element={<AddItem />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/login/google" element={<GoogleLoginButton />} />
          <Route path="/" element={<PrivateRoute path="/admin/user" />}>
            <Route path="/admin/user" element={<User />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
=======
    <Router>
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login/google" element={<GoogleLoginButton />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </>
    </Router>
>>>>>>> 38452ef (feat(buyer retieve all items):buyer should retrieve all items on available products #184995818)
  );
}

export default App;
