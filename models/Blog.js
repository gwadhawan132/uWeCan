import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({
    topic:{ 
        type:String,
        required:true
    },
    content: {
        type: String,
        required: true,
        maxlength: 10000 

    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
export const Blog = mongoose.model('Blog', blogSchema);
