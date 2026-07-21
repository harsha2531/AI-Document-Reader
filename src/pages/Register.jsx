import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [fullName, setFullName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [department, setDepartment] = useState("Sales");

    async function handleSubmit(e) {

        e.preventDefault();

        const result = await register(

            fullName,

            email,

            password,

            department

        );

        if (result.error) {

            alert(result.error.message);

            return;

        }

        alert("Registration Successful");

        navigate("/waiting");

    }

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input

                    className="form-control mb-3"

                    placeholder="Full Name"

                    value={fullName}

                    onChange={(e)=>setFullName(e.target.value)}

                />

                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    type="email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <input

                    className="form-control mb-3"

                    placeholder="Password"

                    type="password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <select

                    className="form-select mb-3"

                    value={department}

                    onChange={(e)=>setDepartment(e.target.value)}

                >

                    <option>Sales</option>

                    <option>Marketing</option>

                    <option>HR</option>

                </select>

                <button className="btn btn-primary">

                    Register

                </button>

            </form>

        </div>

    );

}