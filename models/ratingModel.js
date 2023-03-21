const mongoose = require('mongoose');
const Car = require('./carModel');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, 'Rating can not be empty!'],
        min : .5,
        max : 5,
        default : 1
    },

    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: [true, 'The rating must belong to a Car']
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'The rating must belong to a User']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


ratingSchema.pre(/^find/, function() {
    this.populate({
        path: 'user',
        select: 'name'
    })
});

ratingSchema.statics.calcAverageRatings = async function(carId){
    const stats = await this.aggregate([
        {
            $match : {car : carId}
        },
        {
            $group : {
                _id : '$car',
                nRating : {$sum : 1},
                avgRating : {$avg : '$rating'}
            }
        }
    ]);
    console.log(stats);
    await Car.findByIdAndUpdate(carId,{
        ratingsQuantity : stats[0].nRating,
        ratingsAverage : stats[0].avgRating
    });
}

ratingSchema.post('save' , function(){
    this.constructor.calcAverageRatings(this.car);
})


const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;