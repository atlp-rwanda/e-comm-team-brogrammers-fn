/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import './App.scss';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Login from './Views/Login';
import NotFound from './Views/404';
import Header from './components/header';
import Footer from './components/footer';
import ChangePassword from './Views/Password';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Header />
      <main>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute path="/change-password" />}>
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
