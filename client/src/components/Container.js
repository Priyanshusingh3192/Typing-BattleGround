import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TypoMeter from './TypoMeter';
import SignUp from './SignUp';
import Otp from './Otp';

const Container = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<TypoMeter />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Container;
