const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    empId: Number,
    firstName: String,
    lastName: String,
    designation: String,
    dateOfJoining: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);