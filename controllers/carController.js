const multer = require('multer');

const Car = require('./../models/carModel');
const Features = require('./../utils/features');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
// filter by color => color=colorName                                                       [Done!]
// filter by category => ?category=categoryName                                             [Done!]
// filter by brand => ?brand=brandName                                                      [Done!]
// sort by price (low to high) and (high to low) => sort=price , sort=-price                [Done!]
// sort by popularity 
// sort by latest  => sort=-createAt                                                        [Done!]
// search by name
// Order Model



exports.getAllCars = async (req, res) => {
    
    try {
        const features = new Features(Car.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

            // const mostPopularityCars = await Car.find().sort({popularity : -1});
        const cars = await features.query.sort({createAt:-1});


        res.status(200).json({

            status: 'success',
            cars
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
};

exports.getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate({
            path: 'reviews',
            select: '-__v -_id'
        }).populate({
            path: 'rating',
            select: '-user -__v',
        })

        if (!car) throw new Error('The id is invalid');
        // Get suggested cars that contain the same category of main car(Get Car)

        const suggestedCars = await Car.find()
        .where('category')
        .equals(car.category)
        .where('_id')
        .ne(car.id)
        .where('available').equals(true)

        res.status(200).json({
            status: 'success',
            car,
            suggestedCars
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

const storage = multer.diskStorage({
    // Set the path to store the images in it
    destination: (req, file, cb) => {
        cb(null, './public/cars');
    },
    
    // set name of the image
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `car_${Date.now()}_${file.originalname.split('.')[0]}.${ext}`);
    }
});

// const storage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only images', 400), false);
    }
}

const upload = multer({
    storage,
    fileFilter: multerFilter
});

exports.uploadAll = upload.array('images' , 5);

// ////////////////////////////////////////////////////////////////////////////



exports.addCar = catchAsync(async (req, res, next) => {
    console.log(req.files);
    
    req.body.images = [];

    for(let i=0;i<req.files.length;i++){
        req.body.images.push(req.files[i].filename);
    }

        const car = await Car.create(req.body);
        res.status(201).json({
            status: 'success',
            data: car
        })
});


exports.updateCar = async (req, res) => {
    try {
        req.body.images = [];

        for(let i=0;i<req.files.length;i++){
            req.body.images.push(req.files[i].filename);
        }
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedCar) throw new Error('Car not found!');

        res.status(200).json({
            status: 'success',
            data: updatedCar
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
};

exports.deleteCarAndRecovery = catchAsync(async (req, res,next) => {
    
        const c = await Car.findById(req.params.id);
        const car = await Car.findByIdAndUpdate(req.params.id, {available : !c.available},
            { new: true, runValidators: true });

        if (!car) throw new Error('Car not found!');

        
        res.status(204).json({
            status: "success",
        });
});