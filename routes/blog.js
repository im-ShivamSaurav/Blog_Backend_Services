const express = require ( "express" );
const router = express.Router();

//import the controllers
const {createBlog, getBlog, getBlogById, updateBlog, deleteBlog} = require("../controllers/blogController");

const {createComment} = require("../controllers/commentController");

const {likeBlog, unlikeBlog} = require("../controllers/likeController");

//define API routes
router.post("/blogs/create", createBlog);
router.get("/blogs", getBlog);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id/update", updateBlog);
router.delete("/blogs/:id/delete", deleteBlog);


router.post('/comments/create', createComment);

router.post('/likes/like', likeBlog);
router.post('/likes/unlike', unlikeBlog);

module.exports = router;