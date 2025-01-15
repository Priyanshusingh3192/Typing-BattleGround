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
    <MDBContainer className="d-flex flex-column align-items-center justify-content-center vh-100">
      <MDBCard style={{ width: "400px" }}>
        <MDBCardBody className="text-center">
          <MDBTypography tag="h3" className="mb-4">
            Create or Join Room
          </MDBTypography>
          <MDBBtn color="primary" onClick={handleCreateRoom} className="mb-3">
            Generate Room Code
          </MDBBtn>
          {roomCode && (
            <MDBTypography tag="p" className="mt-3">
              Room Code: <strong>{roomCode}</strong>
            </MDBTypography>
          )}
          <MDBInput
            className="mt-4"
            label="Enter Room Code"
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <MDBBtn color="success" className="mt-3" onClick={handleJoinRoom}>
            Join Room
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default CreateRoom;
