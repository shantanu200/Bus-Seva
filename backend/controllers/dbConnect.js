import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.mongo_uri;

export default function connectDatabase() {
    mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log(`Database connected to server`);
    }).catch((err) => {
        console.log(`Error occured in Database ${err}`);
    });
}