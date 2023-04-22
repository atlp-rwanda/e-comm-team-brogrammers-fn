/* eslint-disable react/button-has-type */
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Login from './Views/Login';
import Products from './Views/viewProducts';

import NotFound from './pages/404';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
