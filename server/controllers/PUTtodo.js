const express = require("express");
const router = express.Router();

router.put("/updatetodo", (req, res) => {
    const { todo, body, id } = req.body;
    console.log(id)
    if (todo) {
        console.log(todo);
    }
    if (body) {
        console.log(body);
    }

})

exports.router = router;