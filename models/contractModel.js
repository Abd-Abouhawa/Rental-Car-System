const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    carType : {
        type:String,
        required : true
    },
    plateCode  :{
        type:String
    },
    yearModel : {
        type : Number,
        required : true
    },
    timeOut : {
        type : String,
        // required : true
    },
    dateOut : {
        type : String,
        required : true
    },
    licenceNumber : {
        type : String,
        required : true
    },
    hirerName : {
        type : String,
        required: true
    },
    nationality : {
        type : String,
        required : true
    },
    IdNumber : {
        type : String,
        required : true
    },
    expiryDate : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String
    },
    file : String,
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
    }

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const Contract = mongoose.model('Contract' , contractSchema);

module.exports = Contract;