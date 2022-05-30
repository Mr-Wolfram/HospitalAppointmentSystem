const m = require("mongoose");

const diagnosisSchema = m.Schema({
    diagnosis_id: String,
    patient_id: String,
    doctor_id: String,
    depart_id: String,
    timestamp: Date,
    diagnosis_message: String,
    medicine_message: String
});

module.exports = m.model("diagnosis", diagnosisSchema);