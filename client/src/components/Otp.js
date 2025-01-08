import React, { useState } from "react";
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

function OtpPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

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

  const handleSubmit = () => {
    if (otp.some((digit) => digit === "")) {
      setError("Please enter all 4 digits of the OTP.");
    } else {
      setError("");
      alert(`OTP Entered: ${otp.join("")}`);
    }
  };

  const handleResend = () => {
    alert("OTP resent successfully!");
  };

  return (
    <MDBContainer
      fluid
      style={{
        backgroundColor: "#f0f8ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBCard style={{ maxWidth: "400px", width: "90%", borderRadius: "15px" }}>
        <MDBCardBody className="text-center">
          <h3 className="mb-4">Verify OTP</h3>
          <p className="text-muted mb-4">
            Enter the 4-digit OTP sent to Email you Entered.
          </p>

          <MDBRow className="mb-3">
            {otp.map((digit, index) => (
              <MDBCol size="3" key={index}>
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
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default OtpPage;
