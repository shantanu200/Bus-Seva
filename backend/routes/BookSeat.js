import express from "express"; 
import SeatsBooking from "../models/SeatsBooking";

const router = express.Router();


router.post("/saveSeatsDetails",async (req,res) => {
    if(!req.body) res.status(400).json("Error");

    const reqBody = req.body;

    
})

export default router;
