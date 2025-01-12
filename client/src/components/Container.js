import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TypoMeter from './TypoMeter';
import SignUp from './SignUp';
import Otp from './Otp';
import Welcome from './Welcome';
import Login from './Login';
import Persist from './Persist';
import Home from './Home';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import GamePage from './GamePage';

const Container = () => {
  return (
    <BrowserRouter>
      <Persist />
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/typometer" element={<TypoMeter />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          {/* Use a dynamic route parameter for room codes */}
          <Route path="/room/:roomCode" element={<GamePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Container;
