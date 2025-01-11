import React from "react";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBBtn, MDBTypography } from "mdb-react-ui-kit";

function HomePage() {
  const navigate = useNavigate();

  return (
    <MDBContainer className="d-flex flex-column align-items-center justify-content-center vh-100">
      <MDBTypography tag="h1" className="mb-4 text-center">
        Typing Master
      </MDBTypography>
      <MDBBtn color="primary" className="mb-3" onClick={() => navigate("/create-room")}>
        Create Room
      </MDBBtn>
      <MDBBtn color="secondary" onClick={() => navigate("/join-room")}>
        Join Room
      </MDBBtn>
    </MDBContainer>
  );
}

export default HomePage;
