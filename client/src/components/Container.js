import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TypoMeter from './TypoMeter';
import SignUp from './SignUp';
import Otp from './Otp';
import Welcome from './Welcome';
import Login from './Login';
import Persist from './Persist';

const Container = () => {
  return (
    <BrowserRouter>
      <div>
      <Persist/>
        <Routes>
        <Route path="/" element={<Welcome />} />
          <Route path="/typometer" element={<TypoMeter />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Container;
