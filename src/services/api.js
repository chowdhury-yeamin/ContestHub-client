import axios from "axios";

const api = axios.create({
  baseURL: "https://contest-hub-server-psi.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.error || error.message,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      console.warn("🔒 Unauthorized - Token may be invalid or expired");
    }

    if (error.response?.status === 403) {
      console.warn("🚫 Forbidden - Insufficient permissions");
    }

    if (error.response?.status === 404) {
      console.warn("🔍 Not Found");
    }

    if (error.response?.status >= 500) {
      console.error("🔥 Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;
