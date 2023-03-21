const mongoose = require('mongoose');
const validator = require('validator');

// first name , last name ,email ,phone , address recive(drop list) , city , date recive موعد التسليم
// type car , total payment , sub payment , hour recive , hour التسليم , service car party , service transporter

const dealSchema = new mongoose.Schema({    
    order : { 
        type : mongoose.Schema.ObjectId, 
        ref : 'Order'
    }
})