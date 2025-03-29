import React, { useContext, useState } from 'react';
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { User } from "../context/User";
import { useNavigate } from 'react-router-dom';
import { addClient } from "../API/api";

function App() {
    const { newUser, setNewUser } = useContext(User);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, username, email, pwd, confirmPassword } = newUser;

        if (!name || !username || !email || !pwd || !confirmPassword) {
            alert('Please fill in all required fields.');
            return;
        }
        if (pwd !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setLoading(true);
        try {
            const response = await addClient({ name, email, pwd, username });
            if (Number(response.status) === 201 || Number(response.status) === 202) {
                setNewUser({ name: newUser.name, username: newUser.username, email: newUser.email });
                navigate('/otp');
            } else {
                setError(response.message || 'Registration failed.');
            }
        } catch (err) {
            console.error("Error during registration:", err);
            setError('An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
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
                            <div className="col-md-6 order-2 order-md-1">
                                <h2 className="text-center fw-bold mb-4" style={{
                                    color: '#00ff88',
                                    fontSize: '2.25rem',
                                    letterSpacing: '-0.5px'
                                }}>Create Account</h2>
                                
                                <form onSubmit={handleSubmit}>
                                    {[
                                        { icon: "user", label: "Your Name", name: "name", type: "text" },
                                        { icon: "user-tag", label: "Username", name: "username", type: "text" },
                                        { icon: "envelope", label: "Your Email", name: "email", type: "email" },
                                        { icon: "lock", label: "Password", name: "pwd", type: "password" },
                                        { icon: "key", label: "Confirm Password", name: "confirmPassword", type: "password" }
                                    ].map((field, index) => (
                                        <div key={index} className="mb-3" style={{
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            borderRadius: '12px',
                                            padding: '12px 16px'
                                        }}>
                                            <div className="d-flex align-items-center">
                                                <MDBIcon fas icon={field.icon} className="me-3" style={{ color: '#00ff88' }} />
                                                <MDBInput
                                                    label={field.label}
                                                    type={field.type}
                                                    name={field.name}
                                                    onChange={handleChange}
                                                    contrast
                                                    style={{ color: 'white' }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}

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
                                        {loading ? 'Creating Account...' : 'Sign Up'}
                                    </MDBBtn>
                                </form>
                            </div>
                            
                            <div className="col-md-6 text-center mb-4 mb-md-0 order-1 order-md-2">
                                <img
                                    src="https://img.freepik.com/free-vector/computer-typing-concept-illustration_114360-3948.jpg"
                                    alt="Sign Up"
                                    className="img-fluid floating-image"
                                    style={{ 
                                        maxWidth: '90%',
                                        filter: 'drop-shadow(0 8px 16px rgba(0, 255, 136, 0.2))',
                                        animation: 'float 3s ease-in-out infinite'
                                    }}
                                />
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

export default App;
