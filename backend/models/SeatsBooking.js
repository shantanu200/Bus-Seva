import mongoose from "mongoose";

const SeatsSchema = new mongoose.Schema({
    userName:{
        type:String,
        requried:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    busNo:{
        type:String,
        required:true
    },
    totalPassenger:{
        type:Number,
        required:true
    },
    seatsNumber:{
        type:Array,
        required:true
    },
    userInfo:{
        type:Array,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    boardingPoint:{
        type:String,
        required:true
    },
    droppingPoint:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:Boolean,
        required:true
    }
})

export default mongoose.model("Seats",SeatsSchema);