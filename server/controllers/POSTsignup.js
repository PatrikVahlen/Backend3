const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ username });
});

exports.router = router