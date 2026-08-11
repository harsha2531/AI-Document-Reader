import api from "./api";


// =====================================================
// SEND CHAT MESSAGE
// =====================================================

export async function sendChatMessage(message) {

    try {

        const response = await api.post(
            "/chat",
            {
                message: message
            }
        );


        return response.data;

    } catch (error) {

        console.error(
            "Chat API error:",
            error
        );


        throw error;

    }

}
