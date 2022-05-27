const m = require("mongoose");

const announceSchema = m.Schema({
    announce_id: String,
    title: String,
    content: String,
    announcer: String,
    date: Date
});

module.exports = m.model("announce", announceSchema);
