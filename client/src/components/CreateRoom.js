import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { MDBContainer, MDBBtn, MDBTypography, MDBCard, MDBCardBody, MDBInput } from "mdb-react-ui-kit";
import { User } from "../context/User";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const socket = io(BACKEND_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket']
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

function CreateRoom() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const { newUser } = useContext(User);

  const handleCreateRoom = () => {
    const code = Math.random().toString(36).substr(2, 6).toUpperCase();
    setRoomCode(code);
    socket.emit("create-room", { roomCode: code, email: newUser.email, name: newUser.username });
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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)',
      padding: '2rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <MDBContainer fluid className="px-4">
        <MDBCard className="text-white mx-auto" style={{
          maxWidth: '1000px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}>
          <MDBCardBody className="p-5">
            <div className="row align-items-center">
              {/* Image Column */}
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img
                  src="/images/create-room.svg"
                  alt="Create Room"
                  className="img-fluid"
                  style={{
                    maxWidth: '80%',
                    filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.15))',
                    transform: 'scale(0.95)',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(0.95)'}
                />
              </div>

              {/* Form Column */}
              <div className="col-md-6 text-center">
                <h2 className="fw-bold mb-4" style={{
                  color: '#00ff88',
                  fontSize: '2.25rem',
                  letterSpacing: '-0.5px'
                }}>
                  Create Room
                </h2>
                <p className="text-white-50 mb-4">
                  Generate a unique room code and invite your friends to join!
                </p>

                <MDBBtn
                  onClick={handleCreateRoom}
                  style={{
                    background: 'linear-gradient(45deg, #00ff88, #00b8ff)',
                    padding: '15px 30px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  className="w-100"
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Generate Room Code
                </MDBBtn>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default CreateRoom;
