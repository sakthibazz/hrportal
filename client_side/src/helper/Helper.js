import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// ** To get username from Token
export async function getUsername() {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject("Cannot Find Token");
  let decode = jwt_decode(token);
  return decode;
}

// Aurthenticate function
export async function authenticate(username) {
  try {
    return await axios.post('/api/aurthenticate', { username });
  } catch (error) {
    return { error: "Username doesn't exist" };
  }
}

// Get user details
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data;
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

// Get user details for Aroha Technologies recruitments
export async function getArohaRecruitments() {
  try {
    const response = await axios.get('/api/getArohaRecruitments');
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch Aroha Technologies recruitments" };
  }
}
// Get the admin post details by the means of status for recuter
export async function getAdminPostbyStatus() {
  try {
    const response = await axios.get('/api/getAdminPostbyStatus');
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch Aroha Technologies recruitments" };
  }
}

///get ticketnumber details
export async function getTicketNumber(ticketNumber) {
  try {
    const response = await axios.get(`/api/getticketDetails?Ticket_no=${ticketNumber}`);
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch ticket details" };
  }
}

// Get all user details
export async function getAllUserDetails() {
  try {
    const response = await axios.get('/api/getUserDetails');
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch user details" };
  }
}

// Get user details based on search criteria
export async function getUserDetails(searchCriteria) {
  try {
    const response = await axios.get('/api/getUserDetails', { params: searchCriteria });
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch user details" };
  }
}

// Function to fetch candidate counts based on ticket number
export async function getCandidateCounts(ticketNumber) {
  try {
    const response = await axios.get(`/api/getCountByTicket/${ticketNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate counts:', error);
    return { error: "Failed to fetch candidate counts" };
  }
}
// Get all Client details
export async function getAllAdminePostClientDetails() {
  try {
    const response = await axios.get('/api/getAdminPostClientRequirement');
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch user details" };
  }
}

// Get Client details based on search criteria
export async function getAdminPostClientRequirement(searchCriteria) {
  try {
    const response = await axios.get('/api/getAdminPostClientRequirement', { params: searchCriteria });
    return response.data;
  } catch (error) {
    return { error: "Failed to fetch user details" };
  }
}

// Register user
export async function registerUser(credentials) {
  try {
    const { data: { msg }, status } = await axios.post(`api/register`, credentials);
    let { username, email } = credentials;
    // Send email
    if (status === 201) {
      await axios.post('/api/registerMail', { username, userEmail: email, text: msg });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}
// post the recuterpostng details
export async function recuterpost(credentials) {
  try {
    const token = await localStorage.getItem('token');
    const response = await axios.post('/api/recuterpost', credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data.msg);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject(error.response.data.error);
    } else {
      return Promise.reject('An error occurred. Please try again later.');
    }
  }
}
// post the recruiter posting details to the server
export async function Adminpost(credentials) {
  try {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const response = await axios.post('/api/Adminpost', credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Include Content-Type header for POST requests
      },
    });

    return response.data; // Return the server response data to the calling function
  } catch (error) {
    console.error('Error posting recruiter:', error);
    return { error: "Couldn't post recruiter" }; // Return an error object if the request fails
  }
}
// updating the recuter posting details
export async function updateRecuterpost(id, credentials) {
  try {
    const token = await localStorage.getItem('token');
    const response = await axios.put(`/api/updateRecuterpostById/${id}`, credentials, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return Promise.resolve(response.data.msg);
  } catch (error) {
    return Promise.reject({ error: "Couldn't update recruitment post" });
  }
}
// updating the Admin posting details
export async function updateAdminpostById(id, credentials) {
  try {
    const token = await localStorage.getItem('token');
    const response = await axios.put(`/api/updateAdminpostById/${id}`, credentials, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return Promise.resolve(response.data.msg);
  } catch (error) {
    return Promise.reject({ error: "Couldn't update recruitment post" });
  }
}

// delete the admin post by id
export async function deleteAdminpostById(id) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`/api/deleteAdminpostById/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return Promise.resolve(response.data.msg);
  } catch (error) {
    return Promise.reject({ error: "Couldn't delete recruitment post" });
  }
}

// Helper function to get recuter post user details by _id
export async function getUserById(userId) {
  try {
    const response = await axios.get(`/api/postuser/${userId}`);
    return response.data.data; // Assuming your server returns the user data in the format { data: user }
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
}
// Helper function to fetch Adminpost details by _id
export async function getAdmindetailsById(userId) {
  try {
    const response = await axios.get(`/api/getAdminPostById/${userId}`);
    return response.data.data; // Assuming your server returns the user data in the format { data: user }
  } catch (error) {
    throw new Error('Failed to fetch user details');
  }
}

// Login function
export async function verifyPassword({ username, password }) {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const { data } = await axios.post('/api/login', { username, password });
    return { data };
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match", originalError: error });
  }
}

// Update user function
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem('token');
    const data = await axios.put('/api/updateuser', response, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update profile" });
  }
}

// Generate OTP
export async function generateOTP(username) {
  try {
    const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });
    // Send mail with the OTP
    if (status === 201) {
      const { email } = await getUser({ username });
      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password recovery OTP" });
    }
    return Promise.resolve(code);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the range of 2xx
      const { status, data } = error.response;
      return Promise.reject({ status, error: data.error });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ error: "No response received from the server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ error: "An error occurred while making the request" });
    }
  }
}

export async function verifyOTP({ username, code }) {
  try {
    const response = await axios.get('/api/verifyOTP', {
      params: { username, code },
    });

    const { data, status } = response;
    return { data, status };
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code outside the range of 2xx
      const { status, data } = error.response;
      return Promise.reject({ status, error: data.error });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.reject({ error: "No response received from the server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject({ error: "An error occurred while making the request" });
    }
  }
}

// Reset password
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put('/api/resetPassword', { username, password });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

//complaient details
export async function complaient(credentials) {
  try {
    const token = await localStorage.getItem('token');
    const response = await axios.post('/api/complaient', credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve(response.data.msg);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      return Promise.reject(error.response.data.error);
    } else {
      return Promise.reject('An error occurred. Please try again later.');
    }
  }
}

// Function to get user details based on username
export async function getRecuterSourcedDetails(username) {
  try {
    // Make a GET request to the server's endpoint with the provided username
    const response = await axios.get(`/api/getRecuterSourcedDetails/${username}`);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error('Error fetching user details:', error);

    // You can choose to throw the error or return an error object as needed
    throw error;
  }
}