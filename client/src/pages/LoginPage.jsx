import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "http://localhost:3001/tokens"
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
                const token = data.token
                localStorage.setItem("webb21inl", token)
                console.log(token);
                navigate('/user/home')
            })
    }

    return <div>
        Log in
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
            <button>Sign up</button>
        </form>
    </div>
}