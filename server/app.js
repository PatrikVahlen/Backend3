const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const middlewareRouter = require("./controllers/middleware").router;
const GETtodoRouter = require("./controllers/GETtodo").router;
const POSTtodoRouter = require("./controllers/POSTtodo").router;
const POSTtodoisdoneRouter = require("./controllers/POSTtodoisdone").router;
const POSTsignupRouter = require("./controllers/POSTsignup").router;
const POSTloginRouter = require("./controllers/POSTlogin").router;

app.use("/", middlewareRouter);
app.use("/", POSTsignupRouter);
app.use("/", POSTloginRouter);
app.use("/", GETtodoRouter);
app.use("/", POSTtodoRouter);
app.use("/", POSTtodoisdoneRouter);

mongoose.connect(MONGODB_URL);

app.listen(PORT, () => {
    console.log(`Started Express server on port ${PORT}`);
});

