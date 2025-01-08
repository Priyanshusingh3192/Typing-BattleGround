import React from 'react';
import './App.css';
import { User } from './context/User.js';
import SignUp from './components/SignUp.js'
import TypoMeter from './components/TypoMeter.js';
import Otp from './components/Otp.js'
import Container from './components/Container.js';



function App() {
  const [newUser, setNewUser] = React.useState({
    email: "",
    username: "dummy",
    pwd: "",
    name: "",
    accessToken: "",
  });

  // Example: Update state with an effect (if needed)
  React.useEffect(() => {
    setNewUser((old) => ({
      ...old,
      name: "Updated Name", // Example modification
    }));
  }, []);

  return (
    <div className="App">
      <User.Provider value={{ newUser, setNewUser }}>
       
        <Container/>
        
      </User.Provider>
    </div>
  );
}

export default App;
