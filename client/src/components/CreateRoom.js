import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { MDBContainer, MDBBtn, MDBTypography, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const socket = io("http://localhost:8000");

function CreateRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    setRoomCode(code);
    socket.emit("create-room", code);
    navigate(`/room/${code}`);
  };

  return (
    <MDBContainer className="d-flex flex-column align-items-center justify-content-center vh-100">
      <MDBCard style={{ width: "400px" }}>
        <MDBCardBody className="text-center">
          <MDBTypography tag="h3" className="mb-4">
            Create Room
          </MDBTypography>
          <MDBBtn color="primary" onClick={handleCreateRoom}>
            Generate Room Code
          </MDBBtn>
          {roomCode && (
            <MDBTypography tag="p" className="mt-3">
              Room Code: <strong>{roomCode}</strong>
            </MDBTypography>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default CreateRoom;
