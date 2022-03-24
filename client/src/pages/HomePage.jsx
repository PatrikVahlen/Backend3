import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [todo, setTodo] = useState("");
    const [postList, setPostList] = useState("");
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        fetchData();
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
                //console.log(data.user)
                navigate('/user/home')
            })
    };

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        const url = 'http://localhost:3001/todoposts'
        const token = localStorage.getItem('backend3')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        fetch(url, {
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                setPostList(data.entries)
                console.log(data.entries)
            });
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
                    <div class="col">
                        {postList && postList.map((item, index) => {
                            let truncatedDate = item.date.split("T")
                            console.log(truncatedDate[1]);
                            return (
                                <div className="Card" key={item.id}>
                                    <p>{item.todo}</p>
                                    <p>{truncatedDate[1]}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div class="col">Column 4</div>
                </div>
            </div>
        </>

    )
};