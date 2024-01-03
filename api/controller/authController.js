import User from "../models/UserModel.js"
import { errorHandler } from "../utils/errorHandler.js"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const RegisterUser =async(req,res,next) =>{
        const{username,email,password} = req.body
        try {
                const existinguser = await User.findOne({username})
                if(existinguser) return next(errorHandler(400,"Username already taken"))
        
                const existingemail = await User.findOne({email})
                if(existingemail) return next(errorHandler(400,"Email already taken"))
                const hashedPassword = bcryptjs.hashSync(password,10);

                const createdUser = await User.create({username, email, password:hashedPassword});
                
                const {password:pass, ...rest} = createdUser._doc;
                const userInfoToSend = {...rest}
                res.status(201).json(userInfoToSend);
        } catch (error) {
            next(error)
        }
}



export const LoginUser =async(req,res,next) =>{
        const {email,password} = req.body
        try {
                const existinguser = await User.findOne({email})
                if(!existinguser) return next(errorHandler(400,"Invalid credentials"))
                const isPasswordCorrect = bcryptjs.compareSync(password,existinguser.password)
                if(!isPasswordCorrect) return next(errorHandler(400,"Invalid credentials"))
                const {password:pass, ...rest} = existinguser._doc;
                const userInfoToSend = {...rest}
                const token = jwt.sign({id:existinguser._id},process.env.JWT_SECRET,{expiresIn:"1d"});
                res.cookie("access_token",token,{
                        httpOnly:true
                });
                res.status(200).json(userInfoToSend);
        } catch (error) {
            next(error)
        }
}