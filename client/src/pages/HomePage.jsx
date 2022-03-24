import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [todo, setTodo] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "http://localhost:3001/todo"
        const payload = { todo }
        const token = localStorage.getItem("backend3")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                navigate('/user/home')
            })
    }

    return (
        <>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        value={todo}
                        onChange={e => setTodo(e.target.value)}
                        placeholder="Todo"
                    />
                    <br />
                    <button class="btn btn-primary">Create todo</button>
                </form>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">Todo</div>
                    <div class="col">Done</div>
                </div>
                <div class="row">
                    <div class="col">Column 3</div>
                    <div class="col">Column 4</div>
                </div>
            </div>
        </>

    )
};