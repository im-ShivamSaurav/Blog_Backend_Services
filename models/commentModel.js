const mongoose = require ("mongoose");

const commentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog", //refers to the collection name
    },
    userName:{
        type: String,
        required: true,
        maxLength: 30,
    },
    body:{
        type: String,
        required: true,
        maxLength: 100,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Comment", commentSchema);