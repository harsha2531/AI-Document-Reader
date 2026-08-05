import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import api from "../services/api";

export default function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD PROFILE
    // =====================================================


    async function loadProfile() {

        try {

            setLoading(true);

            setError("");


            const response = await api.get(
                "/profile"
            );


            console.log(
                "Profile API response:",
                response.data
            );


            // =================================================
            // n8n returns a direct array:
            //
            // [
            //   {
            //     id,
            //     full_name,
            //     department,
            //     role,
            //     approved,
            //     created_at,
            //     email
            //   }
            // ]
            // =================================================

            if (
                Array.isArray(response.data) &&
                response.data.length > 0
            ) {

                setProfile(
                    response.data[0]
                );

            } else {

                setProfile(null);

                setError(
                    "Profile information was not found."
                );

            }


        } catch (error) {

            console.error(
                "Load profile error:",
                error
            );


            console.error(
                "Server response:",
                error.response?.data
            );


            setError(
                error.response?.data?.message ||
                "Unable to load profile."
            );


        } finally {

            setLoading(false);

        }

    }


    // =====================================================
    // LOAD PROFILE WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        loadProfile();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <UserLayout>

                <div className="text-center p-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    />

                    <p className="mt-3">
                        Loading profile...
                    </p>


                </div>

            </UserLayout>

        );

    }




    // =====================================================
    // PROFILE NOT FOUND
    // =====================================================

    if (!profile && !loading) {

        return (

            <UserLayout>
                <div className="alert alert-danger">

                    {error}

                </div>
                <div className="alert alert-warning">

                    Profile information is not available.

                </div>

            </UserLayout>

        );

    }

    // =====================================================
    // PROFILE PAGE
    // =====================================================

    return (

        <UserLayout>

            <div className="mb-4">

                <h2>
                    My Profile
                </h2>

                <p className="text-muted">
                    View your account information.
                </p>

            </div>
            {error && profile.length === 0 && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            <div className="row">

                <div className="col-lg-8">

                    <div className="card shadow-sm">

                        <div className="card-header">

                            <h5 className="mb-0">
                                Account Information
                            </h5>

                        </div>


                        <div className="card-body">


                            {/* ============================
                                FULL NAME
                            ============================= */}

                            <div className="row mb-3">

                                <div className="col-sm-4">

                                    <strong>
                                        Full Name
                                    </strong>

                                </div>

                                <div className="col-sm-8">

                                    {profile.full_name || "-"}

                                </div>

                            </div>


                            {/* ============================
                                EMAIL
                            ============================= */}

                            <div className="row mb-3">

                                <div className="col-sm-4">

                                    <strong>
                                        Email
                                    </strong>

                                </div>

                                <div className="col-sm-8">

                                    {profile.email || "-"}

                                </div>

                            </div>


                            {/* ============================
                                DEPARTMENT
                            ============================= */}

                            <div className="row mb-3">

                                <div className="col-sm-4">

                                    <strong>
                                        Department
                                    </strong>

                                </div>

                                <div className="col-sm-8">

                                    <span className="badge bg-primary">

                                        {profile.department || "-"}

                                    </span>

                                </div>

                            </div>


                            {/* ============================
                                ROLE
                            ============================= */}

                            <div className="row mb-3">

                                <div className="col-sm-4">

                                    <strong>
                                        Role
                                    </strong>

                                </div>

                                <div className="col-sm-8">

                                    {profile.role === "admin" ? (

                                        <span className="badge bg-dark">
                                            Admin
                                        </span>

                                    ) : (

                                        <span className="badge bg-secondary">
                                            User
                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* ============================
                                APPROVAL STATUS
                            ============================= */}

                            <div className="row mb-3">

                                <div className="col-sm-4">

                                    <strong>
                                        Account Status
                                    </strong>

                                </div>

                                <div className="col-sm-8">

                                    {profile.approved === true ? (

                                        <span className="badge bg-success">
                                            Approved
                                        </span>

                                    ) : (

                                        <span className="badge bg-warning text-dark">
                                            Pending Approval
                                        </span>

                                    )}

                                </div>

                            </div>


                            {/* ============================
                                CREATED DATE
                            ============================= */}

                            <div className="row mb-0">

                                <div className="col-sm-4">

                                    <strong>
                                        Registered On
                                    </strong>

                                </div>

                                <div className="col-sm-8">

                                    {profile.created_at
                                        ? new Date(
                                            profile.created_at
                                        ).toLocaleString()
                                        : "-"
                                    }

                                </div>

                            </div>


                        </div>

                    </div>

                </div>


                {/* ==========================================
                    ACCOUNT SUMMARY
                =========================================== */}

                <div className="col-lg-4 mt-4 mt-lg-0">

                    <div className="card shadow-sm">

                        <div className="card-body text-center">

                            <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    fontSize: "32px"
                                }}
                            >

                                {profile.full_name
                                    ? profile.full_name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "U"
                                }

                            </div>


                            <h5>
                                {profile.full_name}
                            </h5>


                            <p className="text-muted mb-2">

                                {profile.email}

                            </p>


                            <span className="badge bg-primary">

                                {profile.department}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </UserLayout>

    );

}


/*
import { useEffect, useState } from "react";
import UserLayout from "../layouts/UserLayout";
import api from "../services/api";

export default function Profile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    async function loadProfile() {

        try {

            setLoading(true);

            setError("");

            const response = await api.get(
                "/profile"
            );

            if (response.data.success) {

                setProfile(
                    response.data.profile
                );

            } else {

                setError(
                    response.data.message ||
                    "Unable to load profile."
                );

            }

        } catch (error) {

            console.error(
                "Profile error:",
                error
            );

            setError(
                "Unable to load profile."
            );

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadProfile();

    }, []);

    return (

        <UserLayout>

            <h2>
                My Profile
            </h2>

            <hr />

            {loading && (

                <p>
                    Loading profile...
                </p>

            )}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}

            {profile && (

                <div className="card">

                    <div className="card-body">

                        <h5 className="card-title mb-4">
                            Account Information
                        </h5>

                        <p>

                            <strong>Name:</strong>{" "}

                            {profile.full_name || "-"}

                        </p>

                        <p>

                            <strong>Email:</strong>{" "}

                            {profile.email || "-"}

                        </p>

                        <p>

                            <strong>Department:</strong>{" "}

                            {profile.department || "-"}

                        </p>

                        <p>

                            <strong>Role:</strong>{" "}

                            {profile.role || "-"}

                        </p>

                        <p>

                            <strong>Approval Status:</strong>{" "}

                            {profile.approved ? (

                                <span className="badge bg-success">
                                    Approved
                                </span>

                            ) : (

                                <span className="badge bg-warning text-dark">
                                    Pending
                                </span>

                            )}

                        </p>

                    </div>

                </div>

            )}

        </UserLayout>

    );

}*/
