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
    <MDBContainer className="d-flex flex-column align-items-center justify-content-center vh-100">
      <MDBCard style={{ width: "400px" }}>
        <MDBCardBody className="text-center">
          <MDBTypography tag="h3" className="mb-4">
            Join Room
          </MDBTypography>
          <MDBInput
            label="Room Code"
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
  );
}

export default JoinRoom;
