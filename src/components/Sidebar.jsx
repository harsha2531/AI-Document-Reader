import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {

    const { profile } = useAuth();

    return (

        <div
            className="bg-light border-end"
            style={{
                width: "240px",
                minHeight: "100vh"
            }}
        >

            <div className="p-3">

                <h5>

                    {profile?.department}

                </h5>

                <hr />

                <NavLink
                    to="/dashboard"
                    className="d-block mb-3"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/files"
                    className="d-block mb-3"
                >
                    Files
                </NavLink>

                <NavLink
                    to="/chat"
                    className="d-block mb-3"
                >
                    AI Chat
                </NavLink>

                <NavLink
                    to="/profile"
                    className="d-block mb-3"
                >
                    Profile
                </NavLink>

                {
                    profile?.role === "admin" &&

                    <NavLink
                        to="/admin"
                        className="d-block"
                    >
                        Admin
                    </NavLink>
                }

            </div>

        </div>

    );

}