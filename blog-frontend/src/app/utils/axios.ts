import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000/api/app",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
