import './App.scss';

import { Routes, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Home from './Views/Home';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import Login from './Views/Login';
// eslint-disable-next-line import/no-named-as-default
import Signup from './Views/Signup';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import NotFound from './Views/404';
// eslint-disable-next-line no-unused-vars
import GoogleLoginButton from './components/GoogleLoginButton';
import Header from './components/header';
import Footer from './components/footer';
import VerifyEmail from './Views/VerifyEmail';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
