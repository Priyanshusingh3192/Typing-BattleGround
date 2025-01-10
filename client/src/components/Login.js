import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./CSS/signup.css"; // Assuming signup.css also contains common styles

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate consistent star positions with a fixed seed
    const generateStars = () => {
      const randomWithSeed = (seed) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      const positions = Array.from({ length: 50 }).map((_, index) => ({
        top: `${randomWithSeed(index) * 100}vh`,
        left: `${randomWithSeed(index + 50) * 100}vw`,
        animationDelay: `${randomWithSeed(index + 100) * 2}s`,
        animationDuration: `${1.5 + randomWithSeed(index + 150) * 1.5}s`,
      }));
      return positions;
    };

    setStars(generateStars());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    setLoading(true);

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
      } else {
        setError(result.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-container">
      {/* Fixed Twinkling Stars */}
      <div className="stars">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          ></div>
        ))}
      </div>

      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <MDBCard
          style={{
            maxWidth: "400px",
            width: "90%",
            borderRadius: "15px",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
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
    </div>
  );
}

export default LoginPage;
