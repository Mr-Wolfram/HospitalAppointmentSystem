const m = require('mongoose');

const deptSchema = m.Schema({
    dept_id: String,
    name: String,
    intro: String
});

module.exports = m.model('department', deptSchema);