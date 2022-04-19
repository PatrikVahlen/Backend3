const express = require("express");
const router = express.Router();
const multer = require("multer")

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })

let upload = multer({ dest: 'uploads/' }).single('file')
// var upload = multer({ storage: storage }).single('file')

router.put("/updatefiles", upload, (req, res) => {
    console.log("HÄR")
    upload(req, res, function (err) {
        // if (err instanceof multer.MulterError) {
        //     return res.status(500).json(err)
        // } else if (err) {
        //     return res.status(500).json(err)
        // }
        console.log("Funkar")
        return res.status(200).send("req.file")
    })
})

exports.router = router;
