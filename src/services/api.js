import axios from "axios";
import { supabase } from "./auth";
const n8nURL = import.meta.env.VITE_N8N_WEBHOOK_URL;


const api = axios.create({
    baseURL: n8nURL,

});

api.interceptors.request.use(async (config) => {

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {

        config.headers.Authorization =
            `Bearer ${session.access_token}`;

    }

    return config;

});

export default api;