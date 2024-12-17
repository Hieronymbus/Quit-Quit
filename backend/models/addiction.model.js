import mongoose from "mongoose";

const addictionSchema = new mongoose.Schema({

    type:{
        type: String,
        required: true
    },
    expertGuide: {
        type: String,
        required: true
    },
    imagePath:{
        type: String,
        required: true
    },
    achievments:[{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imagePath:{
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

const Addiction = mongoose.model("Addiction", addictionSchema);

export default Addiction