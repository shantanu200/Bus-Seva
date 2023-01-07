import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDatabase from "./controllers/dbConnect.js";
import busCompRoutes from "./routes/BusCompany.js";
import userRoutes from "./routes/User.js";
import contactRoutes from "./routes/Contact.js";
import paymentRoutes from "./routes/Payment.js";
import busservicesRoutes from "./routes/BusDetail.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//Application Creation
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/uploads",express.static("uploads"));

//All Routes
app.use("/busComp",busCompRoutes);
app.use("/user",userRoutes);
app.use("/contact",contactRoutes);
app.use("/pay",paymentRoutes);
app.use("/busService",busservicesRoutes);

const PORT = process.env.PORT || 6969;

app.listen(PORT,() => {
   connectDatabase();
   console.log(`Application is connected to PORT ${PORT}`);
});


