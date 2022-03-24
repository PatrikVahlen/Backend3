import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [todo, setTodo] = useState("");
    const [postList, setPostList] = useState("");
    const [checked, setChecked] = React.useState(true);
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        fetchData();
        const isDone = false;
        e.preventDefault()
        const url = "http://localhost:3001/todo"
        const payload = { todo, isDone }
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
    };

    function handleOnClick() {
        localStorage.clear();
        navigate("/user/login");
    };

    function handleOnChange(e) {
        setChecked(!checked);
        console.log(checked);
        e.preventDefault()
        const url = "http://localhost:3001/changetodo"
        const payload = { checked }
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

            })
    };

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                    <div class="col">
                        <button class="btn btn-primary" onClick={handleOnClick}>Log out</button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Todo-List</h2>
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
                    <div class="col"></div>
                    <div class="col"></div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Todo</p>
                        {postList && postList.map((item, index) => {
                            if (item.isDone === false) {
                                let truncatedDate = item.date.split("T")

                                return (
                                    <div className="Card" key={item._id}>
                                        <p>{item.todo}</p>
                                        <p>{item._id}</p>
                                        <p>{truncatedDate[1]}</p>
                                        <div>
                                            <input type="checkbox" name="scales" onChange={handleOnChange}></input>
                                            <label for="scales">Done</label>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div class="col">
                        <p>Done</p>
                        {postList && postList.map((item, index) => {
                            if (item.isDone === true) {
                                let truncatedDate = item.date.split("T")

                                return (
                                    <div className="Card" key={item._id}>
                                        <p>{item.todo}</p>
                                        <p>{truncatedDate[1]}</p>
                                        <div>
                                            <input type="checkbox" name="scales" onChange={handleOnChange}></input>
                                            <label for="scales">Done</label>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </>

    )
};