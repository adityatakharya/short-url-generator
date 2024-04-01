require("dotenv").config();

const {connectDatabase} = require("./connection.js");
const express = require("express");
const path = require("path"); // For EJS
const {authUser, authRole} = require("./middlewares/auth.js");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");

//Importing All Routes...
const urlShortenerRouter = require("./routes/urlShortenerRoute.js")
const userCredentialsRouter = require("./routes/userCredentialsRoute.js");
const errorRouter = require("./routes/errorRoute.js");
const { env } = require("process");

// Connecting MongoDB...
connectDatabase(process.env.MONGODB_URL);

// Creating App Using Express...
const app = express();

//Setting Up EJS...
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MiddleWare...
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Calling Routes...
app.use("/url", authUser, authRole("NORMAL"), urlShortenerRouter) // For working with URLs
app.use("/user", userCredentialsRouter) // For User Logins
app.use("/error", errorRouter) // For Error
app.use((req, res, next) => {
    res.status(404).redirect("/error/404");
}); // For All Non existing pages

// Server Initialisation...
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Server Connected"));