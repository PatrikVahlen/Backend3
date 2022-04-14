const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username);
    const user = new User({ username, password });
    await user.save();
    res.json({ username });
});

exports.router = router