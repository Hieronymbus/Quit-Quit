import mongoose from "mongoose";

const quitSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    addictionType:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Addiction'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    spendingPerWeek: {
        type: Number,
        required: true
    },
    usageParameters: {
        type: Map,
        of: mongoose.Schema.Types.Mixed, // Can store values of varying types
        required: true,
    },
    videoPath: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Quit = mongoose.model("Quit", quitSchema);

export default Quit