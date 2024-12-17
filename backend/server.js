import express from "express";
import dotenv from "dotenv";
import path from "path";
import fileUpload from "express-fileupload";

import { connectToDB } from "./config/db.js";
import Quit from "./models/quit.model.js";
import quitRoutes from "./routes/quit.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve() // because __dirname is not available when package.json has "type" : "module" .

//middlewares
app.use(fileUpload());
app.use(express.json());

/// user apis ///

/// addiction apis ///

/// quit apis ///
app.use("/quits", quitRoutes)




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