import path from"path";
import { randomUUID } from "crypto";
import fs from "fs";
import Quit from "../models/quit.model.js";
import Addiction from "../models/addiction.model.js";

const __dirname = path.resolve() // because __dirname is not available when package.json has "type" : "module" .

///create a new quit
export const createQuit = async (req,res) => {
    
    const quit = req.body
    let uploadPath;
    const parsedUsageParameters = JSON.parse(quit.usageParameters);

    // Convert the parsed object to a Map (key-value pairs)
    const usageParamsMap = new Map(Object.entries(parsedUsageParameters));
    quit.usageParameters = usageParamsMap
    if(req.files) {
        const videoFile = req.files.videoFile;
        const uniqueName = randomUUID();
        const fileExtension = "." + videoFile.name.split(".").pop();
        const uniqueFileName = uniqueName + fileExtension;
        uploadPath = path.join(__dirname,'backend','public', 'uploads.test', uniqueFileName);

        videoFile.mv(uploadPath)
        quit.videoPath = uploadPath
    }
    const newQuit = new Quit(quit)
    try {
        await newQuit.save()
        res.status(201).json({success: true, data: newQuit})
    } catch (err) {
        console.error("Error in Create Quit", err)
        res.status(500).json({success: false, message:"Server error"})
    }
}

////read a list of all a users quits
export const readQuits = async (req, res) => {
    const {userID} = req.params
    try {
        const quits = await Quit.find({userID: userID}).populate("addictionTypeID");
        res.status(200).json({success: true, data: quits});
    } catch (err) {
        console.error("Error finding quits:", err.message);
        res.status(404).json({success: false, message:"Server Error"});
    };
};

//// update a quit: patch changed status
export const updateQuit = async (req, res) => {
    const {quitID} = req.params;
    const {status, abandonedDate} = req.body;
console.log(quitID)
console.log(status)
console.log(abandonedDate)
    try {
       const updatedQuit = await Quit.findByIdAndUpdate(quitID, {status: status, abandonedDate: abandonedDate}, {new: true} )
       res.status(200).json({success: true, data: updatedQuit}) 
    } catch (err) {
        console.error("Error Updating Quit", err);
        res.status(500).json({success: false, message:"Server error"})
    }

}

////  delete a single quit: 
export const deleteQuit = async (req,res) => {
    
    const {quitID} = req.params

    try {
        const quit = await Quit.findById(quitID)

        if(!quit){
            return res.status(404).json({ success: false, message:"failure to delete quit not found" })
        }
        
        await Quit.findByIdAndDelete(quitID);
        if(quit.videoPath){
            fs.unlink(quit.videoPath,(err) => {
                if(err){
                    console.error("Error deleting file:", err.message );
                    return res.status(500).json({success: false, message: "Quit entry deleted from DB, but file deletion failed"})
                } ;
            });
        };

        res.status(200).json({success: true, message:"Quit succesfully deleted"});
    } catch (err) {
        console.error("Server Error", err.message);
        res.status(500).json({ success: false, message:"Server Error, failure to delete" });
    };
};

//// delete all abandoned
export const deleteAllAbandonedQuits = async (req, res) => {

    
    try {
        const abandonedQuits = await Quit.find( { status: "abandoned" } );
        if(abandonedQuits.length === 0 ){
           return res.status(404).json({success: false, message: "No abandoned quits found to delete"});
        };
        
        abandonedQuits.forEach(async (quit, index)=> {
            await Quit.findByIdAndDelete(quit._id);

            if(quit.videoPath){
                fs.unlink(quit.videoPath,(err) => {
                    if(err){
                        console.error("Error deleting file:", err.message );
                    }; 
                });
            };
        });

        res.status(200).json({success: true, message: "Abandoned quits succesfully deleted"});
    } catch (err) {
        console.error("Server Error:", err.message );
        res.status(500).json({success: false, message: "Failure to delete, Server Error"});
    };

};
