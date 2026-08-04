import { useState } from "react";
import api from "../services/api";

export default function FileTable({
    files,
    loading,
    refreshFiles
}) {

    const [deletingId, setDeletingId] = useState(null);


    // =====================================================
    // DELETE FILE
    // =====================================================

    async function handleDelete(file) {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${file.name}"?`
        );


        if (!confirmed) {

            return;

        }


        try {

            setDeletingId(file.id);


            const response = await api.post(
                "/files/delete",
                {
                    fileId: file.id
                }
            );


            if (response.data) {

                alert(
                    "File deleted successfully."
                );


                await refreshFiles();

            } else {

                alert(
                    response.data?.message ||
                    "Unable to delete file."
                );

            }

        } catch (error) {

            console.error(
                "Delete file error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Unable to delete file."
            );

        } finally {

            setDeletingId(null);

        }

    }


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="card">

                <div className="card-body text-center p-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="mt-3 mb-0">
                        Loading department files...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // EMPTY
    // =====================================================

    if (!files || files.length === 0) {

        return (

            <div className="card">

                <div className="card-body text-center p-5">

                    <h5>
                        No Files Found
                    </h5>

                    <p className="text-muted mb-0">
                        There are currently no files
                        available in your department.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // FILE TABLE
    // =====================================================

    return (

        <div className="card shadow-sm">

            <div className="card-body p-0">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark">

                            <tr>

                                <th>
                                    File ID
                                </th>

                                <th>
                                    File Name
                                </th>

                                <th>
                                    Modified Time
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {files.map((file) => (

                                <tr
                                    key={file.id}
                                >

                                    {/* =========================
                                        FILE ID
                                    ========================== */}

                                    <td>

                                        <code>
                                            {file.id}
                                        </code>

                                    </td>


                                    {/* =========================
                                        FILE NAME
                                    ========================== */}

                                    <td>

                                        <strong>
                                            {file.name}
                                        </strong>

                                    </td>


                                    {/* =========================
                                        MODIFIED TIME
                                    ========================== */}

                                    <td>

                                        {file.modifiedTime
                                            ? new Date(
                                                file.modifiedTime
                                            ).toLocaleString()
                                            : "-"
                                        }

                                    </td>


                                    {/* =========================
                                        ACTION
                                    ========================== */}

                                    <td>

                                        <div className="d-flex gap-2">

                                            {/* OPEN FILE */}

                                            {file.webViewLink && (

                                                <a
                                                    href={
                                                        file.webViewLink
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Open
                                                </a>

                                            )}


                                            {/* DELETE FILE */}

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                disabled={
                                                    deletingId === file.id
                                                }
                                                onClick={() =>
                                                    handleDelete(file)
                                                }
                                            >

                                                {deletingId === file.id
                                                    ? "Deleting..."
                                                    : "Delete"
                                                }

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}


/*
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

}*/
