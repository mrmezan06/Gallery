import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import HomePage from './page/Home/HomePage';
import RegisterPage from './page/Register/RegisterPage';
import LoginPage from './page/Login/LoginPage';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout';
import GalleryPage from './page/Gallery/GalleryPage';
import UploadForm from './page/Upload/UploadForm';
import CreateModelPage from './page/Model/CreateModelPage';
import VerifyRegistrationPage from './page/VerifyRegistration/Verify';
import ResendPage from './page/ResendCode/ResendPage';
import ProfilePage from './page/Profile/Profile';
import GalleryPhotosPage from './page/Gallery/GalleryPhotosPage';
import SinglePhotoPage from './page/Photo/SinglePhotoPage';
import UpdateProfilePage from './page/Profile/UpdateUser/UpdateProfile';
import UploadAvatar from './page/Profile/Upload/UploadAvatar';

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify" element={<VerifyRegistrationPage />} />
          <Route path="resend-code" element={<ResendPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="edit-profile" element={<UpdateProfilePage />} />
          <Route path="avatar-upload" element={<UploadAvatar />} />
          <Route path="photos" element={<GalleryPhotosPage />} />
          <Route path="/photos/:id" element={<SinglePhotoPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="/photo/add" element={<UploadForm />} />
          <Route path="/category/add" element={<CreateModelPage />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
