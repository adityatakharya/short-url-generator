const express = require("express");
const {authRole} = require("../middlewares/auth")
const {handleGenerateShortURL, handleDecodeShortURL} = require("../controllers/urlShortenerController")
const urlDatabase = require("../models/urlDatabase")

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const allURLs = await urlDatabase.find({ createdBy: req.user._id });
    return res.render("home", {
      urls: allURLs,
    });
});

router.get("/admin", authRole("ADMIN"), async (req, res) => {
    if (!req.user) return res.redirect("/login");
    const allURLs = await urlDatabase.find({});
    return res.render("home", {
      urls: allURLs,
    });
});

router.post("/", handleGenerateShortURL);
router.get("/:shortID", handleDecodeShortURL);

module.exports = router;