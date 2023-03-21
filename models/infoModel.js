const mongoose = require('mongoose');

//  phone , mobile1 , mobile2 , email , facebookLink , instagramLink , description , companyName , company
// ourservices , ourgoal , logo , placesOfDelivery 

const infoSchema = new mongoose.Schema({
    email : String ,
    mobile1 : String,
    mobile2 : String,
    phone : String , 
    facebookLink : String,
    instagramLink : String,
    description : String,
    companyName : String,
    ourServices : String,
    ourGoal : String,
    logo : String,
    placesOfDelivery : [String],
    sliderImages : [String]    
})

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;