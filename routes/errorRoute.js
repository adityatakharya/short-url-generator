const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("404");
})

router.get("/404", async (req, res) => {
    res.render("404");
})


module.exports = router;