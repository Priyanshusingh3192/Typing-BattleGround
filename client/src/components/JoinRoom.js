import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBTypography } from "mdb-react-ui-kit";
import { User } from "../context/User";
const socket = io("http://localhost:8000");

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const { newUser } = useContext(User);
  const handleJoinRoom = () => {
    if (roomCode.trim() !== "") {
      socket.emit(
        "join-room",
        { roomCode, email: newUser.email, username: newUser.username },
        (response) => {
          if (response.status === "ok") {
            console.log("yyy");
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
      <MDBContainer className="d-flex flex-column align-items-center justify-content-center vh-100">
        <MDBCard style={{ width: "400px",backgroundColor: "#574b4b" }}>
          <MDBCardBody className="text-center">
            <MDBTypography tag="h3" className="mb-4" style={{color:"white"}}>
              Join Room
            </MDBTypography>
            <MDBInput
              label="Enter Room Code"
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="mb-4"
            />
            <MDBBtn color="primary" onClick={handleJoinRoom}>
              Join
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default JoinRoom;
