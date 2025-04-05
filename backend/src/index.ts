import dotenv from "dotenv";
dotenv.config()


import express, { Express } from "express";
import authRoutes from "./routes/auth.route"
import { connectDB } from "./lib/db";
import { errorHandler } from "../src/middleware/error.middleware"

const app: Express = express();



app.use("/api/auth",authRoutes)

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 5001")
    connectDB()
});