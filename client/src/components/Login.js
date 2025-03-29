import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { User } from "../context/User";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { verifyUser } from "../API/api.js";

function LoginPage() {
  const { newUser, setNewUser } = useContext(User);
  const [login, setLogin] = useState({ email: "", pwd: "" });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await verifyUser(login);

    if (res?.response?.status === 401) {
      console.log("Unauthorized");
    }

    if (res.status === 200 || res.status === 201 || res.status === 202) {
      const accessToken = res?.data?.accessToken;
      const roles = res?.data?.roles;
      const tm = res?.data;
      setNewUser({ email: login.email, username: tm.username, pwd: login.pwd, name: login.name, accessToken });
      navigate('/welcome');
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  }

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
              <div className="col-md-6 text-center mb-4 mb-md-0">
                <img
                  src="https://img.freepik.com/free-vector/typing-concept-illustration_114360-3866.jpg"
                  alt="Login"
                  className="img-fluid floating-image"
                  style={{ 
                    maxWidth: '90%',
                    filter: 'drop-shadow(0 8px 16px rgba(0, 255, 136, 0.2))',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
              </div>
              <div className="col-md-6">
                <h2 className="text-center fw-bold mb-4" style={{
                  color: '#00ff88',
                  fontSize: '2.25rem',
                  letterSpacing: '-0.5px'
                }}>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                  {[
                    { label: "Email", type: "email", name: "email", icon: "envelope" },
                    { label: "Password", type: "password", name: "pwd", icon: "lock" }
                  ].map((field, index) => (
                    <div key={index} className="mb-4" style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
                      padding: '12px 16px'
                    }}>
                      <div className="d-flex align-items-center">
                        <i className={`fas fa-${field.icon} me-3`} style={{ color: '#00ff88' }}></i>
                        <MDBInput
                          label={field.label}
                          type={field.type}
                          name={field.name}
                          value={login[field.name]}
                          onChange={handleChange}
                          contrast
                          style={{ color: 'white' }}
                          required
                        />
                      </div>
                    </div>
                  ))}

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <MDBBtn
                    type="submit"
                    disabled={loading}
                    className="w-100 mt-4"
                    style={{
                      background: 'linear-gradient(45deg, #00ff88, #00b8ff)',
                      padding: '12px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0, 255, 136, 0.2)'
                    }}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : null}
                    {loading ? 'Logging in...' : 'Login'}
                  </MDBBtn>

                  <p className="text-center mt-4 mb-0" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Don't have an account?{' '}
                    <a href="/signup" style={{
                      color: '#00ff88',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>Register</a>
                  </p>
                </form>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      <style>
        {`
          @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
          }
          .floating-image {
              animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default LoginPage;
