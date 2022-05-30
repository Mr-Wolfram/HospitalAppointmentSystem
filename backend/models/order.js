const mongoose = require('mongoose');
const { stringify } = require('uuid');

const orderSchema = mongoose.Schema({
    order_id: String,
    user_id: String,
    doctor_id: String,
    date: Date,
    time: String, //[]
    status: String
});

module.exports = mongoose.model('order', orderSchema);