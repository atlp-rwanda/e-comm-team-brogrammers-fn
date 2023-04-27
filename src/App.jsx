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
// eslint-disable-next-line import/no-unresolved
import SellerCollection from './Views/SellerCollection';
// eslint-disable-next-line import/no-unresolved, import/extensions
import OneProduct from './components/OneProduct';
// eslint-disable-next-line import/no-unresolved
import Statistics from './Views/UserStatistics';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collection" element={<SellerCollection />} />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route path="/oneProduct/:id" element={<OneProduct />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
