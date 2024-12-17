import express from "express";
import dotenv from "dotenv";
import path from "path";
import fileUpload from "express-fileupload";
import { randomUUID } from "crypto";
import { connectToDB } from "./config/db.js";
import Quit from "./models/quit.model.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve() // because __dirname is not available when package.json has "type" : "module" .

//middlewares
app.use(fileupload());
app.use(express.json());


app.get('/quits', async (req, res) => {
    
    try {
        const quits = await Quit.find({});
        res.status(200).json({success: true, data: quits});
    } catch (err) {
        console.error("Error finding quits:", err.message);
        res.status(404).json({success: false, message:"Server Error"});
    };
});

app.post('/quits', async (req,res) => {
    
    const quit = req.body
    let uploadPath;
    if(req.files) {
        const videoFile = req.files.videoFile;
        const uniqueName = randomUUID();
        const fileExtension = "." + videoFile.name.split(".").pop();
        const uniqueFileName = uniqueName + fileExtension;
        uploadPath = path.join(__dirname,'public', 'testUploads', uniqueFileName);

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
});

app.delete('/quits/:quitID', async (req,res) => {
    
    const {quitID} = req.params

    try {
        await Quit.findByIdAndDelete(quitID);
        res.status(200).json({success: true, message:"Quit succesfully completed"})
    } catch (error) {
        
    }
});



// Check if the app is running in "production" mode
// "process.env.NODE_ENV" is an environment variable that stores the current mode (development or production)
if (process.env.NODE_ENV === "production") {

    // Serve static files from the "dist" folder inside the "frontend" directory
    // In production, the frontend files (HTML, CSS, JavaScript, etc.) are often bundled and placed in a "dist" folder
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // Handle all other routes by sending the "index.html" file
    // The "*" means that any route that doesn't match an API or static file will be handled by this
    app.get("*", (req, res) => {
        // Send the "index.html" file located in the "dist" folder
        // This ensures that the frontend's main HTML file is served for any route (like React or Vue's client-side routing)
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server started. app is listening on port ${PORT}`);
});