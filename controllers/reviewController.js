const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createReview = catchAsync(async(req, res, next) => {

    const review = await Review.create(req.body);

    if (!req.body.review) return next(new AppError('Please provide an review', 400));

    res.status(201).json({
        status: 'success',
            review
    })
});

exports.getReview = catchAsync(async(req, res, next) => {
    const review = await Review.findById(req.params.id);

    if (!review) return next(new AppError('This id is not valid!', 404));

    res.status(200).json({
        status: 'success',
            review
    })
})