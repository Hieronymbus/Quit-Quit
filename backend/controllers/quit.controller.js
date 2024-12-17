import Quit from "../models/quit.model.js";
import path from"path";
import { randomUUID } from "crypto";

const __dirname = path.resolve() // because __dirname is not available when package.json has "type" : "module" .

///create a new quit
export const createQuit = async (req,res) => {
    
    const quit = req.body
    let uploadPath;
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

////read a list of all quits
export const readQuits = async (req, res) => {
    
    try {
        const quits = await Quit.find({});
        res.status(200).json({success: true, data: quits});
    } catch (err) {
        console.error("Error finding quits:", err.message);
        res.status(404).json({success: false, message:"Server Error"});
    };
};

//// update a quit: patch changed status
export const updateQuit = async (req, res) => {
    const {quitID} = req.params;
    const {status} = req.body;

    try {
       const updatedQuit = await Quit.findByIdAndUpdate(quitID, {status: status}, {new: true} )
       res.status(200).json({success: true, data: updatedQuit}) 
    } catch (err) {
        console.error("Error Updating Quit", err);
        res.status(500).json({success: false, message:"Server error"})
    }

}

//// delete a quit: 
export const deleteQuit = async (req,res) => {
    
    const {quitID} = req.params

    try {
        await Quit.findByIdAndDelete(quitID);
        res.status(200).json({success: true, message:"Quit succesfully completed"})
    } catch (error) {
        
    }
}

