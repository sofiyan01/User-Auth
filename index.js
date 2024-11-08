import express from "express"
import dotenv from "dotenv"
import connectDB from "./utils/Dd.js";
import morgan from "morgan";
import authRouter from "./routes/auth.router.js";
dotenv.config();

const app=express();
const PORT=process.env.PORT || 5001
connectDB();

app.use(morgan("common"))
app.use(express.json())

// TODO - defining Routes

app.use("/api/auth",authRouter)



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})