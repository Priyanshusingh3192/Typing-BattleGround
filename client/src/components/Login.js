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
import "./CSS/signup.css";
import { User } from "../context/User";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {verifyUser} from '../API/api.js'


function LoginPage() {
  const { newUser, setNewUser } = useContext(User);
  const [login, setLogin] = useState({ email: "", pwd: "" });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const randomWithSeed = (seed) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      return Array.from({ length: 50 }).map((_, index) => ({
        top: `${randomWithSeed(index) * 100}vh`,
        left: `${randomWithSeed(index + 50) * 100}vw`,
        animationDelay: `${randomWithSeed(index + 100) * 2}s`,
        animationDuration: `${1.5 + randomWithSeed(index + 150) * 1.5}s`,
      }));
    };

    setStars(generateStars());
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Hello ");
    const res = await verifyUser(login);

    console.log(res)

    //setStat(res.response.)
    if (res?.response?.status === 401) {
      console.log("cbxnbznvbnbv")
    }

    if (res.status == 200 || res.status == 201 || res.status == 202) {
      console.log(res);
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      const tm = res?.data
      setNewUser({ email: login.email, username: tm.username, pwd: login.pwd, name: login.name, accessToken});
      console.log("i am cookie sent from server",res.cookies);
      console.log("i am data sent from server",res);
    //   navigate('/typometer')
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="background-container">
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
                name="email"
                value={login.email}
                onChange={handleChange}
                className="mb-4"
                required
              />
              <MDBInput
                label="Password"
                type="password"
                name="pwd"
                value={login.pwd}
                onChange={handleChange}
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
