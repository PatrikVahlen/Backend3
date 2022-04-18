import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';


export default function Home() {

    const [todo, setTodo] = useState("");
    let [postList, setPostList] = useState("");
    let [tags, setTags] = useState("");
    // let [tagList, setTagList] = useState("")
    let counter = 1;
    let tagArray = [];
    //const [checked, setChecked] = useState(true);
    const navigate = useNavigate();

    tagArray = tags.toLowerCase().split(" ")
    let checkDuplicate = checkIfDuplicateExists(tagArray);

    function checkIfDuplicateExists(arr) {
        return new Set(arr).size !== arr.length
    }

    function handleOnSubmit(e) {
        // const isDone = false;
        e.preventDefault()
        tags = tagArray;
        const url = "http://localhost:3001/todo"
        const payload = { todo, tags }
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
                fetchData();
                setTodo("");
                setTags("");
                //console.log("Create Todo")
                //navigate('/user/home')
            })
    };

    useEffect(() => {
        fetchData();
    }, [counter]);

    function fetchData(tag) {
        console.log(tag)
        const url = 'http://localhost:3001/todoposts'
        const token = localStorage.getItem('backend3')
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        fetch(url + `?tag=${tag}`, {
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                setPostList(data.entries)
                //console.log(data.entries)
            });
    };

    function handleOnClick() {
        localStorage.clear();
        navigate("/user/login");
    };

    // function handleOnTagClick(tagData) {
    //     console.log(tagData.tag)
    //     let tag = tagData.tag;
    //     {
    //         const url = "http://localhost:3001/tags"
    //         const payload = { tag }
    //         const token = localStorage.getItem("backend3")
    //         const headers = {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //         fetch(url, {
    //             method: "POST",
    //             headers: headers,
    //             body: JSON.stringify(payload)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data.todoTags)
    //                 setTagList(data.todoTags)
    //                 fetchData();
    //             })
    //     };

    // };

    //Move todo i.e. is it completed?

    function handleOnChange(todoId, checked) {
        //setChecked(checked);
        // console.log(checked);
        // console.log(todoId);
        //e.preventDefault()
        const url = "http://localhost:3001/todoisdone"
        const payload = { checked, todoId }
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
                fetchData();
            })
    };

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col">
                    </div>
                    <div class="col">
                        {checkDuplicate && <div>Två tags får inte heta samma sak</div>}
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
                        required
                    />
                    <br></br>
                    <input
                        type="text"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        placeholder="Tag"
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
                                let truncatedTime = truncatedDate[1].split(".")
                                return (
                                    <div className="Card" key={item._id}>
                                        <Link to="/user/details">Details</Link>
                                        <p>{item.todo}</p>
                                        <div>Tags: {item.tagList.map((tag) => {
                                            return (<button
                                                className="tagButton"
                                                onClick={e => fetchData(tag)
                                                }>{tag}</button>)
                                        })}</div>
                                        <p>{truncatedDate[0]} {truncatedTime[0]}</p>
                                        <div>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="todo"
                                                onChange={(e) => handleOnChange(item._id, true)}>
                                            </input>
                                            <label for="todo">Done</label>
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
                                let truncatedTime = truncatedDate[1].split(".")

                                return (
                                    <div className="Card" key={item._id}>
                                        <Link to="/user/details">Details</Link>
                                        <p>{item.todo}</p>
                                        <div>Tags: {item.tagList.map((tag) => {
                                            return (<button
                                                className="tagButton"
                                                onClick={e => fetchData(tag)
                                                }>{tag}</button>)
                                        })}</div>
                                        <p>{truncatedDate[0]} {truncatedTime[0]}</p>
                                        <div>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="todo"
                                                onChange={(e) => handleOnChange(item._id, false)}>
                                            </input>
                                            <label for="todo">Not Done</label>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {/* <div class="col">
                        <p>Tags</p>
                        {tagList && tagList.map((item, index) => {

                            let truncatedDate = item.date.split("T")
                            let truncatedTime = truncatedDate[1].split(".")
                            return (
                                <div className="Card" key={item._id}>
                                    <p>{item.todo}</p>
                                    <div>Tags: {item.tagList.map((tag) => {
                                        return (<>{tag} </>)
                                    })}</div>
                                    <p>{truncatedDate[0]} {truncatedTime[0]}</p>
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </div>
        </>

    )
};