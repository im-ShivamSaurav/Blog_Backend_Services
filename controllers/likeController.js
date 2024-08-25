const Like = require("../models/likeModel");
const Blog = require("../models/blogModel");

const likeBlog = async (req, res) =>{
    try{
        const {userName, post} = req.body;
        const like = new Like({
            userName,
            post,
        });
        const savedLike = await like.save();
        const updatedBlog = await Blog.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
                    .populate("likes")
                    .exec();
        res.status(200).json(
            {
                success: true,
                data : updatedBlog,
                message : "Like entry successful",
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


const unlikeBlog = async (req, res) =>{
    try{
        const {like, post} = req.body;
        const deletedLike = await Blog.findOneAndDelete({_id: like, post: post});

        //update the post collection
        const updatedBlog = await Blog.findByIdAndUpdate(post, {$pull: {likes: like}}, {new: true})

        res.status(200).json(
            {
                success: true,
                data : updatedBlog,
                message : "Like entry deleted",
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
    likeBlog,
    unlikeBlog,
};