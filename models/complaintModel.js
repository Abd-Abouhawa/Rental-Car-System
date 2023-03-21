const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    complaint : {
        type : String,
        required : true
    }
})

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;