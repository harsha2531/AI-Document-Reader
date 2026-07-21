import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login(){

    const { login, profile } = useAuth();

    const navigate=useNavigate();

    const[email,setEmail]=useState("");

    const[password,setPassword]=useState("");

    async function handleLogin(e){

        e.preventDefault();

        const {error}=await login(email,password);

        if(error){

            alert(error.message);

            return;

        }

        if(profile?.approved){

            navigate("/dashboard");

        }

        else{

            navigate("/waiting");

        }

    }

    return(

        <div className="container mt-5">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input

                    className="form-control mb-3"

                    placeholder="Email"

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <input

                    type="password"

                    className="form-control mb-3"

                    placeholder="Password"

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <button className="btn btn-success">

                    Login

                </button>

            </form>

        </div>

    );

}