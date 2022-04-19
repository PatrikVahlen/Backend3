import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';



export default function Details() {

    const location = useLocation();
    const { id } = location.state;

    let counter = 1;

    const [todo, setTodo] = useState("");
    const [body, setBody] = useState("");
    let [postList, setPostList] = useState("");

    // console.log({ id });
    // console.log("Här");
    useEffect(() => {
        fetchData(id);
    }, [counter]);

    function handleOnSubmit(e) {

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
                //setPostList(data.entries)
                fetchData(id);
                setBody("");
                setTodo("");
                console.log("Här")
                console.log(data.entries)
            })
    };

    function fetchData(id) {
        //console.log(tag)
        const url = 'http://localhost:3001/todoposts'
        const token = localStorage.getItem('backend3')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        fetch(url + `?id=${id}`, {
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                setPostList(data.entries)
                //console.log(data.entries)
            }, []);
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
        <div>
            <p>Update todo</p>
            {postList && postList.map((item, index) => {

                let truncatedDate = item.date.split("T")
                let truncatedTime = truncatedDate[1].split(".")
                return (
                    <div className="Card" key={item._id}>
                        <p>{item.todo}</p>
                        <p>{item.body}</p>
                        <div>Tags: {item.tagList.map((tag) => {
                            return (<button className="tagButton">{tag}</button>)
                        })}</div>
                        <p>{truncatedDate[0]} {truncatedTime[0]}</p>
                    </div>
                )
            })}
        </div>
    </div>
}