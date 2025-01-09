import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your actual API base URL

/**
 * Registers a new client by sending their details to the API.
 *
 * @param {Object} clientData - An object containing user details (name, username, email, password).
 * @returns {Object} - The response from the server.
 */
export const addClient = async (clientData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/register`, clientData,);
       return {
        status: response.status,
        data: response.data,
      }
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Registration failed.');
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      // Other unexpected errors
      console.error('Error setting up request:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  }
};
// Verify OTP function
export const verifyOtp = async (otpData) => {
    try {
      // Send a POST request to verify OTP
      const response = await axios.post(`${BASE_URL}/user/otp`, otpData);
      
      // Return the response if the request is successful
      return response;
    } catch (error) {
      // If there's an error, catch it and return a structured error response
      console.error('Error verifying OTP:', error.response || error.message);
      return {
        status: error.response?.status || 500,
        response: error.response || { data: 'An error occurred while verifying OTP.' }
      };
    }
  };
