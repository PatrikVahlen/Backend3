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

router.post("/todo", requireLogin, async (req, res) => {
    const { todo, isDone } = req.body;
    const user = req.user;
    const entry = new Todo({ todo, isDone, user: user.userId });

    try {
        await entry.save();
        res.json({ user })
    } catch (err) {
        console.log(err)
    }
});

exports.router = router;