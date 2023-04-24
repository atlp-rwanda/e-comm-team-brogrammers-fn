/* eslint-disable react/button-has-type */
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home';
import Login from './Views/Login';
import NotFound from './Views/404';
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
