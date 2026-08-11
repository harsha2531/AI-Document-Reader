export default function ChatWindow({
    messages,
    loading
}) {

    return (

        <div
            className="card shadow-sm"
            style={{
                height: "500px"
            }}
        >

            <div
                className="card-body overflow-auto"
            >

                {messages.length === 0 && (

                    <div className="text-center text-muted mt-5">

                        <h5>
                            AI Company Knowledge Assistant
                        </h5>

                        <p>
                            Ask questions about the documents
                            available to your department.
                        </p>

                    </div>

                )}


                {messages.map(
                    (message, index) => (

                        <div
                            key={index}
                            className={
                                `d-flex mb-3 ${
    message.role === "user"
        ? "justify-content-end"
        : "justify-content-start"
}`
                            }
                        >

                            <div
                                className={
                                    message.role === "user"
                                        ? "bg-primary text-white rounded p-3"
                                        : "bg-light border rounded p-3"
                                }
                                style={{
                                    maxWidth: "75%"
                                }}
                            >

                                <div
                                    className="small fw-bold mb-1"
                                >

                                    {message.role === "user"
                                        ? "You"
                                        : "AI Assistant"
                                    }

                                </div>


                                <div
                                    style={{
                                        whiteSpace: "pre-wrap"
                                    }}
                                >

                                    {message.content}

                                </div>


                                {/* ==========================
                                    SOURCE DOCUMENT
                                =========================== */}

                                {message.source && (

                                    <div
                                        className="mt-3 pt-2 border-top small"
                                    >

                                        <strong>
                                            Source:
                                        </strong>

                                        <div>
                                            {message.source}
                                        </div>


                                        {message.version && (

                                            <div>
                                                Version:{" "}
                                                {message.version}
                                            </div>

                                        )}


                                        {message.category && (

                                            <div>
                                                Department:{" "}
                                                {message.category}
                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                        </div>

                    )
                )}


                {loading && (

                    <div className="d-flex justify-content-start mb-3">

                        <div className="bg-light border rounded p-3">

                            <span>
                                AI is thinking...
                            </span>

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}
