import React, { useState } from "react";
import { useLocation } from 'react-router-dom';



export default function Details() {

    const location = useLocation();
    const { id } = location.state;
    console.log(id)

    const [todo, setTodo] = useState("");
    const [body, setBody] = useState("");


    function handleOnSubmit(e) {
        // const isDone = false;
        e.preventDefault()
        const url = "http://localhost:3001/updatetodo"
        const payload = { todo, body, id }
        const token = localStorage.getItem("backend3")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data.user)
                //console.log("Create Todo")
                //navigate('/user/home')
            })
    };

    return <div>
        <form onSubmit={handleOnSubmit}>
            <label>Update Todo:</label>
            <input
                type="text"
                value={todo}
                onChange={e => setTodo(e.target.value)}
                placeholder="Todo"
            />
            <br></br>
            <label>Update Body:</label>
            <input
                type="text"
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Body"
            />
            <br />
            <button
                class="btn btn-primary">Update todo</button>
        </form>
    </div>
}