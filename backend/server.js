import express from "express";
import dotenv from "dotenv";
import path from "path";
import fileUpload from "express-fileupload";

import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import { connectToDB } from "./config/db.js";
import addictionRoutes from "./routes/addiction.route.js";
import quitRoutes from "./routes/quit.route.js";
import userRoutes from "./routes/user.route.js";
import miscRoutes from "./routes/misc.route.js";
import Quit from "./models/quit.model.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const __dirname = path.resolve(); // because __dirname is not available when package.json has "type" : "module" .

//middlewares
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'backend', 'public')));
export function authCookieMiddleware(req, res, next) {
    //Each fetch request grab token
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({message:'Acces Denied'})
    };
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;

      next()
    
    } catch (err) {
      console.error("Authentication Error:", err.message)  
      res.status(401).json({message:'Invalid token'})
    }
};



/// misc api ///
app.use("/api/misc", miscRoutes)

/// user apis ///
app.use("/api/users", userRoutes)

/// addiction apis ///
app.use("/api/addictions", addictionRoutes )

/// quit apis ///
app.use("/api/quits", quitRoutes)


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