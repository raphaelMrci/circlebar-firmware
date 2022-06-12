const fs = require("fs");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const config = dotenv.config().parsed;

function login(req, res) {
    console.log("POST /login");
    console.log(req.body);
    var { username, password } = req.body;
    let admin_data = JSON.parse(fs.readFileSync("admin.json"));

    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter a username and password" });
    }
    if (
        admin_data.username === "admin" &&
        admin_data.password === "admin" &&
        password === "admin" &&
        username === "admin"
    ) {
        const token = jwt.sign({ username, password }, config.SECRET);
        res.json({
            token,
        });
    } else {
        let hashed_password = admin_data.password;
        const verified = bcrypt.compareSync(password, hashed_password);

        if (!verified) {
            return res
                .status(400)
                .json({ msg: "Invalid username or password" });
        } else {
            const token = jwt.sign(
                { username, password: hashed_password },
                config.SECRET
            );
            res.json({
                token,
            });
        }
    }
}

module.exports = {
    login,
};
