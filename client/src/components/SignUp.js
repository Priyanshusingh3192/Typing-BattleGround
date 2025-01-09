import React, { useContext, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { User } from "../context/User";
import { useNavigate } from 'react-router-dom';
import { addClient } from "../API/api"; // Import the API function
import './CSS/Bubbles.css'; // Import the CSS for bubbles

function App() {
  const { newUser, setNewUser } = useContext(User);  // Get both newUser and setNewUser from context
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
    // alert("dfdfndfndf");
     e.preventDefault();
    console.log("Mai hu ",newUser)
   
    const { name, username, email, pwd, confirmPassword } = newUser;  // Access newUser directly

    console.log("User data being submitted:", newUser);

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
      const response = await addClient({
        name, email,pwd,username,
      });
      console.log("bahar",response);
      if (Number(response.status) === 201 || Number(response.status) === 202) {
        console.log("OTP SENT: ", response.message);
        setNewUser({
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
        });
        navigate('/otp');
      } else {
        setError(response.message || 'Registration failed.');
        // setError('Registration failed.');
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bubbles-container">
      {/* Bubble effect */}
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      <MDBContainer fluid style={{ minHeight: '100vh', padding: '20px' }}>
        <MDBCard className="text-black m-5" style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md="10" lg="6" className="order-2 order-lg-1 d-flex flex-column align-items-center">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput
                      label="Your Name"
                      id="form1"
                      type="text"
                      className="w-100"
                      name="name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="user-tag me-3" size="lg" />
                    <MDBInput
                      label="Username"
                      id="formUsername"
                      type="text"
                      className="w-100"
                      name="username"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput
                      label="Your Email"
                      id="form2"
                      type="email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput
                      label="Password"
                      id="form3"
                      type="pwd"
                      name="pwd"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput
                      label="Confirm pwd"
                      id="form4"
                      type="pwd"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <MDBCheckbox
                      name="newsletter"
                      id="flexCheckDefault"
                      label="Subscribe to our newsletter"
                      onChange={handleChange}
                    />
                  </div>

                  <MDBBtn className="mb-4" size="lg" type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                  </MDBBtn>
                  {error && <p className="text-danger">{error}</p>}
                </MDBCol>

                <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                  <MDBCardImage
                    src="https://talentmed.edu.au/wp-content/uploads/2018/08/Untitled-design-32.png"
                    fluid
                  />
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default App;
