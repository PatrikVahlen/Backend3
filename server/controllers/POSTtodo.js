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
    //let todoCount = await Todo.find().count();
    const { todo, tags } = req.body;
    const user = req.user;
    const entry = new Todo({ todo, user: user.userId, tagList: tags });

    try {
        await entry.save();
        res.json({ user })
    } catch (err) {
        console.log(err)
    }

});

exports.router = router;