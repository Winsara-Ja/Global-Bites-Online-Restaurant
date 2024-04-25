const UserModel = require("../models/Feedback");

const getFeedback = (req,res) => {
    UserModel.find({})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
}

const getSingleFeedback = async (req,res) => {
    const userId = req.params.id;
    UserModel.find({userId:userId})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
}

const getuserFeedback = async (req,res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
}

const updateFeedback = (req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        feedback:req.body.feedback})
    .then(feedbacks =>res.json(feedbacks))
    .catch(err => res.json(err))
}

const deleteFeedback = (req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
}

const createFeedback = (req,res) => {
    const {name, userId, email, feedback} = req.body
    UserModel.create({name, userId, email, feedback})
    .then(feedbacks => res.json(feedbacks))
    .catch(err => res.json(err))
}

module.exports = {
    getFeedback,
    getSingleFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getuserFeedback
}