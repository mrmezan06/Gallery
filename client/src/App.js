import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './page/Home/HomePage';
import RegisterPage from './page/Register/RegisterPage';
import LoginPage from './page/Login/LoginPage';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout';
import GalleryPage from './page/Gallery/GalleryPage';
import UploadForm from './page/Upload/UploadForm';
import CreateModelPage from './page/Model/CreateModelPage';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/create/model" element={<CreateModelPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
