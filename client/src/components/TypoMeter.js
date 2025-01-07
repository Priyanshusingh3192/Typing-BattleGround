import React from 'react';
import { User } from '../context/User.js';

const TypoMeter = () => {
  const { newUser } = React.useContext(User); // Access context values using useContext

  return (
    <div>
      <h2>Hi, I am a SpeedoMeter!</h2>
    </div>
  );
};

export default TypoMeter;
