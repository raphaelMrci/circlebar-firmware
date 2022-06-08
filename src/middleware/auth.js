const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const fs = require("fs");

const config = dotenv.config().parsed;

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, config.SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ msg: "Token is not valid" });
            }
            if (req.method != "DELETE" && req.method != "HEAD") {
                req.user = user;
            }
            next();
        });
    } else {
        res.status(401);
        res.json({
            msg: "No token, authorization denied",
        });
    }
}

module.exports = {
    authenticate,
};
