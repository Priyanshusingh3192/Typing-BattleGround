import React, { useState, useEffect, useRef, useContext } from 'react';
import { io } from 'socket.io-client';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBInput,
    MDBSpinner,
} from 'mdb-react-ui-kit';
import { User } from "../context/User";

const newSocket = io('http://localhost:8000');

const PlayRandomOne = () => {
    const [roomId, setRoomId] = useState('room1');
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60); // 1-minute timer
    const [typingText, setTypingText] = useState(
        'The quick brown fox jumps over the lazy dog.'
    );
    const [userInput, setUserInput] = useState('');
    const [wordsTyped, setWordsTyped] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [opponentWpm, setOpponentWpm] = useState(0); // Store opponent WPMs as an array
    const [usersInRoom, setUsersInRoom] = useState([]); // Track users in the room

    const timerRef = useRef(null);
    const { newUser } = useContext(User);

    useEffect(() => {
        if (!newUser || !newUser.email) {
            console.error("User data is not available yet.");
            return;
        }
        const newEmail = newUser.email;
        newSocket.emit('play-random', { roomId, userEmail: newEmail });


        newSocket.on('userJoined', (data) => {
            setUsersInRoom(data.users); // Update users in the room
        });

        newSocket.on('startGame', () => {
            setIsGameStarted(true);
            setLoading(false);
            startTimer();
        });

        newSocket.on('receiveWpm', (data) => {
            const { userEmail, opp_wpm } = data;
            if (userEmail !== newUser.email) {
                setOpponentWpm(opp_wpm);
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId, newUser.email]);

    const startTimer = () => {
        setTimeLeft(60);
        setWordsTyped(0);
        setUserInput('');

        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    calculateFinalWpm();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const calculateFinalWpm = () => {
        const finalWpm = Math.round((wordsTyped / 60) * 60); // WPM calculation
        setWpm(finalWpm);
        newSocket.emit('wpmUpdate', { userEmail: newUser.email, roomId, wpm: finalWpm });
    };

    const handleTyping = (event) => {
        const input = event.target.value;
        setUserInput(input);

        const typedWords = input.trim().split(' ');
        const originalWords = typingText.split(' ');

        let correctWords = 0;
        for (let i = 0; i < typedWords.length; i++) {
            if (typedWords[i] === originalWords[i]) {
                correctWords++;
            }
        }
        setWordsTyped(correctWords);

        const timeElapsed = 60 - timeLeft;
        if (timeElapsed > 0) {
            const realTimeWpm = Math.round((correctWords / timeElapsed) * 60);
            setWpm(realTimeWpm);
            newSocket.emit('wpmUpdate', { userEmail: newUser.email, roomId, wpm: realTimeWpm });
        }
    };





    const [car1Position, setCar1Position] = useState(0);
    const [car2Position, setCar2Position] = useState(0);

    useEffect(() => {
        const car1Progress = Math.min((wpm / 100) * 100, 100); // User's car position
        const car2Progress = Math.min((opponentWpm / 100) * 100, 100); // Opponent's car position
        setCar1Position(car1Progress);
        setCar2Position(car2Progress);
    }, [wpm, opponentWpm]);


    return (
        <MDBContainer style={{ paddingTop: '80px', maxWidth: '900px' }}>
        <style>
            {`
                .race-track {
                    position: relative;
                    width: 100%;
                    height: 200px;
                    background: #444;
                    border-radius: 10px;
                    overflow: hidden;
                    margin: 20px 0;
                }
                .track {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: #eee;
                    transform: translateY(-50%);
                }
                .car {
                    position: absolute;
                    width: 50px;
                    height: 30px;
                    background: red;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    text-shadow: 1px 1px black;
                    transition: left 0.5s ease-in-out;
                }
                .car.player2 {
                    background: blue;
                }
            `}
        </style>
        <MDBRow className="justify-content-center">
            <MDBCol md="12">
                {loading ? (
                    <div className="text-center">
                        <MDBSpinner grow size="lg" />
                        <p>Waiting for Players to Join...</p>
                    </div>
                ) : (
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle tag="h5" className="text-center">
                                Typing Race Game
                            </MDBCardTitle>
                            {isGameStarted ? (
                                <>
                                    <MDBCardText className="text-center">
                                        <strong>Time Left:</strong> {timeLeft} seconds
                                    </MDBCardText>
                                    <MDBCardText>
                                        <strong>Type the following text:</strong> <br />
                                        <p><strong>{typingText}</strong></p>
                                    </MDBCardText>
                                    <MDBInput
                                        type="text"
                                        value={userInput}
                                        onChange={handleTyping}
                                        placeholder="Start typing..."
                                        disabled={timeLeft === 0}
                                        className="mb-3"
                                    />
                                    <div className="race-track">
                                        <div className="track" />
                                        <div
                                            className="car"
                                            style={{ left: `${car1Position}%`, top: '20%' }}
                                        >
                                            🚗
                                        </div>
                                        <div
                                            className="car player2"
                                            style={{ left: `${car2Position}%`, top: '60%' }}
                                        >
                                            🚙
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <MDBCardText className="text-center">
                                    Waiting for all players to join...
                                </MDBCardText>
                            )}
                        </MDBCardBody>
                    </MDBCard>
                )}
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    );
};

export default PlayRandomOne;
