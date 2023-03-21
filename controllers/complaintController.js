const Complaint = require('./../models/complaintModel');
const catchAsync = require('./../utils/catchAsync');


exports.getAllComplaints = catchAsync(async (req,res)=>{
    const complaints = await Complaint.find();

    res.status(200).json({
        complaints
    })
})

exports.addComplaint = catchAsync(async (req,res)=>{
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
        status: 'success',
    })
})