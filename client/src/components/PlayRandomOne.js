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
import { User } from '../context/User';

const newSocket = io('http://localhost:8000');

const PlayRandomOne = () => {
    const [roomId, setRoomId] = useState('room1');
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60);
    const [typingText, setTypingText] = useState('The quick brown fox jumps over the lazy dog. I added a dashed line effect to mimic road lane dividers. The line is styled to repeat with small gaps, giving it a dashed look.');
    const [userInput, setUserInput] = useState('');
    const [wordsTyped, setWordsTyped] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [opponentWpm, setOpponentWpm] = useState(0);
    const [usersInRoom, setUsersInRoom] = useState([]);
    const timerRef = useRef(null);
    const { newUser } = useContext(User);

    const [car1Position, setCar1Position] = useState(0);
    const [car2Position, setCar2Position] = useState(0);

    useEffect(() => {
        if (!newUser || !newUser.email) {
            console.error('User data is not available yet.');
            return;
        }

        const newEmail = newUser.email;

        // Emit play-random event
        newSocket.emit('play-random', { roomId, userEmail: newEmail });

        // Event listeners
        const handleUserJoined = (data) => {
            setUsersInRoom(data.users);
        };

        const handleStartGame = () => {
            console.log("Hello siri start the game");
            setIsGameStarted(true);
            setLoading(false);
            startTimer();
        };

        const handleReceiveWpm = (data) => {
            const { userEmail, opp_wpm } = data;
            if (userEmail !== newUser.email) {
                setOpponentWpm(opp_wpm);
            }
        };

        newSocket.on('userJoined', handleUserJoined);
        newSocket.on('startGame', handleStartGame);
        newSocket.on('receiveWpm', handleReceiveWpm);

        // Cleanup function to remove event listeners
        return () => {
            newSocket.off('userJoined', handleUserJoined);
            newSocket.off('startGame', handleStartGame);
            newSocket.off('receiveWpm', handleReceiveWpm);
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
        const finalWpm = Math.round((wordsTyped / 60) * 60);
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

    useEffect(() => {
        const car1Progress = Math.min((wpm / 100) * 100, 100);
        const car2Progress = Math.min((opponentWpm / 100) * 100, 100);
        setCar1Position(car1Progress);
        setCar2Position(car2Progress);
    }, [wpm, opponentWpm]);

    return (
        <MDBContainer
            fluid
            style={{
                height: '100vh',
                background: 'black',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <MDBRow className="justify-content-center align-items-center" style={{ zIndex: 2, height: '100%' }}>
                <MDBCol md="8">
                    {loading ? (
                        <div className="text-center" style={{ fontWeight: 'bold', fontSize: '24px' }}>
                            <MDBSpinner grow size="lg" color="white" />
                            <p>Waiting for Players to Join...</p>
                        </div>
                    ) : (
                        <MDBCard style={{ backgroundColor: 'white', color: 'black' }}>
                            <MDBCardBody>
                                <MDBCardTitle tag="h5" className="text-center bg-orange-50 border-4	border-2 border-stone-100	">
                                    Typing Race Game
                                </MDBCardTitle>
                                {isGameStarted ? (
                                    <>
                                        <MDBCardText className="text-center bg-orange-50 border-4 border-2 border-stone-100">
                                            <strong>Time Left:</strong> {timeLeft} seconds
                                        </MDBCardText>
                                        <MDBCardText className="bg-orange-50 border-4 border-2 border-stone-100" >
                                            <strong>Type the following text:</strong> <br />
                                            <p>
                                                <strong>{typingText}</strong>
                                            </p>
                                        </MDBCardText>
                                        <MDBInput
                                            type="text"
                                            value={userInput}
                                            onChange={handleTyping}
                                            placeholder="Start typing..."
                                            disabled={timeLeft === 0}
                                            className="mb-3"
                                            style={{
                                                background: '#f0f0f0',
                                                color: 'black',
                                            }}
                                        />
                                        {/* Race Track */}
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                backgroundColor: '#3d3d3d', // Dark road color
                                                borderRadius: '5px',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            {/* Lane Dividers (Dashed lines for road lanes) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '0',
                                                    width: '100%',
                                                    height: '2px',
                                                    backgroundColor: 'white',
                                                    backgroundSize: '10px 2px', // Making dashed line effect
                                                    backgroundRepeat: 'repeat',
                                                }}
                                            />

                                            {/* WPM Indicators */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '10%',
                                                    right: '5%',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                {wpm} WPM (YOU)
                                            </div>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '60%',
                                                    right: '5%',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                {opponentWpm} WPM (GUEST)
                                            </div>

                                            {/* Car 1 in Lane 1 */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '10%', // Positioning car above the lane line
                                                    left: `${car1Position}%`,
                                                    transition: 'left 0.5s',
                                                    textAlign: 'center',
                                                    transform: 'scale(1.5)',
                                                    color: '#FF0000', // Red color for Car 1
                                                }}
                                            >
                                                <div style={{ fontSize: '50px' }}>⛟</div>
                                            </div>

                                            {/* Car 2 in Lane 2 */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: '60%', // Positioning car above the lane line
                                                    left: `${car2Position}%`,
                                                    transition: 'left 0.5s',
                                                    textAlign: 'center',
                                                    transform: 'scale(1.5)',
                                                    color: '#FF0000', // Red color for Car 2
                                                }}
                                            >
                                                <div style={{ fontSize: '60px' }}>🏎</div>
                                            </div>
                                        </div>
                                        
                                    </>
                                ) : (
                                    <div
                                        className="text-center"
                                        style={{ fontWeight: 'bold', fontSize: '24px' }}
                                    >
                                        Waiting for all players to join...
                                    </div>
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