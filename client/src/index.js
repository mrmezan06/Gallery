import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


