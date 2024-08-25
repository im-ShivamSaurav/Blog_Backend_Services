const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        userName :{
            type:String,
            required: true,
            maxLength: 30
        },
        blogTitle :{
            type: String,
            required: true,
            maxLength: 30
        },
        blogData :{
            type: String,
            required: true,
            maxLenght: 200
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Like",
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            }
        ],
        created_at :{
            type: Date,
            default: Date.now,
        },
        updated_at :{
            type:Date,
            default : Date.now
        }
    }
);

module.exports = mongoose.model('Blog', blogSchema);