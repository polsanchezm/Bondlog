import Axios from "axios";

const localURL = "http://localhost:8000/api/app";
const renderURL = "https://bondlog.onrender.com/api/app";
const axios = Axios.create({
  baseURL: renderURL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
