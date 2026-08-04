import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import FileTable from "../components/FileTable";
import UploadButton from "../components/UploadButton";
import api from "../services/api";

export default function Files() {

    const [files, setFiles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    async function loadFiles() {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/files/list"
            );

            if (response.data.success) {

                setFiles(
                    response.data.files || []
                );

            } else {

                setError(
                    response.data.message ||
                    "Unable to load files."
                );

            }

        } catch (error) {

            console.error(
                "Load files error:",
                error
            );

            setError(
                "Unable to load department files."
            );

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

                <div>

                    <h2>
                        Department Files
                    </h2>

                    <p className="text-muted mb-0">
                        Manage files belonging to your department.
                    </p>

                </div>

                <UploadButton
                    refreshFiles={loadFiles}
                />

            </div>

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}

            <FileTable
                files={files}
                loading={loading}
                refreshFiles={loadFiles}
            />

        </UserLayout>

    );

}