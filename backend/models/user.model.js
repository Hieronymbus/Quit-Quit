import mongoose from "mongoose";
import Quit from './quit.model.js'
const userSchema = new mongoose.Schema({

    userName:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

userSchema.pre('findOneAndDelete', async function (next) {
    const userID = this.getQuery()._id; // Get the user ID being deleted
    await Quit.deleteMany({ userID });  // Delete all quits linked to this user
    next();
});

const User = mongoose.model("User", userSchema);

export default User;