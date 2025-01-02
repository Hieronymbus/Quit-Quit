import Addiction from "../models/addiction.model.js";

export const readAddictions =  async (req, res) => {

    try {
        const addictions = await Addiction.find();
        res.status(200).json({success: true, data: addictions});
    } catch (err) {
        console.error("Error retrieving addictions:", err.message);
        res.status(404).json({success: false, message:"Server Error"});
    };
}