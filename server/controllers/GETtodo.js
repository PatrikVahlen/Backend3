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
    // console.log(req.query);
    // console.log(req.query.tag);
    let queryParameters = { user: req.user.userId };
    let tag = req.query.tag;
    if (req.query.tag !== "undefined") {
        queryParameters = { user: req.user.userId, tagList: tag }
    }
    // console.log(queryParameters)
    const entries = await Todo
        .find(queryParameters)
        .sort('-date')
        .populate("user")
        .exec();
    res.json({ entries });
});

exports.router = router;