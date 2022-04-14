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

router.get("/todoposts", requireLogin, async (req, res) => {
    const entries = await Todo
        .find({ user: req.user.userId }).sort('-date')
        .populate("user")
        .exec();
    res.json({ entries });
});

exports.router = router;