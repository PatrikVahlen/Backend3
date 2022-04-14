const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = express.Router();

const JWT_SECRET = "B5rSrYfYNsu6ne7FXw__BEeLoHazAfkhjWvlsZ9VHGw";

router.use(express.json());

router.use(cors());

router.use((req, _res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        //console.log("Token:", token);
        req.user = jwt.verify(token, JWT_SECRET);
    }
    next();
});

exports.router = router;