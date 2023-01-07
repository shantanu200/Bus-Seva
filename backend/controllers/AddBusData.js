import BusCompany from "../models/busComp.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./uploads"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + file.originalname.match(/\..*$/)[0]
        );
    }
});

const multi_upload = multer({
    storage
}).array("uploadImages", 10);

export const addBusData = (req,res) => {
    let id = req.params.id;

    const reqData = req.body;

    const images = req.body.images;

    BusCompany.findOne({_id:id},(err,data) => {
        if(err) res.status(200).json({status:false,data:err});

        if(data){
           multi_upload(req,res,function(err){
            
            if(err instanceof multer.MulterError){
                (err);
                    res.status(500).json({ error: "Server side error in Multer" });
            }else if(err){
                if (err.name == "ExtensionError") {
                    res.status(413).json({ error: `unknown uploading error: ${err.message}` })
                }
            }else{
                res.status(200).json({status:true,data:images});
            }
           })
        }
    })
}