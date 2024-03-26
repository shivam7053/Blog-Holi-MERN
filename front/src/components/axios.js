import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5001',
  withCredentials: true, // Enable sending cookies for CORS
});

export default instance;
