const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { User } = require("./models/user");

const app = express()
const PORT = 3001;
const JWT_SECRET = "B5rSrYfYNsu6ne7FXw__BEeLoHazAfkhjWvlsZ9VHGw";

app.use(express.json());

app.use((req, _res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        console.log("Token:", token);
        req.user = jwt.verify(token, JWT_SECRET);
    }
    next();
});

const requireLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(401);
    }
}

app.get("/secret", requireLogin, (req, res) => {
    res.json({ greeting: `Hello ${req.user.username}` });
});

app.post("/users", async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ username });
});

app.post("/tokens", async (req, res) => {
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

mongoose.connect("mongodb://127.0.0.1/backend2EgenUppgift");

app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
});
