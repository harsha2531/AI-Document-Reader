import { useRef, useState } from "react";
import api from "../services/api";

export default function UploadButton({ refreshFiles }) {

    const inputRef = useRef(null);

    const [uploading, setUploading] = useState(false);

    async function uploadFile(event) {

        const file = event.target.files?.[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("file", file);

        try {

            setUploading(true);

            const response = await api.post(
                "/files/upload",
                formData
            );

            if (response.data) {

                alert("File uploaded successfully.");

                refreshFiles();

            } else {

                alert(
                    response.data ||
                    "Upload failed."
                );

            }

        } catch (error) {

            console.error("Upload error:", error);

            alert("Failed to upload file.");

        } finally {

            setUploading(false);

            event.target.value = "";

        }

    }

    return (

        <>
            <input
                ref={inputRef}
                type="file"
                hidden
                onChange={uploadFile}
            />

            <button
                className="btn btn-success"
                disabled={uploading}
                onClick={() =>
                    inputRef.current?.click()
                }
            >

                {uploading
                    ? "Uploading..."
                    : "Upload File"
                }

            </button>
        </>

    );

}