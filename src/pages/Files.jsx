import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import FileTable from "../components/FileTable";
import UploadButton from "../components/UploadButton";
import api from "../services/api";

export default function Files() {

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadFiles() {

        try {

            setLoading(true);

            const response = await api.get("/files/list");

            if (response.data.success) {

                setFiles(response.data.files);

            }

        } catch (error) {

            console.error(error);

            alert("Failed to load files.");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadFiles();

    }, []);

    return (

        <UserLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Department Files</h2>

                <UploadButton refreshFiles={loadFiles} />

            </div>

            <FileTable
                files={files}
                loading={loading}
                refreshFiles={loadFiles}
            />

        </UserLayout>

    );

}