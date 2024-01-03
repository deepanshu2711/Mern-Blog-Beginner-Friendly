import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import Post from "../models/PostModel.js";
dotenv.config();





export const Logout =async(req,res,next) =>{
    res.clearCookie("access_token")
    res.json({success:"true"})
}


export const createPost =async(req,res,next) =>{
    const{title,summary,content,imageUrl,username} = req.body;
    try {
        const postDoc = await Post.create({
            title,
            summary,
            content,
            imageUrl,
            username
        });
        res.status(201).json(postDoc);
    } catch (error) {
        next(error)
    }  
}



export const getAllPosts =async(req,res,next) =>{
    try {
        const postDocs = await Post.find().sort({createdAt:-1}).limit(20);
        res.json(postDocs);
    } catch (error) {
        next(error)
    }
}


export const postWithId=async(req,res,next) =>{
    const PostId = req.params.id;
    try {
        const postDoc = await Post.findById(PostId);
        if(!postDoc) return res.json({message:"Post not found"});
        res.json(postDoc);
    } catch (error) {
        next(error)
    }
}


export const update = async(req,res,next) =>{
    const PostId = req.params.id;
    const {title,summary,content,imageUrl} = req.body;
    try {
        const postDoc = await Post.findById(PostId);
        if(!postDoc) return res.json({message:"Post not found"});
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.imageUrl = imageUrl;
        await postDoc.save();
        res.json(postDoc);
    } catch (error) {
        next(error)
    }
}