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

}