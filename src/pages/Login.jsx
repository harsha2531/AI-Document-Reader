import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(event) {

        event.preventDefault();

        setError("");

        if (!email || !password) {

            setError(
                "Please enter your email and password."
            );

            return;
        }

        try {

            setLoading(true);

            const result = await login(
                email,
                password
            );

            if (result?.error) {

                setError(
                    result.error.message ||
                    "Invalid email or password."
                );

                return;
            }

            navigate("/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            setError(
                error.message ||
                "Unable to sign in. Please try again."
            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

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
                        Sign in to your account
                    </p>

                </div>

                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}

                <form onSubmit={handleLogin}>

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
                                setEmail(event.target.value)
                            }
                            autoComplete="email"
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }

                    </button>

                </form>

                <div className="text-center mt-4">

                    <p className="mb-0 text-muted">
                        Don't have an account?
                    </p>

                    <Link
                        to="/register"
                        className="fw-semibold"
                    >
                        Create a new account
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