const admin = require("./admin.route");
const login = require("./login.route");
const drinks = require("./drinks.route");
const cocktails = require("./cocktails.route");
const slots = require("./slots.route");

module.exports = {
    admin,
    login,
    drinks,
    cocktails,
    slots,
};
