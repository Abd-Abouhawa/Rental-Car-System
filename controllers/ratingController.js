const catchAsync = require('../utils/catchAsync');

const Rating = require('./../models/ratingModel');

exports.addRating = catchAsync(async(req,res,next)=>{
    const rate = await Rating.create(req.body);

    if(!rate) return next(new AppError('Please provide an rate!'));

    res.status(201).json({
        status: 'success',
        rate
    })
})

exports.getRating = catchAsync(async(req,res,next)=>{
    const rate = await Rating.findById(req.params.id);
    if(!rate)return next(new AppError('This id is not valid!'));

    res.status(200).json({
        status: 'success',
        rate
    })
})