const mongoose = require('mongoose');
const Car = require('./../models/carModel');

const orderSchema = new mongoose.Schema({
    lecience : {
        type : String
        // required : [true , 'Please provide passport image']
    },

    IDImg : {
        type : String,
        required : [true , 'Please provide ID image']
    },

    phone : {
        type : String,
        // required : [true , 'Please provide phone number']
    },

    email : {
        type : String,
        required : [true , 'Please provide email address']
    },

    placeOfDelivery : {
        type :String,
        required : [true , 'Please provide place of delivery']
    },

    deliveryTime : {
        type : String,
        required : [true , 'Please provide delivery time']
    },

    timeOfRecieved : {
        type : String,
        required : [true , 'Please provide delivery date']
    },

    deliveryDate : {
        // type : Date,
        type : String,
        required : [true , 'Please provide delivery date']
    },

    recievedDate : {
        // type : Date,
        type : String,
        required : [true , 'Please provide delivery date'],
    },

    totalPrice : {
        type : Number,
        required : [true , 'Please provide total price of order']
    },
    isDone : {
        type : Boolean,
        default : false
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    },

    car : {
        type : mongoose.Schema.ObjectId,
        ref : 'Car'
    }
})

orderSchema.pre(/^find/, function() {
    this.populate({
        path: 'car',
        select: 'name _id'
    });
});


orderSchema.statics.calcNumOrders = async function(carId){
    const stats = await this.aggregate([
        {
            $match : {car : carId}
        },
        {
            $group : {
                _id : '$car',
                numOrders : {$sum : 1},
            }
        }
    ]);
    console.log(stats);
    await Car.findByIdAndUpdate(carId,{
        popularity : stats[0].numOrders,
    });
}

orderSchema.post('save' , function(){
    this.constructor.calcNumOrders(this.car);
})




const Order = mongoose.model('Order' , orderSchema);

module.exports = Order;


/* 
    {
    "passportImg" : "passport.png",
    "IDImg" : "id.png",
    "phone" : "963968368814",
    "email" : "abouhawa@gmail.com",
    "placeOfDelivery" : "Duabi Airport",
    "deliveryTime" : "18:30:00",
    "timeOfRecieved" : "18:30:00",
    "deliveryDate" : "05/30/2022",
    "recievedDate" : "06/05/2022",
    "user": "629467ee8d36f2420bd1ee6c",
    "car" : "627bf6ff0c190e7e03ae1957"
}
*/