import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TypoMeter from './TypoMeter';
import SignUp from './SignUp';
import Otp from './Otp';
import Welcome2 from './Welcome2';
import Welcome1 from './Welcome1';
import Login from './Login';
import Persist from './Persist';
import Home from './Home';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import GamePage from './GamePage';
import NGamePage from './NGamePage';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import { User } from "../context/User";
import PlayRandomOne from './PlayRandomOne';
import Profile from './Profile';

const Container = () => {
    const { newUser } = useContext(User);

    // useEffect(() => {
    //     // Disable scrolling
    //     document.body.style.overflow = "hidden";

    //     // Clean up to restore scrolling when the component unmounts
    //     return () => {
    //         document.body.style.overflow = "auto";
    //     };
    // }, []);
    return (
        <BrowserRouter>
        <Persist />
        <div>
            {/* Sticky Navbar */}
            <div
                style={{
                    position: "fixed", // Fix the navbar to the top
                    top: 0,
                    width: "100%",
                    zIndex: 1000, // Ensure it stays above other elements
                }}
            >
                <Navbar1 />
            </div>
    
            {/* Content below Navbar */}
            <div style={{ marginTop: "70px" }}> {/* Adjust marginTop as per your Navbar's height */}
                <Routes>
                    <Route path="/" element={<Welcome1 />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<Otp />} />
                   

                    {newUser.accessToken && (
                        <>
                            <Route path="/welcome2" element={<Welcome2 />} />
                            <Route path="/typometer" element={<TypoMeter />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/create-room" element={<CreateRoom />} />
                            <Route path="/join-room" element={<JoinRoom />} />
                            <Route path="/TWOroom/:roomCode" element={<GamePage />} />
                            <Route path="/room/:roomCode" element={<NGamePage />} />
                             <Route path="/play-random" element={<PlayRandomOne />} />
                             <Route path="/profile" element={<Profile />} />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    </BrowserRouter>
    
    );
};

export default Container;
