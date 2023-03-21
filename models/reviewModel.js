const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },

    car: {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: [true, 'The review must belong to a Car']
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'The review must belong to a User']
    },
    createAt:{
        type : Date,
        default : Date()
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


reviewSchema.pre(/^find/, function() {
    this.populate({
        path: 'user',
        select: 'firstName image createAt -_id'
    });
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;