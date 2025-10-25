import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Debug: log baseURL once in dev and surface network errors
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log("[API] baseURL:", axiosInstance.defaults.baseURL);
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      const cfg = error?.config || {};
      const fullUrl = (cfg.baseURL || "") + (cfg.url || "");
      // eslint-disable-next-line no-console
      console.error("[API] Request failed", {
        url: fullUrl,
        method: cfg.method,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error?.message,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
