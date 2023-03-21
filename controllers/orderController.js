const multer = require('multer');
const Order = require('./../models/orderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Car = require('./../models/carModel');

/****************** Start settings upload images ******************** */

const storage = multer.diskStorage({
    // Set the path to store the images in it
    destination : (req,file,cb)=>{
        cb(null, './public/IDS');
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

exports.uploadAll = upload.fields([
    {name : 'IDImg'},
    {name : 'lecience'}
]);
/****************** End settings upload images ******************** */

exports.createOrder = catchAsync(async (req,res,next)=>{
    console.log(req.files);
    req.body.IDImg = req.files.IDImg[0].filename;
    req.body.lecience = req.files.lecience[0].filename;
    
    const order = await Order.create(req.body);

    res.status(201).json({
        status: 'success',
        order
    })
});

exports.getOrder = catchAsync(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order)return next(new AppError('This id is not exist',404));

    res.status(200).json({
        status: 'success',
        order
    });
});

exports.getAllOrders = catchAsync(async (req,res,next)=>{
    const orders = await Order.find();
    res.status(200).json({
        status: 'success',
        orders
    })
})

exports.handleOrder = catchAsync(async (req,res,next)=>{
    const order = await Order.findByIdAndUpdate(req.params.id, {isDone : true},{ new: true, runValidators: true });
    
    res.status(200).json({
        status: 'success',
        order
    })
})