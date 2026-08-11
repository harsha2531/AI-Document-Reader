import { useState } from "react";
import UserLayout from "../layouts/UserLayout";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { sendChatMessage } from "../services/chat";

export default function Chat() {

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // SEND MESSAGE
    // =====================================================

    async function handleSend(message) {

        setError("");


        // Add user's message immediately

        setMessages((previous) => [

            ...previous,

            {
                role: "user",
                content: message
            }

        ]);


        try {

            setLoading(true);


            const response =
                await sendChatMessage(message);


            console.log(
                "Chat response:",
                response
            );


            // =================================================
            // Expected backend response
            //
            // {
            //   answer: "...",
            //   source: "...",
            //   version: "...",
            //   category: "Sales"
            // }
            // =================================================


            if (response?.success === false) {

                throw new Error(
                    response.message ||
                    "Unable to get AI response."
                );

            }


            const answer =
                response?.answer ||
                response?.output ||
                response?.message ||
                "I couldn't find an answer.";


            setMessages((previous) => [

                ...previous,

                {
                    role: "assistant",
                    content: answer,
                    source:
                        response?.source ||
                        response?.document_name ||
                        null,
                    version:
                        response?.version ||
                        null,
                    category:
                        response?.category ||
                        null
                }

            ]);


        } catch (error) {

            console.error(
                "Chat error:",
                error
            );


            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to get AI response."
            );


        } finally {

            setLoading(false);

        }

    }


    return (

        <UserLayout>

            <div className="mb-4">

                <h2>
                    AI Document Assistant
                </h2>

                <p className="text-muted mb-0">

                    Ask questions about information
                    in your department documents.

                </p>

            </div>


            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            <ChatWindow
                messages={messages}
                loading={loading}
            />


            <div className="mt-3">

                <ChatInput
                    onSend={handleSend}
                    disabled={loading}
                />

            </div>

        </UserLayout>

    );

}
