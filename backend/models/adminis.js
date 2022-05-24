const m = require("mongoose");

const adminisSchema = m.Schema({
    adminis_id: String,
    name: String,
    password: String,
});

module.exports = m.model("adminis", adminisSchema);
