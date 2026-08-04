import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import WaitingApproval from "./pages/WaitingApproval";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Files from "./pages/Files";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/waiting"
                element={<WaitingApproval />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />

                    </ProtectedRoute>
                }
            />
            <Route
                path="/files"
                element={
                    <ProtectedRoute>
                        <Files />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}