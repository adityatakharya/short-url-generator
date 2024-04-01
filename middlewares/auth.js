const {getUser} = require("../services/auth")

function authUser (req, res, next){
    const userCookie = req.cookies?.uid;
    if(!userCookie) return res.redirect("/user/login");
    const currUser = getUser(userCookie);
    if(!currUser) return res.redirect("/user/login");
    req.user = currUser;
    return next();
}

function authRole (roles){
    return function (req, res, next){
        if(!req.user || !req.user.role) return res.redirect("/user/login");
        if(!(req.user.role).includes(roles)) return res.send("ERR: UnAuthorized Access");
        return next();
    }
}

module.exports = {authUser, authRole};