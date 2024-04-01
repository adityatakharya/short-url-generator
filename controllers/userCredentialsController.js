const userCredentials = require("../models/userCredentials")
const { setUser } = require("../services/auth");

async function handlePostSignUp(req, res) {
  const { name, email, password } = req.body;
  try{await userCredentials.create({
    name,
    email,
    password,
  });}
  catch(error){
    return res.render("signup", {
      error: "User Already Exists!",
    });
  }
  return res.redirect("/user/login");
}

async function handlePostLogIn(req, res) {
  const { email, password } = req.body;
  const currUser = await userCredentials.findOne({ email, password });

  if (!currUser)
    return res.render("login", {
      notfound: "Invalid Username or Password",
    });

  const token = setUser(currUser);
  res.cookie("uid", token);
  return res.redirect("/url");
}

module.exports = {handlePostSignUp,handlePostLogIn,};