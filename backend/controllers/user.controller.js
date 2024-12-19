import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
export const createRegister = async (req, res) => {
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

};

export const createLogin = async (req, res) => {
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
        res.status(500).json( {success: false, message: "Server Error, failure to log in"})
      }

};

export const createLogout = async (req, res) => {
    try {
        res.clearCookie('authToken')
        .status(200).json( { success: true, message: 'User succesfully logged Out'});
      
    } catch (err) {
        console.error("Error logging out:", err.message)
        res.status(500).json({success: true, message:"Server Error failure to logout"})
    }
};

export const readUser = async (req, res) => {
    const {_id, userName, role} = req.user;

    try {
       
        const user = await User.findById(_id)
        const userDataForFrontend = {
          _id: user._id,
          userName: user.userName,
          email: user.email
        }
        res.status(200).json( {success: true, data: userDataForFrontend } );
      } catch (err) {
        console.error("Error retreiving user details:", err.message);
        res.status(500).json({success:false, message:"Server Error"});
      }

};

export const updateUser = async (req, res) => {

    const {id} = req.params;
    const updatedDetails = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updatedDetails, {new: true})
        if(!updatedUser){
            return res.status(404).json({succes:false, message: "User not found"})
        }
        res.status(200).json({success: true, data: updatedUser})
    } catch (err) {
        console.error("Error updating user:", err.message)
        res.status(500).json({success:false, message: "Server Error, failed to update user"})
    }
};

export const deleteUser = async (req, res) => {

    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({succes:false, message: "User not found"})
        }
        res.status(200).json({success: true, message: "User succesfully deleted"});
    } catch (err) {
        console.error("Error Deleting user:",err.message)
        res.status(500).json({success:false, message: "Server Error failed to delete user"})
    }
};