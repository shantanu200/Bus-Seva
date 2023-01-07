import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    bookings:{
        type:Array
    }
},{timestamps:true});

export default mongoose.model("User",UserSchema);