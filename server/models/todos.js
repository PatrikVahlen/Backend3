const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    todo: { type: String },
    date: { type: Date, default: Date.now }
});

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;