const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    user_id: String,
    gender: String,
    name: String,
    email: String,
    phone: String,
    password: String
});

module.exports = mongoose.Model('patient', patientSchema);