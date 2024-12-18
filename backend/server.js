import express from "express";
import dotenv from "dotenv";
import path from "path";
import fileUpload from "express-fileupload";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

import { connectToDB } from "./config/db.js";
import quitRoutes from "./routes/quit.route.js"
import Quit from "./models/quit.model.js";
import User from "./models/user.model.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const __dirname = path.resolve(); // because __dirname is not available when package.json has "type" : "module" .

//middlewares
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

function authCookieMiddleware(req, res, next) {
    //Each fetch request grab token
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({message:'Acces Denied'})
    };
    
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded;

      next()
    
    } catch (error) {
      res.status(401).json({message:'Invalid token'})
    }
};

/// user apis ///
app.post("/api/users/register", async (req, res) => {
    const { userName, email, password, confirmationPassword } = req.body

    if(password != confirmationPassword ){
        return res.status(400).json({success: false, message: 'password does not match confirmation password'})
    }
    const existingUserName = await User.findOne({userName: userName});
    if(existingUserName){
        return res.status(400).json({success: false, message: 'username already taken'});
    }
    const existingEmail = await User.findOne({email: email});
    if(existingEmail) {
        return res.status(400).json({success: false, message: 'email already registered'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        userName: userName,
        email: email,
        password: hashedPassword
    });

    try {
        await newUser.save()
        res.status(201).json({success: true, data: newUser})
    } catch (err) {
       console.error("Server Error:", err.message)
       res.status(500).json({success: false, message: "Server Error, failure to register"}) 
    }

});
app.post("/api/users/login", async (req, res) => {
    const { userNameEmail, password } = req.body

    try {
        //search by email or username
        const user = await User.findOne({
            $or:[
                {email: userNameEmail},
                {userName: userNameEmail}
            ]
        })
        if (!user){
           return res.status(400).send('No user found with those details')
        }
        //check for password match
        const match = await bcrypt.compare(password, user.password);
        
        const userDataForToken = {
          _id: user._id ,
          userName: user.userName ,
          role: "user" 
        }
        const userDataForFrontend = {
          _id: user._id,
          userName: user.userName,
          email: user.email
        }
  
        if(match) {
          //Generate token
          const token = jwt.sign( userDataForToken, SECRET_KEY, {expiresIn: '1h' } );
          //Assign token
          res.cookie('authToken', token, {httpOnly: true });
        
        } else {
            return res.status(400).json( { success: false, message: "incorrect password" })
        }
  
        res.status(201).json( { message:'logged in', data: userDataForFrontend });
      } catch (err) {
        console.error("Server Error:", err.message)
        res.status(500).json( {success: false, message: "Server Serror, failure to log in"})
      }

});
app.post('/api/users/logout', async (req, res) => {
    try {
        res.clearCookie('authToken')
        .status(200).json( { success: true, message: 'User succesfully logged Out'});
      
    } catch (err) {
        res.status(500).json({success: true, message:"Server Error failure to logout"})
    }
});

app.get("/api/users", authCookieMiddleware, async (req, res) => {
    const {id, userName, role} = req.user;


    try {
       
        const user = await User.findById(id)
        const userDataForFrontend = {
          id: user.id,
          userName: user.username,
          email: user.email
        }
        res.status(200).json( {success: true, data: userDataForFrontend } );
      } catch (err) {
        console.error(err);
        res.status(500).json({success:false, message:"Server Error"});
      }

});
app.put("/api/users/:id", async (req, res) => {

});
app.delete("/api/users/:id", async (req, res) => {

});

/// addiction apis ///
app.post("/api/addiction", async (req, res) => {
    
});
app.get("/api/addiction", async (req, res) => {

});
app.patch("/api/addiction/:addictionID", async (req, res) => {

});
app.delete("/api/addiction/:addictionID", async (req, res) => {

});

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