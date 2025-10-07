import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5110/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

export default httpClient;