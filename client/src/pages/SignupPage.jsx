import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';


export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "http://localhost:3001/users"
        const payload = { username, password }
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                // const token = data.token
                // localStorage.setItem("webb21inl", token)
                console.log(data.username);
                navigate('/user/login')
            })
    }

    return <div>
        Sign up
        <form onSubmit={handleOnSubmit}>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
            />

            <br />
            <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <button class="btn btn-primary">Sign up</button>
            <br />
            <Link to="/user/login">Already have an account?</Link>
        </form>
    </div>
}