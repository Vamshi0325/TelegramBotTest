import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import NotMobileDevice from './NotMobileDevice';
import 'bootstrap/dist/css/bootstrap.min.css';
import Photos from './Photos';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/not-mobile" element={<NotMobileDevice />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </Router>
  );
};

export default App;
