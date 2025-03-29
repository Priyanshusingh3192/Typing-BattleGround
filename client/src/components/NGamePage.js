import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBTextArea,
    MDBProgress,
    MDBProgressBar,
    MDBBtn,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { User } from "../context/User";
import "./CSS/GamePage.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { motion, AnimatePresence } from 'framer-motion';

const socket = io("http://localhost:8000");

function NGamePage() {

    const axiosPrivate = useAxiosPrivate();

    const { roomCode } = useParams();
    const [text, setText] = useState("");
    const [speed, setSpeed] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [matchedWords, setMatchedWords] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isStarted, setIsStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [winner, setWinner] = useState("");
    const [hasTimerEnded, setHasTimerEnded] = useState(false);
    const startTime = useRef(null);

    const { newUser } = useContext(User);
    const targetText = "The quick brown fox jumps over the lazy dog All three elements stay in a single horizontal row.Images and text shrink proportionally to avoid overflowing.Layout scales smoothly across screen sizes.";

    // Join the room when the component mounts
    useEffect(() => {

        socket.on("leaderboard-update", (data) => {
            console.log("update out");
            if (data.room === roomCode) {
                console.log("update");
                setLeaderboard(data.leaderboard);
            }
        });

        socket.on("start-game", (data) => {
            setIsStarted(true);
            startTime.current = data.startTime;
        });

        return () => {
            socket.off("leaderboard-update");
            socket.off("start-game");
        };
    }, [roomCode, newUser.email]);

    // Handle typing logic
    const handleTyping = (e) => {
        const typedText = e.target.value;
        setText(typedText);

        if (!startTime.current) {
            startTime.current = Date.now();
        }

        const typedWords = typedText.trim().split(/\s+/);
        const targetWords = targetText.trim().split(/\s+/);

        let matchCount = 0;
        for (let i = 0; i < typedWords.length; i++) {
            if (typedWords[i] === targetWords[i]) {
                matchCount++;
            } else {
                break;
            }
        }

        setMatchedWords(matchCount);

        const elapsedTime = (Date.now() - startTime.current) / 1000 / 60; // Time in minutes
       
        const calculatedSpeed = Math.floor(matchCount / elapsedTime);
        setSpeed(calculatedSpeed);

        socket.emit("typing-update", { room: roomCode, email: newUser.email, speed: calculatedSpeed });
    };
    
    useEffect(() => {
        if (isStarted && timer > 0) {
            const interval = setInterval(() => {
                handleTyping({ target: { value: text } }); // Simulate typing event
            }, 1000); // Run every second
    
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [isStarted, text, timer]); // Re-run when game starts or text changes
    

    // Handle game start
    function handleStart() {
        const currentStartTime = Date.now();
        setIsStarted(true);
        startTime.current = currentStartTime;

        socket.emit("start-game", { room: roomCode, email: newUser.email, startTime: currentStartTime });
    }



    useEffect(() => {
        if (isStarted && timer > 0) {
            const interval = setInterval(() => {
                // Ensure startTime.current is initialized
                if (!startTime.current) {
                    startTime.current = Date.now();
                }

                // Calculate elapsed time
                const elapsed = Math.floor((Date.now() - startTime.current) / 1000);

                // Update the timer
                const newTimerValue = Math.max(0, 60 - elapsed);
                setTimer(newTimerValue);

                // Clear the interval if the timer reaches 0
                if (newTimerValue === 0) {
                    clearInterval(interval);
                }
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [isStarted, timer]);


    useEffect(() => {
        if (timer === 0 && !hasTimerEnded) {
            setHasTimerEnded(true); // Mark that the timer has ended

            const sortedLeaderboard = [...leaderboard].sort((a, b) => b.initialSpeed - a.initialSpeed);
            const topPlayer = {
                email: sortedLeaderboard[0]?.email,
                wpm: sortedLeaderboard[0]?.initialSpeed
            };
            const losers = sortedLeaderboard.slice(1).map(player => ({
                email: player.email,
                wpm: player.initialSpeed
            }));

            const winnerMessage =
                topPlayer.email === newUser.email ? "You Win!" : `${topPlayer.email} Wins!`;
            setWinner(winnerMessage || "It's a Tie!");
            setShowResult(true);

            // Make API call to save match data using Axios with WPM data
            if (sortedLeaderboard.length > 0) {
                axiosPrivate
                    .post("http://localhost:8000/matches/savedata", {
                        winner: [{
                            email: topPlayer.email,
                            wpm: topPlayer.wpm
                        }],
                        loser: losers
                    })
                    .then((response) => {
                        console.log("Match data saved:", response.data);
                    })
                    .catch((error) => {
                        console.error("Error saving match data:", error);
                    });
            }

            // Hide the result pop-up after 5 seconds
            setTimeout(() => {
                setShowResult(false);
            }, 5000);
        }
    }, [isStarted, timer, leaderboard, hasTimerEnded]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated Background Effect */}
            <motion.div 
                animate={{ 
                    background: [
                        'radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)'
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none'
                }}
            />

            <MDBContainer fluid className="position-relative">
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {/* Game Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <MDBCard style={{
                            width: "90%",
                            maxWidth: "800px",
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0, 255, 136, 0.2)',
                            borderRadius: '20px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                        }}>
                            <MDBCardBody className="p-4">
                                {/* Room Code and Start Button */}
                                <motion.div
                                    className="text-center mb-4"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>
                                        Room Code: {roomCode}
                                    </h2>
                                    
                                    <MDBBtn
                                        onClick={handleStart}
                                        disabled={isStarted}
                                        style={{
                                            background: 'linear-gradient(45deg, #00ff88, #00b8ff)',
                                            padding: '12px 30px',
                                            fontSize: '1.1rem',
                                            border: 'none',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {isStarted ? "Game Started" : "Start Game"}
                                    </MDBBtn>
                                </motion.div>

                                {/* Timer with Pulse Animation */}
                                <motion.div
                                    animate={{
                                        scale: timer <= 10 ? [1, 1.1, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: timer <= 10 ? Infinity : 0
                                    }}
                                    className="text-center mb-4"
                                >
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        margin: '0 auto',
                                        background: 'rgba(0, 255, 136, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid rgba(0, 255, 136, 0.3)',
                                    }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            color: timer <= 10 ? '#ff4444' : '#00ff88',
                                            transition: 'color 0.3s ease'
                                        }}>
                                            {timer}s
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Typing Area */}
                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '15px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    <p style={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.6',
                                        marginBottom: '1.5rem'
                                    }}>{targetText}</p>

                                    <textarea
                                        value={text}
                                        onChange={handleTyping}
                                        disabled={!isStarted}
                                        style={{
                                            width: '100%',
                                            height: '120px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(0, 255, 136, 0.2)',
                                            borderRadius: '10px',
                                            color: 'white',
                                            padding: '1rem',
                                            fontSize: '1.1rem',
                                            resize: 'none'
                                        }}
                                        placeholder={isStarted ? "Start typing..." : "Waiting for game to start..."}
                                    />
                                </div>

                                {/* Progress Bar */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <MDBProgress height='20'>
                                        <MDBProgressBar
                                            width={(matchedWords / targetText.split(" ").length) * 100}
                                            style={{
                                                background: 'linear-gradient(45deg, #00ff88, #00b8ff)',
                                                transition: 'width 0.3s ease-out'
                                            }}
                                        >
                                            {Math.round((matchedWords / targetText.split(" ").length) * 100)}%
                                        </MDBProgressBar>
                                    </MDBProgress>
                                </motion.div>
                            </MDBCardBody>
                        </MDBCard>
                    </motion.div>

                    {/* Leaderboard Card */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <MDBCard style={{
                            width: '300px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(0, 255, 136, 0.2)',
                            borderRadius: '20px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                        }}>
                            <MDBCardBody>
                                <h3 style={{
                                    color: '#00ff88',
                                    textAlign: 'center',
                                    marginBottom: '1.5rem'
                                }}>Leaderboard</h3>

                                {leaderboard.map((player, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            padding: '12px',
                                            borderRadius: '10px',
                                            marginBottom: '8px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            border: '1px solid rgba(0, 255, 136, 0.1)'
                                        }}
                                    >
                                        <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                            {player.email.split('@')[0].slice(0, 9)}
                                        </span>
                                        <span style={{ color: '#00ff88', fontWeight: 'bold' }}>
                                            {player.initialSpeed} WPM
                                        </span>
                                    </motion.div>
                                ))}
                            </MDBCardBody>
                        </MDBCard>
                    </motion.div>
                </div>
            </MDBContainer>

            {/* Enhanced Result Popup */}
            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                padding: '3rem',
                                borderRadius: '20px',
                                border: '1px solid rgba(0, 255, 136, 0.2)',
                                textAlign: 'center'
                            }}
                        >
                            <motion.h2
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5 }}
                                style={{ color: '#00ff88', marginBottom: '1rem' }}
                            >
                                {winner}
                            </motion.h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default NGamePage;
