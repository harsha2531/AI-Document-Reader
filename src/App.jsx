import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import WaitingApproval from "./pages/WaitingApproval";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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

        </Routes>

    );

}