const jsonwebtoken = require("jsonwebtoken");
const secretKey = "itizasecret"

function setUser (user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    return jsonwebtoken.sign(payload, secretKey);
}

function getUser (token){
    if(!token) return null;
    return jsonwebtoken.verify(token, secretKey);
}

module.exports = {setUser, getUser};