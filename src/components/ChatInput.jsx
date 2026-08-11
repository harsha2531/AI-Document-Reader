import { useState } from "react";

export default function ChatInput({
    onSend,
    disabled = false
}) {

    const [message, setMessage] = useState("");


    // =====================================================
    // SEND MESSAGE
    // =====================================================

    function handleSubmit(event) {

        event.preventDefault();


        const trimmedMessage =
            message.trim();


        if (!trimmedMessage) {

            return;

        }


        onSend(trimmedMessage);

        setMessage("");

    }


    // =====================================================
    // HANDLE ENTER KEY
    // =====================================================

    function handleKeyDown(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            handleSubmit(event);

        }

    }


    return (

        <form
            onSubmit={handleSubmit}
            className="d-flex gap-2"
        >

            <textarea
                className="form-control"
                rows="1"
                placeholder="Ask a question about your department documents..."
                value={message}
                onChange={(event) =>
                    setMessage(event.target.value)
                }
                onKeyDown={handleKeyDown}
                disabled={disabled}
                style={{
                    resize: "none"
                }}
            />


            <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={
                    disabled ||
                    !message.trim()
                }
            >

                {disabled
                    ? "..."
                    : "Send"
                }

            </button>

        </form>

    );

}
