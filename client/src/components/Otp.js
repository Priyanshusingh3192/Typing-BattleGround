import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './CSS/signup.css'; // CSS for twinkling stars
import { User } from "../context/User";
import { useNavigate } from 'react-router-dom';
import { verifyOtp, addClient } from "../API/api"; // Import necessary API functions

function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Updated to 6 OTP digits
  const [error, setError] = useState("");
  const { newUser } = useContext(User);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  // Handle OTP input changes and auto-focus to next field
  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Limit to 1 digit per input
      setOtp(newOtp);

      // Move to the next field automatically
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle OTP submission (verify OTP via API)
  const handleSubmit = async () => {
    
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    setLoad(true);
    try {
      const otpData = {
        otp5: otp.join(""),
        email: newUser.email,
      };
      console.log("i am number: ",otpData);
      const response = await verifyOtp(otpData); // Assuming verifyOtp is an API function

      if (response.status === 200) {
        console.log("OTP verified successfully.");
        navigate("/login"); // Redirect to sign-in page
      } else {
        console.error("OTP verification failed.");
        setError("OTP verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoad(false);
    }
  };

  // Handle resend OTP functionality
  const handleResend = () => {
    alert("OTP resent successfully!");
    // Call API to resend OTP if necessary (you can implement resend functionality here)
  };

  return (
    <MDBContainer
      fluid
      style={{
        backgroundColor: "#000108",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative", // To position bubbles and stars correctly
      }}
    >
      {/* Twinkling Stars */}
      <div className="stars">
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random() * 1.5}s`,
            }}
          ></div>
        ))}
      </div>

      <MDBCard style={{ maxWidth: "400px", width: "90%", borderRadius: "15px", zIndex: 1, }}>
        <MDBCardBody className="text-center">
          <h3 className="mb-4">Verify OTP</h3>
          <p className="text-muted mb-4">
            Enter the 6-digit OTP sent to the email you entered.
          </p>

          <MDBRow className="mb-3">
            {otp.map((digit, index) => (
              <MDBCol size="2" key={index}>
                <MDBInput
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="text-center"
                  style={{ fontSize: "1.5rem" }}
                />
              </MDBCol>
            ))}
          </MDBRow>

          {error && <p className="text-danger mb-3">{error}</p>}

          <MDBBtn color="primary" onClick={handleSubmit} block>
            Submit OTP
          </MDBBtn>
          <MDBBtn
            color="link"
            className="mt-2"
            onClick={handleResend}
            style={{ fontSize: "0.9rem" }}
          >
            Resend OTP
          </MDBBtn>

          {load && <p>Loading...</p>} {/* Show loading when submitting */}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default OtpPage;
