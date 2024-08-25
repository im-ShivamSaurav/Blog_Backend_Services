const Blog = require("../models/blogModel");

const createBlog = async (req, res) =>{
    try{
        const { userName,blogTitle, blogData} = req.body;
        //create a object in db
        const blog = await Blog.create({userName,blogTitle, blogData});
        // send a response
        res.status(200).json(
            {
                success: true,
                data : blog,
                message : "Blog entry successful",
            }
        )
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(
            {
                success: false,
                error : err.message,
                message : "Internal Server Error",
            }
        )
    }
}

const getBlog = async (req, res) =>{
    try{
        const blogs = await Blog.find({}).populate("comments").populate("likes").exec();
        res.status(200).json(
            {
                success: true,
                data : blogs,
                message : "Blog entries fetched successfully",
            }
        )
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(
            {
                success: false,
                error : err.message,
                message : "Internal Server Error",
            }
        )
    }
}

const getBlogById = async(req, res) =>{
    try{
        const id = req.params.id;
        const blog = await Blog.findById({_id:id});
        if(!blog){
            return res.status(404).json(
                {
                    success: false,
                    message : "Blog entry not found",
                }
            )
        }
        res.status(200).json(
            {
                success:true,
                data: blog,
                message: "Blog entry fetched successfully",
            }
        )
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(
            {
                success: false,
                error : err.message,
                message : "Internal Server Error",
            }
        )
    }
}

const updateBlog = async(req,res) =>{
    try{
        const {userName,blogTitle, blogData} = req.body;
        const id = req.params.id;
        const blog = await Blog.findByIdAndUpdate({_id:id},{userName, blogTitle, blogData});
        res.status(200).json(
            {
                success: true,
                data : blog,
                message : "Blog updated successfully",
            }
        )
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(
            {
                success: false,
                error : err.message,
                message : "Internal Server Error",
            }
        )
    }
}

const deleteBlog = async (req, res) =>{
    try{
        const id = req.params.id;
        const blog = await Blog.findByIdAndDelete({_id:id});
        res.json(
            {
                success: true,
                data : blog,
                message : "Blog deleted successfully",
            }
        )
    }
    catch(err){
        console.error(err.message);
        res.status(500).json(
            {
                success: false,
                error : err.message,
                message : "Internal Server Error",
            }
        )
    }
}

module.exports = {
    createBlog,
    getBlog,
    getBlogById,
    updateBlog,
    deleteBlog
}