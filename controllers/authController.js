const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


// Use /Sharp/ library to resize the image and edit it as we need
const storage = multer.diskStorage({
    // Set the path to store the images in it
    destination : (req,file,cb)=>{
        cb(null, './public/users');
    },
    // set name of the image
    filename : (req,file,cb)=>{
        const ext = file.mimetype.split('/')[1];
        cb(null,`user_${Date.now()}_${file.originalname.split('.')[0]}.${ext}`);
    }
});

// const storage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an image! please upload only images',400),false);
    }
}

const upload = multer({
    storage,
    fileFilter : multerFilter
});

exports.uploadUserImage = upload.single('userImage');


// ********** Call after uploadUserImage in userRoutes
// exports.resizeUserImage = (req,res,next)=>{
//     if(!req.file)return next();
//     req.file.filename = `user_${Date.now()}_${file.originalname.split('.')[0]}.jpeg`;

//     sharp(req.file.buffer)
//         .resize(500,500)
//         .toFormat('jpeg')
//         .jpeg({quality : 90})
//         .toFile(`public/users/${req.file.filename}`);

//         next();
// }


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}
exports.signUp = catchAsync(async(req, res, next) => {
    console.log(req.file);
    const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        role: req.body.role,
        phoneNumber: req.body.phoneNumber,
        image : req.file.filename

    });

    console.log(req.user);
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async(req, res, next) => {

    const { email, password } = req.body;

    // 1) check if email and password are inputted
    if (!email || !password) {
        return next(new AppError('please provide email and password', 404));
    }
    // 2) check if email is exist and pasword is correct
    const user = await User.findOne({ email }).select('+password');
    console.log(user.correctPassword(password, user.password));
    const comparePasswords = await user.correctPassword(password, user.password);

    if (!user || !comparePasswords) {
        return next(new AppError('Incorrect email or password!', 401));
    }

    createSendToken(user, 200, res);

});

exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in', 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does not longer exist!', 401));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password , please login again!', 401));
    }
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { // roles : ['admin' , 'lead-guide']
            next(new AppError('You do not have permission to perform this action', 403)); // Forbidden!
        }
        next();
    };
};

// exports.forgotPassword = catchAsync(async(req, res, next) => {
//     // 1) Get user based on POSTed email
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         return next(new AppError('There is no user with this email address!', 404));
//     }

//     // 2) Generate the random reset token
//     const resetToken = user.createPasswordResetToken();
//     await user.save({ validateBeforeSave: false });

// 3) Send the token to user's email address
//     const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

//     const message = `Forgot your password? submit a PATCH request
//     with your new password and Password confirm to ${resetURL} \n 
//     If you didn't forget your password, please ignore this email`;

//     console.log(message);
//     try {
//         await sendEmail({
//             email: user.email,
//             subject: 'Your password reset token (valid for 10 min)',
//             message
//         })
//     } catch (err) {
//         user.passwordResetToken = undefined;
//         user.passwordResetExpires = undefined;
//         await user.save({ validateBeforeSave: false });
//         return next(new AppError('There was an error sending the email , try again later', 500));
//     }
// });

// exports.resetPassword = catchAsync(async(req, res, next) => {
//     // 1) Get user based on the token
//     const hashedToken = crypto.createHash('sha256')
//         .update(req.params.token)
//         .digest('hex');
//     const user = await User.findOne({
//         passwordResetToken: hashedToken,
//         passwordResetExpires: { $gt: Date.now() }
//     });

//     // 2) If token has not expired , user is exist , set the new password
//     if (!user) {
//         return next(new AppError('Token is invalid or has expired', 400));
//     }
//     user.password = req.body.password;
//     user.confirmPassword = req.body.confirmPassword;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     // 3) Update passwordChangedAt property 'It's done in pre hook middleware in userModel.js'

//     // 4) Log the user in , Send JWT
//     createSendToken(user, 200, res);
// });

// exports.updatePassword = async(req, res, next) => {
//     // 1) Get user from collection
//     const user = await User.findById(req.user.id).select('+password');

//     // 2) check if POSTed password is correct
//     if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
//         return next(new AppError('your current password is wrong!', 401));
//     }

//     // 3) If so , update password
//     user.password = req.body.password;
//     user.confirmPassword = req.body.confirmPassword;
//     await user.save();

//     // 4) Log user in , send JWT
//     createSendToken(user, 200, res);
// }