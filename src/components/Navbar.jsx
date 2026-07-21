import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { profile, logout } = useAuth();

    return (

        <nav className="navbar navbar-dark bg-dark">

            <div className="container-fluid">

                <span className="navbar-brand">

                    AI Multiple Documents Reader

                </span>

                <div className="d-flex align-items-center">

                    <span className="text-white me-3">

                        {profile?.full_name}

                    </span>

                    <button
                        className="btn btn-danger"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}