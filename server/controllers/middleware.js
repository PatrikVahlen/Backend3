const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;

router.use(express.json());

router.use(cors());

router.use((req, _res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        req.user = jwt.verify(token, JWT_SECRET);
    }
    next();
});

exports.router = router;