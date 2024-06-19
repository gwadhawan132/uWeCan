import express from "express";
import { Blog } from "../models/Blog.js";

const router = express.Router();

router.post('/',async(req,res)=>{
    const { topic, content, author } = req.body;
    const blogPost = new Blog({
        topic,
        content,
        author
    });

    try {
        const savedBlogPost = await blogPost.save();
        res.status(200).json(savedBlogPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error });
    }
})

router.get('/',async(req,res)=>{
    try{
        const blogPosts=await Blog.find();
        res.status(200).json(blogPosts);
    }catch(error){
        res.status(500).json({message:'error fetching the blog details'});
    }
});


export default router;