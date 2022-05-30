const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    user_id: String,
    gender: String,
    name: String,
    email: String,
    phone: String,
    password: String,
    age: Number,
});

module.exports = mongoose.model('patient', patientSchema);