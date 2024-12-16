import mongoose from "mongoose";

const addictionSchema = new mongoose.Schema({

    typeype:{
        type: String,
        required: true
    },
    expertGuide: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    achievments:{
        type:
    }

}, {
    timestamps: true
})

const Addiction = mongoose.model("Addiction", addictionSchema);

export default Addiction