import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../services/api";

export default function Admin() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [processingId, setProcessingId] = useState(null);


    // =====================================================
    // LOAD USERS
    // =====================================================

    async function loadUsers() {
        try {
            setLoading(true);

            // Clear any previous error before loading
            setError("");

            console.log("Loading admin users...");

            const response = await api.get("/admin/users");

            console.log(
                "Admin users API response:",
                response.data
            );

            let userList = [];

            // =====================================================
            // Format A
            // {
            //    success: true,
            //    users: [...]
            // }
            // =====================================================

            if (
                response.data &&
                response.data.success === true
            ) {
                userList = response.data.users || [];
            }

                // =====================================================
                // Format B
                // [
                //    {...},
                //    {...}
                // ]
            // =====================================================

            else if (
                Array.isArray(response.data)
            ) {
                userList = response.data;
            }

                // =====================================================
                // Format C
                // {
                //    users: [...]
                // }
            // =====================================================

            else if (
                response.data &&
                Array.isArray(response.data.users)
            ) {
                userList = response.data.users;
            }

                // =====================================================
                // Unknown response
            // =====================================================

            else {
                console.error(
                    "Unexpected API response:",
                    response.data
                );

                setUsers([]);

                setError(
                    "Unexpected response from server."
                );

                return;
            }

            console.log(
                "Users loaded successfully:",
                userList
            );

            // =====================================================
            // SUCCESS
            // =====================================================

            setUsers(userList);

            // IMPORTANT:
            // Remove any previous error after successful loading
            setError("");

        } catch (error) {

            console.error(
                "Load users error:",
                error
            );

            console.error(
                "Server response:",
                error.response?.data
            );

            // Only show error when the request actually fails
            setError(
                error.response?.data?.message ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);
        }
    }


    // =====================================================
    // APPROVE USER
    // =====================================================

    async function approveUser(userId) {

        const confirmed = window.confirm(
            "Are you sure you want to approve this user?"
        );

        if (!confirmed) {
            return;
        }


        try {

            setProcessingId(userId);

            setError("");


            console.log(
                "Approving user:",
                userId
            );


            const response = await api.post(
                "/admin/approve",
                {
                    userId: userId
                }
            );


            console.log(
                "Approve response:",
                response.data
            );


            if (
                response.data?.success === true ||
                response.status >= 200 &&
                response.status < 300
            ) {

                alert(
                    "User approved successfully."
                );

                await loadUsers();

            } else {

                alert(
                    response.data?.message ||
                    "Approval failed."
                );

            }


        } catch (error) {

            console.error(
                "Approve user error:",
                error
            );


            console.error(
                "Server response:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to approve user."
            );


        } finally {

            setProcessingId(null);

        }

    }


    // =====================================================
    // LOAD USERS WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        loadUsers();

    }, []);


    // =====================================================
    // UI
    // =====================================================

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2>
                        User Management
                    </h2>

                    <p className="text-muted mb-0">
                        Manage registered users and approvals.
                    </p>

                </div>


                <button
                    className="btn btn-primary"
                    onClick={loadUsers}
                    disabled={loading}
                >

                    {loading
                        ? "Loading..."
                        : "Refresh"
                    }

                </button>

            </div>


            {error && users.length === 0 && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {loading ? (

                <div className="text-center p-4">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="mt-3">
                        Loading users...
                    </p>

                </div>

            ) : users.length === 0 ? (

                <div className="alert alert-info">

                    No registered users found.

                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        {user.full_name || "-"}
                                    </td>


                                    <td>
                                        {user.email || "-"}
                                    </td>


                                    <td>
                                        {user.department || "-"}
                                    </td>


                                    <td>

                                        {user.role === "admin" ? (

                                            <span className="badge bg-dark">
                                                Admin
                                            </span>

                                        ) : (

                                            <span className="badge bg-secondary">
                                                User
                                            </span>

                                        )}

                                    </td>


                                    <td>

                                        {user.approved === true ? (

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

                                        {user.approved === true ? (

                                            <span className="text-success">
                                                ✓ Approved
                                            </span>

                                        ) : (

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



/*
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

}*/
