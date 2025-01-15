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

const socket = io("http://localhost:8000");

function NGamePage() {
    const { roomCode } = useParams();
    const [text, setText] = useState("");
    const [speed, setSpeed] = useState(0);
    const [leaderboard, setLeaderboard] = useState([]);
    const [matchedWords, setMatchedWords] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isStarted, setIsStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [winner, setWinner] = useState("");
    const startTime = useRef(null);

    const { newUser } = useContext(User);
    const targetText = "The quick brown fox jumps over the lazy dog";

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

    // Handle game start
    const handleStart = () => {
        const currentStartTime = Date.now();
        setIsStarted(true);
        startTime.current = currentStartTime;

        socket.emit("start-game", { room: roomCode, email: newUser.email, startTime: currentStartTime });
    };

    // Timer logic
    useEffect(() => {
        if (isStarted && timer > 0) {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
                setTimer(Math.max(0, 60 - elapsed));
            }, 1000);

            return () => clearInterval(interval);
        }

        if (timer === 0) {
            const topPlayer =
                leaderboard[0]?.email === newUser.email ? "You Win!" : `${leaderboard[0]?.email} Wins!`;
            setWinner(topPlayer || "It's a Tie!");
            setShowResult(true);

            setTimeout(() => {
                setShowResult(false);
            }, 10000);
        }
    }, [isStarted, timer, leaderboard]);

    return (
        <MDBContainer
            fluid
            style={{
                position: "relative",
                minHeight: "100vh",
                backgroundColor: "#000",
                overflowX: "hidden",
                overflowY: "hidden",
            }}
        >
            {/* Game UI */}




            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "40px",
                    flexWrap: "wrap",
                    width: "100%",
                }}
            >
                {/* Typing Area */}
                <MDBCard
                    style={{
                        width: "90%",
                        maxWidth: "700px",
                        height: "550px",
                        backgroundColor: "#f5f5dc",
                        border: "5px solid #4de352",
                        borderRadius: "10px",
                    }}
                >
                    <MDBCardBody style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <MDBTypography tag="h3" style={{ marginBottom: "16px", fontWeight: "bold" }}>
                            Room Code: {roomCode}
                        </MDBTypography>

                        <MDBBtn
                            onClick={handleStart}
                            color="primary"
                            style={{ marginBottom: "16px" }}
                            disabled={isStarted}
                        >
                            {isStarted ? "Game Started" : "Start Game"}
                        </MDBBtn>

                        <MDBTypography tag="h5" style={{ marginBottom: "8px", color: "#6c757d" }}>
                            Type the following text:
                        </MDBTypography>
                        <MDBTypography tag="p" style={{ marginBottom: "16px", fontWeight: "bold" }}>
                            {targetText}
                        </MDBTypography>
                        <MDBTextArea
                            label="Start Typing..."
                            value={text}
                            onChange={handleTyping}
                            rows={4}
                            style={{
                                marginBottom: "16px",
                                width: "100%",
                                resize: "none",
                                border: "1px solid black",
                                borderRadius: "5px",
                            }}
                            disabled={!isStarted}
                        />
                        <MDBProgress style={{ width: "75%", marginBottom: "16px" }}>
                            <MDBProgressBar
                                width={(matchedWords / targetText.split(" ").length) * 100}
                                valuemin={0}
                                valuemax={100}
                                bgColor="info"
                                striped
                                animated
                            />
                        </MDBProgress>

                        <div
                            style={{
                                width: "150px",
                                height: "150px",
                                backgroundColor: "#f5f5dc",
                                color: "black",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                border: "10px solid #023330",
                                textAlign: "center",
                                fontSize: "16px",
                            }}
                        >
                            <p>
                                Timer <br />
                                <span style={{ fontWeight: "bold", fontSize: "20px" }}>{timer}s</span>
                            </p>
                        </div>

                        <MDBTypography tag="p" style={{ marginBottom: "8px", color: "#6c757d" }}>
                            Matched Words:{" "}
                            <span style={{ color: "green", fontWeight: "bold" }}>{matchedWords}</span>
                        </MDBTypography>
                    </MDBCardBody>
                </MDBCard>

                {/* Leaderboard */}
                <MDBCard
                    style={{
                        width: "90%",
                        maxWidth: "300px",
                        height: "550px",
                        backgroundColor: "#f5f5dc",
                        border: "5px solid #4de352",
                        borderRadius: "10px",
                    }}
                >
                    <MDBCardBody>
                        <MDBTypography
                            tag="h5"
                            style={{
                                textAlign: "center",
                                marginBottom: "16px",
                                fontWeight: "bold",
                                textDecoration: "underline",
                            }}
                        >
                            Leaderboard
                        </MDBTypography>
                        <ol style={{ paddingLeft: "20px", fontSize: "16px", color: "black" }}>
                            {leaderboard.map((player, index) => (
                                <li
                                    key={index}
                                    style={{
                                        marginBottom: "8px",
                                        backgroundColor: "#f0f0f0", // Light background color
                                        border: "1px solid #ccc", // Border for each item
                                        padding: "5px 10px", // Padding for each item
                                        display: "flex", // Flexbox to display content in a row
                                        justifyContent: "space-between", // Ensure the content is spread out
                                        alignItems: "center", // Align items vertically in the center
                                        borderRadius: "5px" // Optional: Rounded corners for better look
                                    }}
                                >
                                    <span style={{ flex: 1 }}>{player.username}</span>
                                    <span>{player.initialSpeed} WPM</span>
                                </li>
                            ))}
                        </ol>

                    </MDBCardBody>
                </MDBCard>
            </div>


            

            {/* Winner Display */}
            {showResult && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1000,
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                        textAlign: "center",
                    }}
                >
                    <MDBTypography tag="h5" style={{ color: "green", marginBottom: "16px" }}>
                        {winner}
                    </MDBTypography>
                </div>
            )}
        </MDBContainer>
    );
}

export default NGamePage;
