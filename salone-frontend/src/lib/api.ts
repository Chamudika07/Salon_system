import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  // Only access localStorage on client side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    console.log("API Request - Token:", token ? "Present" : "Missing");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("API Request - Authorization header set");
    }
  }
  console.log("API Request URL:", config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data, error.config?.url);
    return Promise.reject(error);
  }
);

export default api;
