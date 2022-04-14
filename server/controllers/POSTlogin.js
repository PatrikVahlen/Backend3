const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    if (user) {
        const userId = user._id.toString();
        const token = jwt.sign(
            { userId, username: user.username },
            JWT_SECRET,
            { expiresIn: "1 h", subject: userId }
        );
        res.json({ token });
    } else {
        res.sendStatus(401);
    }
});

exports.router = router;