import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000", // backend API
  withCredentials: true, // <--- crucial for sending cookies
});

export default axiosClient;
