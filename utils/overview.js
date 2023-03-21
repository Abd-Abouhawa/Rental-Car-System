const User = require('./../models/userModel');
const Car = require('./../models/carModel');
const Order = require('./../models/orderModel');


// TODO Statistics
exports.getOverviewInfo = async(req,res)=>{
    try{
        const usersCount = await User.count();
        const carsCount = await Car.count();
        const ordersProcessingCount = await Order.count().where('isDone').equals('true');
        const ordersUnProcessingCount = await Order.count().where('isDone').equals('false');
                
        const mostPopularityCars = await Car.find().sort({popularity : -1});
        
        const mostRatingsCars = await Car.find().sort({ratingsAverage : -1});

        const mostPopularity = [] , mostRating = [];
        mostPopularity.push(mostPopularityCars[0].name,mostPopularityCars[1].name,mostPopularityCars[2].name);

        mostRating.push(`${mostRatingsCars[0].name} : ${mostRatingsCars[0].ratingsAverage}/${mostRatingsCars[0].ratingsQuantity}`,
                        `${mostRatingsCars[1].name} : ${mostRatingsCars[1].ratingsAverage}/${mostRatingsCars[1].ratingsQuantity}`,
                        `${mostRatingsCars[2].name} : ${mostRatingsCars[2].ratingsAverage}/${mostRatingsCars[2].ratingsQuantity}`);
                        
        const statistics = {
            usersCount ,
            carsCount ,
            ordersProcessingCount,
            ordersUnProcessingCount ,
            mostPopularity,
            mostRating
        }

        
        res.status(200).json({
            statistics,
        });

    }catch(err){
        console.error(err);
    }
}