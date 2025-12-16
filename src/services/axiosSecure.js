import axios from "axios";

const axiosSecure = (token) => {
  const instance = axios.create({
    baseURL:
      import.meta.env.VITE_API_URL ||
      "https://contest-hub-server-psi.vercel.app/api",
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
