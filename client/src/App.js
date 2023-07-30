import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './page/Home/HomePage';
import RegisterPage from './page/Register/RegisterPage';
import LoginPage from './page/Login/LoginPage';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="nav" element={<Nav />} />
      <Route path="footer" element={<Footer />} />
    </Routes>
  );
};

export default App;
