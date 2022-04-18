const express = require("express");
const router = express.Router();

const { Todo } = require("../models/todos");

router.put("/updatetodo", async (req, res) => {
    const { todo, body, id } = req.body;
    console.log(id)
    if (todo) {

        await Todo.updateOne({ _id: id }, { todo: todo })
    }
    if (body) {

        await Todo.updateOne({ _id: id }, { body: body })
    }
    const entries = await Todo
        .find({ _id: id })
        .sort('-date')
        .populate("user")
        .exec();
    res.json({ entries });
})

exports.router = router;