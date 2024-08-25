const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

const createComment = async (req, res) =>{
    try{
        const { userName, body, post} = req.body;
        const comment = new Comment({
            userName,
            body,
            post,
        });
        const savedComment = await comment.save();
        //find the post using id , add the new comment id to the comments array
        const updatedBlog = await Blog.findByIdAndUpdate(post,{$push: {comments: savedComment._id}}, {new: true})
                    .populate("comments")
                    .exec();
        // send a response
        res.status(200).json(
            {
                success: true,
                data : updatedBlog,
                message : "Comment entry successful",
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
    createComment
};