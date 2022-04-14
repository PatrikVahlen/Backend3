const express = require("express");
const router = express.Router();

const { Todo } = require("../models/todos");

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
}

router.post("/todoisdone", requireLogin, async (req, res) => {
    const { checked, todoId } = req.body;
    console.log(checked);
    const user = req.user;
    await Todo.updateOne({ user: user.userId, _id: todoId }, { isDone: checked })
    res.json({ user });
});

exports.router = router;