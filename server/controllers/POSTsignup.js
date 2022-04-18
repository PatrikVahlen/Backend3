const express = require("express");
const router = express.Router();

const { User } = require("../models/user");

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.json({ username });
    } catch (err) {
        console.log(err)
    }

});

exports.router = router