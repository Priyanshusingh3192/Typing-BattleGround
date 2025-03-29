import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
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
              {/* Form Column */}
              <div className="col-md-6 text-center order-2 order-md-1">
                <h2 className="fw-bold mb-4" style={{
                  color: '#00ff88',
                  fontSize: '2.25rem',
                  letterSpacing: '-0.5px'
                }}>
                  Join Room
                </h2>
                <p className="text-white-50 mb-4">
                  Enter the room code to join your friends!
                </p>

                <div className="form-outline mb-4" style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  transition: 'all 0.3s ease'
                }}>
                  <MDBInput
                    label="Room Code"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    contrast
                    size="lg"
                    style={{
                      color: 'white',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>

                <MDBBtn
                  onClick={handleJoinRoom}
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
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Join Room
                </MDBBtn>
              </div>

              {/* Image Column */}
              <div className="col-md-6 text-center mb-4 mb-md-0 order-1 order-md-2">
                <img
                  src="/images/join-room.svg"
                  alt="Join Room"
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
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default JoinRoom;
