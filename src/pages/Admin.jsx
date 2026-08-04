import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

export default function Admin() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [processingId, setProcessingId] = useState(null);

    async function loadUsers() {

        try {

            setLoading(true);

            const response = await api.get(
                "/admin/users"
            );

            if (response.data.success) {

                setUsers(
                    response.data.users || []
                );

            } else {

                alert(
                    response.data.message ||
                    "Unable to load users."
                );

            }

        } catch (error) {

            console.error(
                "Load users error:",
                error
            );

            alert(
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    }

    async function approveUser(userId) {

        try {

            setProcessingId(userId);

            const response = await api.post(
                "/admin/approve",
                {
                    userId: userId
                }
            );

            if (response.data.success) {

                alert(
                    "User approved successfully."
                );

                await loadUsers();

            } else {

                alert(
                    response.data.message ||
                    "Approval failed."
                );

            }

        } catch (error) {

            console.error(
                "Approve user error:",
                error
            );

            alert(
                "Failed to approve user."
            );

        } finally {

            setProcessingId(null);

        }

    }

    useEffect(() => {

        loadUsers();

    }, []);

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>
                        User Management
                    </h2>

                    <p className="text-muted">
                        Manage registered users and approvals.
                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={loadUsers}
                >
                    Refresh
                </button>

            </div>

            {loading ? (

                <div className="text-center p-4">
                    Loading users...
                </div>

            ) : users.length === 0 ? (

                <div className="alert alert-info">
                    No users found.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Department</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Action</th>

                        </tr>

                        </thead>

                        <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>
                                    {user.full_name}
                                </td>

                                <td>
                                    {user.email || "-"}
                                </td>

                                <td>
                                    {user.department}
                                </td>

                                <td>
                                    {user.role}
                                </td>

                                <td>

                                    {user.approved ? (

                                        <span className="badge bg-success">
                                                Approved
                                            </span>

                                    ) : (

                                        <span className="badge bg-warning text-dark">
                                                Pending
                                            </span>

                                    )}

                                </td>

                                <td>

                                    {!user.approved && (

                                        <button
                                            className="btn btn-success btn-sm"
                                            disabled={
                                                processingId === user.id
                                            }
                                            onClick={() =>
                                                approveUser(user.id)
                                            }
                                        >

                                            {processingId === user.id
                                                ? "Approving..."
                                                : "Approve"
                                            }

                                        </button>

                                    )}

                                    {user.approved && (

                                        <span className="text-success">
                                                ✓ Approved
                                            </span>

                                    )}

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            )}

        </AdminLayout>

    );

}