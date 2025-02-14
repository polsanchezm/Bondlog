import Axios from "axios";

const baseURL = "http://localhost:8000/api/app";
// const baseURL = "https://bondlog.onrender.com/api/app";
const axios = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
