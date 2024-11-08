import express from "express"
import { Login, Logout, Register } from "../controller/auth.controller.js"


const authRouter=express.Router()

authRouter.post("/register",Register)
authRouter.post("/login",Login)
authRouter.post("/logout",Logout)



export default authRouter