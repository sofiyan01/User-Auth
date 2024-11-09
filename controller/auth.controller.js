import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import validator from "validator"
import jwt from "jsonwebtoken"



//TODO- Generating JWT token

const generateToken=(id)=>{
    return  jwt.sign({id},process.env.JWT_SECRET)
}


export const Register=async(req,res)=>{

    try {

        //TODO- destructuring User data
        const {name,email,password}=req.body
        
        
        if (!name || !email || !password) {
            return res.json({
                success:false,
                message:"All Fields are Required"
            }) 
        }
        
        if (password.length<8) {
            return res.json({
                success:false,
                message:"Password must be Strong"
            })
        }

        const user=await User.findOne({email})

        //TODO- checking if user already exist
        if (user) {
            return res.json({
                success:false,
                message:"User Already Exist"
            })
        }

        //TODO- checking email is valid or not using Validator dependency
        if (!validator.isEmail(email)) {
            return res.json({
                success:false,
                message:"Please Provide Valid Email"
            })
        }


            //TODO-hashing password

            const hashedPassword=bcryptjs.hashSync(password,10)


            //TODO-creating user

            const newUser=new User({
                name,
                email,
                password:hashedPassword
            })

            //TODO-saving new user in Database
            await newUser.save()

            res.json({
                success:true,
                newUser
            })
        

    } catch (error) {
        console.log(error);
        
    }

}


export const Login=async(req,res)=>{

    try {
        
        const {email,password}=req.body

        const user=await User.findOne({email})

        //TODO- checking if user not registered
        if (!user) {
            return res.json({
                success:false,
                message:"User Not Found,please Register first"
            })
        }
        
        //TODO- compare user password with hashed password

        const isMatch=bcryptjs.compareSync(password,user.password)

        if (!isMatch) {
            return res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }

        //TODO- here we are calling JWT token function defined on top
        const token=generateToken(user._id)

        res.cookie("access-token",token,{
            httpOnly:true,
            
        })

        res.json({
            success:true,
            message:"Logged in Successfully"
        })
        





    } catch (error) {
        console.log(error);
        
    }

}



// functionality for Logout

export const Logout=(req,res)=>{

    try {
        
        // TODO- Here we are deleting cookie to logged out user

        res.clearCookie("access-token")

        res.json({
            success:true,
            message:"Logged out Successfully"
        })


    } catch (error) {
        console.log(error);
    }
}