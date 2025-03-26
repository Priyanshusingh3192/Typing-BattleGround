import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { MDBContainer, MDBBtn, MDBTypography, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { User } from "../context/User";

const socket = io("http://localhost:8000");

function CreateRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const { newUser } = useContext(User);

  const handleCreateRoom = () => {
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    setRoomCode(code);
    socket.emit("create-room", { roomCode: code, email: newUser.email,name:newUser.username });
    navigate(`/room/${code}`);
  };

  const handleJoinRoom = () => {
    if (roomCode.trim() !== "") {
      socket.emit(
        "join-room",
        { roomCode, email: newUser.email },
        (response) => {
          if (response.status === "ok") {
            navigate(`/room/${roomCode}`);
          } else {
            alert(response.message || "Failed to join the room.");
          }
        }
      );
    } else {
      alert("Please enter a room code.");
    }
  };

  return (
    <div
    style={{
      height: "90vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000", // Black background
      overflow: "hidden", // Prevent scrolling
    }}
  >
    <MDBCard
      style={{
        width: "400px",
        backgroundColor: "#574b4b", // Dark grey box
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(17, 224, 48, 0.2)",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <MDBCardBody>
        <MDBTypography tag="h3" className="mb-4">
          Create or Join Room
        </MDBTypography>
        <MDBBtn color="primary" className="mb-3" onClick={handleCreateRoom} >Generate Room Code</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  </div>
  );
}

export default CreateRoom;
