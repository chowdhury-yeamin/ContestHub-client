import axios from "axios";

const axiosSecure = (token) => {
  const instance = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default axiosSecure;
