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
import "./CSS/Bubbles.css"; // CSS for floating bubbles

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError(""); // Clear any previous errors
    setLoading(true); // Show loading state

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log("Login successful:", result);
        alert("Login successful!");
        // Redirect or save token here
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXJndjR3M2Q1enZtNHhiMXJiM3pmazFzOWJnMWxnd2Z4ZGJycWo0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6fJeCvpfEueV1iPm/giphy.webp')", // GIF background
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        position: "relative", // To position the bubbles
        zIndex: 0,
      }}
    >
      {/* Floating Bubbles */}
      <div className="bubbles">
        {Array(50)
          .fill()
          .map((_, i) => (
            <div
              className="bubble"
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
      </div>

      <MDBCard
        style={{
          maxWidth: "400px",
          width: "90%",
          borderRadius: "15px",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent background
        }}
      >
        <MDBCardBody className="text-center">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              required
            />
            <MDBInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              required
            />
            {error && <p className="text-danger">{error}</p>}
            <MDBBtn color="primary" type="submit" block disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </MDBBtn>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "blue" }}>
              Register
            </a>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginPage;
