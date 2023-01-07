import mongoose from "mongoose";

const BusCompanySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    registerDate:{
        type:String,
        required:true
    },
    busesCount:{
        type:Number,
        required:true
    },
    compDescription:{
        type:String,
        required:true
    },
    nameOfOperator:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    buses:{
        type:[Object],
        unique:true
    },
    otp:{
        type:String,
    },
    images:{
        type:Array,
    }
});

export default mongoose.model("BusCompany",BusCompanySchema);
