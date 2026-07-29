import axios from "axios";
import { supabase } from "./auth";

const api = axios.create({
    baseURL: "https://n8n-b0y5.srv1803042.hstgr.cloud/webhook",
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