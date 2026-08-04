import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/auth";

export default function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleRegister(event) {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !fullName ||
            !email ||
            !department ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please complete all required fields."
            );

            return;
        }

        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }

        try {

            setLoading(true);

            /*
             * IMPORTANT:
             * A public registration can NEVER choose
             * the admin role.
             *
             * New users are always created as:
             *
             * role = user
             * approved = false
             */

            const {
                data,
                error
            } = await supabase.auth.signUp({

                email: email.trim(),

                password: password,

                options: {

                    data: {

                        full_name:
                            fullName.trim(),

                        department:
                            department,

                        role: "user"

                    }

                }

            });

            if (error) {

                setError(error.message);

                return;
            }

            /*
             * If email confirmation is enabled,
             * Supabase may require the user to
             * confirm their email first.
             */

            if (data.user) {

                setSuccess(
                    "Registration submitted successfully. " +
                    "Your account is waiting for administrator approval."
                );

                setTimeout(() => {

                    navigate("/waiting");

                }, 2000);

            }

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setError(
                error.message ||
                "Unable to create your account."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card register-card">

                <div className="text-center mb-4">

                    <div className="system-icon">
                        AI
                    </div>

                    <h1 className="system-name">
                        AI Multiple Documents Reader
                    </h1>

                    <p className="company-name">
                        Startup Solutions (Pvt) Ltd
                    </p>

                    <p className="text-muted">
                        Create your account
                    </p>

                </div>

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="alert alert-success">
                        {success}
                    </div>

                )}

                <form onSubmit={handleRegister}>

                    <div className="mb-3">

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(event) =>
                                setFullName(
                                    event.target.value
                                )
                            }
                            autoComplete="name"
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            autoComplete="email"
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Department
                        </label>

                        <select
                            className="form-select"
                            value={department}
                            onChange={(event) =>
                                setDepartment(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select your department
                            </option>

                            <option value="Sales">
                                Sales
                            </option>

                            <option value="Marketing">
                                Marketing
                            </option>

                            <option value="HR">
                                HR
                            </option>

                        </select>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="new-password"
                            required
                        />

                        <small className="text-muted">
                            Minimum 6 characters
                        </small>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            autoComplete="new-password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }

                    </button>

                </form>

                <div className="approval-notice mt-4">

                    <strong>
                        Account Approval Required
                    </strong>

                    <p className="mb-0 mt-1">
                        Your account must be approved by
                        an administrator before you can
                        access the system.
                    </p>

                </div>

                <div className="text-center mt-4">

                    <p className="mb-0 text-muted">
                        Already have an account?
                    </p>

                    <Link
                        to="/login"
                        className="fw-semibold"
                    >
                        Sign in here
                    </Link>

                </div>

                <div className="auth-footer">

                    <small>
                        Secure document management powered by
                        AI and automation
                    </small>

                </div>

            </div>

        </div>

    );

}
