const multer = require('multer');
const Info = require('./../models/infoModel');
const catchAsync = require('./../utils/catchAsync');

exports.getInfo = catchAsync(async (req,res)=>{
    const info = await Info.find();
    res.status(200).json({
        info
    });
});


const storage = multer.diskStorage({
    // Set the path to store the images in it
    destination: (req, file, cb) => {
        cb(null, './public/info');
    },
    
    // set name of the image
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `slider_${Date.now()}_${file.originalname.split('.')[0]}.${ext}`);
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

exports.uploadAll = upload.array('sliderImages' , 5);

// TODO
exports.updateInfo = catchAsync(async (req,res)=>{
        
        req.body.sliderImages = [];
        

        for(let i=0;i<req.files.length;i++){
            req.body.sliderImages.push(req.files[i].filename);
        
    }
    const newInfo = await Info.updateOne(req.body);
    
    res.status(200).json({
        status : "success",
        data : {
            newInfo
        }
    })
})