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
    sessionsPerWeek: {
        type: Number,
        required: true
    },
    reasonsToQuit: {
        type: String
    },
    videoPath: {
        type: String
    }
},{
    timestamps: true
})

const Quit = mongoose.model("Quit", quitSchema);

export default Quit