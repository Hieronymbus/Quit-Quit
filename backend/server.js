import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();


app.listen(3000, () => {
    console.log("Server started at http://localhost:3000")
})