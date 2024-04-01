const mongoose = require("mongoose");
const express = require ("express");
const {handlePostSignUp, handlePostLogIn} = require("../controllers/userCredentialsController.js");
const router = express.Router();

router.post("/signup", handlePostSignUp)
router.post("/login", handlePostLogIn)

router.get("/login", async (req, res) => {
    return res.render("login");
});

router.get("/signup", async (req, res) => {
    return res.render("signup");
})

module.exports = router;