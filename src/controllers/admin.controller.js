const fs = require("fs");
const bcrypt = require("bcryptjs");

function editAdmin(req, res) {
    var { username, password } = req.body;

    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter a username and password" });
    }
    password = bcrypt.hashSync(password, 10);
    let data = JSON.stringify({ username, password });
    fs.writeFileSync("admin.json", data);
    res.json({ msg: "Admin updated" });
}

module.exports = {
    editAdmin,
};
