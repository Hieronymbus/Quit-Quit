import mongoose from "mongoose";

const quitSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    addictionTypeID:{
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
    usageParameters: {
        type: Map,
        of: mongoose.Schema.Types.Mixed, // Can store values of varying types
        required: true,
    },
    reasonsToQuit: {
        type: String
    },   
    videoPath: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    abandonedDate: {
        type: Date,
        required: false
    }
},{
    timestamps: true
})
quitSchema.methods.updateStatusIfNeeded = function () {
    const currentDate = new Date();
    const startDate = this.startDate;
    const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000; // Approximation of 6 months

    if (this.status != "abandoned" && currentDate - startDate >= sixMonthsInMilliseconds) {
        this.status = "completed"  
    } 
}

const Quit = mongoose.model("Quit", quitSchema);

export default Quit