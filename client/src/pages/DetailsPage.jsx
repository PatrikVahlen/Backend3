import React, { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';


export default function Details() {

    const location = useLocation();
    const { id } = location.state;

    let counter = 1;
    //let objectURL = "";

    const [todo, setTodo] = useState("");
    const [body, setBody] = useState("");
    let [postList, setPostList] = useState("");

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    // const [preview, setPreview] = useState();


    // console.log({ id });
    // console.log("Här");
    useEffect(() => {
        fetchData(id);
    }, [counter]);

    const changeHandler = (event) => {
        //console.log(event.target.files[0])
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        //const objectURL = URL.createObjectURL(selectedFile);
        //setPreview(objectURL);
        //console.log(objectURL);
    };

    function handleOnSubmit(e) {

        e.preventDefault()
        console.log(selectedFile);
        const url = "http://localhost:3001/updatetodo"
        const payload = { todo, body, id }
        const token = localStorage.getItem("backend3")
        // let formData = new FormData();
        // let fileField = document.querySelector('input[type="file"]');
        // formData.append(selectedFile.name, selectedFile);
        //console.log(selectedFile)
        // console.log(fileField);
        // console.log(formData);
        //formData.append(todo, JSON.stringify(payload));
        const headers = {
            'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(payload)
            //body: selectedFile
            //body: formData
        })
            .then(res => res.json())
            .then(data => {
                //setPostList(data.entries)
                fetchData(id);
                setBody("");
                setTodo("");
            })
    };

    // function onClickHandler() {
    //     const data = new FormData()
    //     data.append('file', this.state.selectedFile)
    //     axios.post("http://localhost:3001/updatefiles", data, {
    //         // receive two    parameter endpoint url ,form data
    //     })
    //         .then(res => { // then print response status
    //             console.log(res.statusText)
    //         })
    // }

    function handleOnSubmitFiles(e) {

        e.preventDefault()
        //console.log(selectedFile);
        const url = "http://localhost:3001/updatefiles"
        const token = localStorage.getItem("backend3")
        let formData = new FormData();
        // let fileField = document.querySelector('input[type="file"]');
        // formData.append("File", fileField.files[0])
        formData.append(selectedFile.name, selectedFile);
        //console.log(selectedFile)
        // console.log(fileField);
        // console.log(formData);
        //formData.append(todo, JSON.stringify(payload));
        const headers = {
            // 'Content-Type': 'application/json',
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            method: "PUT",
            //headers: headers,
            //body: formData
            body: formData
            //body: formData
        })
            .then(res => res.json())
            .then(data => {
                //setPostList(data.entries)
                fetchData(id);
                // setBody("");
                // setTodo("");
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
        <div><Link to="/user/home">Back to main</Link></div>
        <p>Update todo</p>
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
        <br />
        <form onSubmit={handleOnSubmitFiles}>
            <label>Update File:</label>
            <input
                type="file"
                name="file"
                onChange={changeHandler}
            />
            <br />
            {/* {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )} */}
            <button class="btn btn-primary">Update files</button>
        </form>
        <div>

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