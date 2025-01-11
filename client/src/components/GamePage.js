import React, { useEffect, useState, useRef } from "react";
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
import "./CSS/GamePage.css";

const socket = io("http://localhost:8000");

function GamePage() {
    const { roomCode } = useParams();
    const [text, setText] = useState("");
    const [speed, setSpeed] = useState(0);
    const [opponentSpeed, setOpponentSpeed] = useState(0);
    const [matchedWords, setMatchedWords] = useState(0);
    const [timer, setTimer] = useState(60); // Timer state
    const [isStarted, setIsStarted] = useState(false); // Track game start
    const [showResult, setShowResult] = useState(false); // Show result pop-up state
    const [winner, setWinner] = useState(""); // Track winner
    const startTime = useRef(null);

    // Predefined content to type
    const targetText = "The quick brown fox jumps over the lazy dog";

    useEffect(() => {
        const handleTypingUpdate = (data) => {
            if (data.room === roomCode) {
                setOpponentSpeed(data.speed);
            }
        };

        const handleStartGame = (data) => {
            if (data.room === roomCode) {
                setIsStarted(true);
                startTime.current = Date.now();
            }
        };

        socket.on("typing-update", handleTypingUpdate);
        socket.on("start-game", handleStartGame);

        return () => {
            socket.off("typing-update", handleTypingUpdate);
            socket.off("start-game", handleStartGame);
        };
    }, [roomCode]);

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
        const calculatedSpeed = Math.floor(matchCount / elapsedTime); // WPM
        setSpeed(calculatedSpeed);

        socket.emit("typing-update", { room: roomCode, speed: calculatedSpeed });
    };

    const handleStart = () => {
        setIsStarted(true);
        startTime.current = Date.now();
        socket.emit("start-game", { room: roomCode });
    };

    useEffect(() => {
        if (isStarted && timer > 0) {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
                setTimer(Math.max(0, 5 - elapsed));
            }, 1000);

            return () => clearInterval(interval);
        }

        if (timer === 0) {
            // Show result when time is over
            const winner = speed > opponentSpeed ? "You Win!" : opponentSpeed > speed ? "Opponent Wins!" : "It's a Tie!";
            setWinner(winner);
            setShowResult(true);

            // Hide result pop-up after 5 seconds
            setTimeout(() => {
                setShowResult(false);
            }, 10000);
        }
    }, [isStarted, timer, speed, opponentSpeed]);

    const [stars, setStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const starArray = [];
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                starArray.push({ x, y });
            }
            setStars(starArray);
        };

        generateStars();
    }, []);

    return (
        <MDBContainer fluid className="game-page-container">
            {stars.map((star, index) => (
                <span
                    key={index}
                    className="star"
                    style={{ top: `${star.y}%`, left: `${star.x}%` }}
                >
                    ☆
                </span>
            ))}

            <MDBCard className="game-card">
                <MDBCardBody className="main-game-page d-flex flex-column align-items-center">
                    <MDBTypography tag="h3" className="mb-4 game-title">
                        Room Code: {roomCode}
                    </MDBTypography>

                    <MDBBtn
                        onClick={handleStart}
                        color="primary"
                        className="mb-3 start-button"
                        disabled={isStarted}
                    >
                        {isStarted ? "Game Started" : "Start Game"}
                    </MDBBtn>

                    <div className="circle-container">
                        {/* <div className="circle timer-circle">
                            <p className="circle-text">
                                Timer <br />
                                <span>{timer}s</span>
                            </p>
                        </div> */}
                        <div className="typing-box-container">
                            <MDBTypography tag="h5" className="mb-3 text-muted">
                                Type the following text:
                            </MDBTypography>
                            <MDBTypography tag="p" className="mb-4 target-text">
                                {targetText}
                            </MDBTypography>
                            <MDBTextArea
                                label="Start Typing..."
                                value={text}
                                onChange={handleTyping}
                                rows={5}
                                className="mb-4 game-textarea"
                                disabled={!isStarted}
                            />
                            <MDBProgress className="w-75 mb-3">
                                <MDBProgressBar
                                    width={(matchedWords / targetText.split(" ").length) * 100}
                                    valuemin={0}
                                    valuemax={100}
                                    bgColor="info"
                                    striped
                                    animated
                                />
                            </MDBProgress>
                        </div>



                        <div>
                            {/* Timer Box */}
                            <div style={{
                                width: '200px',
                                height: '200px',
                                backgroundColor: '#f5f5dc', // Creamy color
                                color: 'black',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%', // Making it a circle
                                border: '10px solid #023330', // Black border
                                marginBottom: '20px',
                                textAlign: 'center',
                                fontSize: '18px',
                                margin: '0 auto' // Center align the timer box horizontally
                            }}>
                                <p>
                                    Timer <br />
                                    <span style={{ fontWeight: 'bold', fontSize: '22px' }}>{timer}s</span>
                                </p>
                            </div>

                            {/* Speed Boxes */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center', // Center align the boxes horizontally
                                width: '100%',
                                gap: '20px', // Space between the boxes
                            }}>
                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    backgroundColor: '#f5f4ab', // Creamy color
                                    color: 'black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '20px',
                                    border: '10px solid #023330', // Black border
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        Your Speed <br />
                                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{speed} WPM</span>
                                    </p>
                                </div>

                                <div style={{
                                    width: '150px',
                                    height: '150px',
                                    backgroundColor: '#f5f4ab', // Creamy color
                                    color: 'black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '20px',
                                    border: '10px solid #023330', // Black border
                                    fontSize: '18px',
                                    textAlign: 'center'
                                }}>
                                    <p>
                                        Opponent <br />
                                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{opponentSpeed} WPM</span>
                                    </p>
                                </div>
                            </div>
                        </div>



                    </div>
                    <MDBTypography tag="p" className="mb-2 speed-display">
                        Matched Words: <span className="text-success">{matchedWords}</span>
                    </MDBTypography>
                </MDBCardBody>
            </MDBCard>

            {/* Show Result Pop-up */}
            {showResult && (
                <div className="result-popup">
                    <MDBCard>
                        <MDBCardBody className="text-center">
                            <MDBTypography tag="h5" className="text-success">
                                {winner}
                            </MDBTypography>
                            <MDBTypography tag="p" style={{ color: 'black' }}>
                                Your Speed: {speed} WPM
                            </MDBTypography>

                            <MDBTypography tag="p" style={{ color: 'black' }}>
                                Opponent Speed: {opponentSpeed} WPM
                            </MDBTypography>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            )}
        </MDBContainer>
    );
}

export default GamePage;
