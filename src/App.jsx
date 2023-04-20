/* eslint-disable react/button-has-type */
import './App.scss';
import './components/GoogleLoginButton.scss';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Login from './Views/Login';
import NotFound from './Views/404';
import GoogleLoginButton from './components/GoogleLoginButton';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/google" element={<GoogleLoginButton />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
