import mongoose from "mongoose";

const quitSchema = new mongoose.Schema({

    addiction:{
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
    videoURL: {
        type: String
    }
},{
    timestamps: true
})

const Quit = mongoose.model("Quit", quitSchema);

export default Quit