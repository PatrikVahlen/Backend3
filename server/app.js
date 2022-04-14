const express = require("express");
const app = express()
const mongoose = require("mongoose")

const PORT = 3001;
const MONGODB_URL = "mongodb://127.0.0.1/backend2EgenUppgift";

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

