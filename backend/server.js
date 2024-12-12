import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
    res.send("hello world")
});

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});