const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    todo: { type: String },
    body: { type: String },
    isDone: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    tagList: [{ type: String }]
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;