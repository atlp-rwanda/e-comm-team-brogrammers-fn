/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Views/Home';
import Login from './Views/Login';
import NotFound from './Views/404';
import ResetPassword from './Views/reset/ResetPassword';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
