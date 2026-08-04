import { useState } from "react";
import api from "../services/api";

export default function FileTable({
                                      files,
                                      loading,
                                      refreshFiles
                                  }) {

    const [deletingId, setDeletingId] = useState(null);

    async function deleteFile(fileId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this file?"
        );

        if (!confirmed) return;

        try {

            setDeletingId(fileId);

            const response = await api.post(
                "/files/delete",
                {
                    fileId: fileId
                }
            );

            if (response.data.success) {

                alert("File deleted successfully.");

                refreshFiles();

            } else {

                alert(
                    response.data.message ||
                    "Failed to delete file."
                );

            }

        } catch (error) {

            console.error("Delete error:", error);

            alert("Failed to delete file.");

        } finally {

            setDeletingId(null);

        }

    }

    if (loading) {

        return (
            <div className="text-center p-4">
                Loading files...
            </div>
        );

    }

    if (!files || files.length === 0) {

        return (
            <div className="alert alert-info">
                No files found in your department.
            </div>
        );

    }

    return (

        <div className="table-responsive">

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                <tr>

                    <th>File Name</th>

                    <th>Size</th>

                    <th>Modified</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {files.map((file) => (

                    <tr key={file.id}>

                        <td>
                            {file.name}
                        </td>

                        <td>
                            {file.size || "-"}
                        </td>

                        <td>
                            {file.modified
                                ? new Date(
                                    file.modified
                                ).toLocaleString()
                                : "-"
                            }
                        </td>

                        <td>

                            <button
                                className="btn btn-danger btn-sm"
                                disabled={
                                    deletingId === file.id
                                }
                                onClick={() =>
                                    deleteFile(file.id)
                                }
                            >

                                {deletingId === file.id
                                    ? "Deleting..."
                                    : "Delete"
                                }

                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}