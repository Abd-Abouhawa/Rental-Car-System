
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}

exports.getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    res.json({
        users
    })

})

exports.updateMe = catchAsync(async (req, res, next) => {

    // console.log(req.body);

    // 1) Create error if user POSTs password data 
    // if (req.body.password || req.body.confirmPassword) {
    //     return next(new AppError('This route is not for password updates , please use /updateMyPassword route', 400));
    // }

    // 2) Filtered out unwanted fields name that are not allowed to be updateMyPassword
    const filteredBody = filterObj(req.body, 'firstName', 'email' , 'lastName' , 'phoneNumber');
    
    // if (req.file) filteredBody.image = req.file.filename;
    // console.log(filteredBody);
    // 3) Update user document
    // console.log(req.user);
    // console.log(req.body);
    // const update = {firstName : 'samia'};
    // const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });
    const user = await User.findByIdAndUpdate({_id : req.body.id}, filteredBody, { new: true, runValidators: false });
    console.log(updatedUser);


    // await updateUser.save();

    res.status(200).json({
        status: 'success',
        data:{
            user
        }
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({
        path: 'orders'
        // select : '-passportImg -IDImg -phone -email -__v'
    });

    if (!user) return next(new AppError('This user is not exist!', 404));

    res.status(200).json({
        status: 'success',
        user
    })
})

