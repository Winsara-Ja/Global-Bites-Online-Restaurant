const express = require("express")
const router = express.Router()
const cors = require("cors");

const {  getFeedback,
    getSingleFeedback,
    createFeedback,
    updateFeedback,
    getuserFeedback,
    deleteFeedback} = require("../controllers/feedbackController")

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);

router.post("/createfeedback",createFeedback)
router.get("/getfeedback", getFeedback)
router.get("/getUserFeedback/:id", getSingleFeedback)
router.get("/getFeedback/:id", getuserFeedback)
router.delete("/deleteFeedback/:id", deleteFeedback)
router.put("/updateFeedback/:id", updateFeedback)

module.exports = router

