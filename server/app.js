const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { User } = require("./models/user");
const { Todo } = require("./models/todos");

const cors = require("cors");
const app = express()
const PORT = 3001;
const JWT_SECRET = "B5rSrYfYNsu6ne7FXw__BEeLoHazAfkhjWvlsZ9VHGw";

app.use(express.json());

app.use(cors());

app.use((req, _res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        //console.log("Token:", token);
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

app.get("/todoposts", requireLogin, async (req, res) => {
    const entries = await Todo
        .find({ user: req.user.userId }).sort('-date')
        .populate("user")
        .exec();
    res.json({ entries });
});

//Why req.user.userId and not req.user._id?

app.post("/todo", requireLogin, async (req, res) => {
    const { todo, isDone } = req.body;
    const user = req.user;
    //console.log(user);
    console.log(isDone);
    //console.log(state);
    // console.log(user.userId);
    const entry = new Todo({ todo, isDone, user: user.userId });
    try {
        await entry.save();
        res.json({ user })
    } catch (err) {
        console.log(err)
    }
});

app.post("/changetodo", requireLogin, async (req, res) => {
    const { checked, todoId } = req.body;
    console.log(checked);
    const user = req.user;
    await Todo.updateOne({ user: user.userId, _id: todoId }, { isDone: checked })
});

mongoose.connect("mongodb://127.0.0.1/backend2EgenUppgift");

app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
});
