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
    ///console.log(req.query.id);
    let queryParameters = { user: req.user.userId };
    let tag = req.query.tag;
    let id = req.query.id;
    if (req.query.tag !== "undefined") {
        queryParameters = { user: req.user.userId, tagList: tag }
    }
    if (req.query.id) {
        queryParameters = { user: req.user.userId, _id: id }
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