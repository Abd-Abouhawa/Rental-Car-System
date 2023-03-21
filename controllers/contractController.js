const Contract = require('./../models/contractModel');


exports.createContract = async(req,res)=>{
    try{
        const contract = await Contract.create(req.body);
        res.status(201).json({
            contract
        })
    }
        catch(err){
            res.status(500).json({
                status:"fail"
            })
        }

    }

