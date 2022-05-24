const m = require("mongoose");

const scheduleSchema = m.Schema({
    date: Date,
    time: String, // [morning, afternoon, evening]
    doctor_id: String,
    depart_id: String
});

module.exports = m.model("schedule", scheduleSchema);
