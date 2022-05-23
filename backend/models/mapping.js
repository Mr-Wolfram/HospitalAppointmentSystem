const mongoose = require('mongoose')

const mappingSchema = mongoose.Schema({
    key: String,
    val: String
});

const Mapping = mongoose.model('mapping', mappingSchema);

module.exports = Mapping