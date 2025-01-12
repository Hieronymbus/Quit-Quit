import mongoose from "mongoose";

const addictionSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    expertGuide: {
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    },
    usageParameters: [
        {
          name: {
            type: String,
            required: true, // e.g., "packsPerWeek"
          },
          type: {
            type: String,
            required: true, // e.g., "number" or "string"
          },
          required: {
            type: Boolean,
            default: true, // If the parameter is mandatory
          },
        }
    ],
    achievments:[
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            target: {
                type: Number,
                required: true
            },
            imagePath:{
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

const Addiction = mongoose.model("Addiction", addictionSchema);

export default Addiction