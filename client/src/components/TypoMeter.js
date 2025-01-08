import React from 'react';
import { User } from '../context/User.js';

const TypoMeter = () => {
  const { newUser } = React.useContext(User); // Access context values using useContext

  return (
    <div>
      <h1>Hi, I am a TypeMeter!</h1>
    </div>
  );
};

export default TypoMeter;
