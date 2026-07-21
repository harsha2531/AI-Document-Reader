import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5678/webhook",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;