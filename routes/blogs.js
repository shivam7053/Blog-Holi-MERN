const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authMiddleware = require("../middlewares/auth");
const authorizationMiddleware = require("../middlewares/authorization");

// Create a new blog
router.post("/",authMiddleware.ensureAuthenticated, (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({
    title,
    content,
    author: req.user.id, // Assuming you have authentication middleware to populate req.user
  });
  newBlog
    .save()
    .then((blog) => res.json(blog))
    .catch((err) => console.log(err));
});

// Get all blogs with pagination
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    Blog.find()
        .populate('author', 'name')
        .skip(skip)
        .limit(limit)
        .then(blogs => res.json(blogs))
        .catch(err => console.log(err));
});

// Search blogs by title
router.get('/search', (req, res) => {
    const { title } = req.query;
    Blog.find({ title: { $regex: title, $options: 'i' } })
        .populate('author', 'name')
        .then(blogs => res.json(blogs))
        .catch(err => console.log(err));
});

// Update a blog
router.put("/:id", authMiddleware.ensureAuthenticated, (req, res) => {
  const { title, content } = req.body;
  Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true })
    .then((blog) => res.json(blog))
    .catch((err) => console.log(err));
});

// Delete a blog
router.delete("/:id", authMiddleware.ensureAuthenticated, (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Blog deleted successfully" }))
    .catch((err) => console.log(err));
});

// Like a blog
router.post("/:id/like", authMiddleware.ensureAuthenticated, (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog.likes.includes(req.user.id)) {
        blog.likes.push(req.user.id);
        blog.save().then((blog) => res.json(blog));
      } else {
        res.status(400).json({ msg: "You already liked this blog" });
      }
    })
    .catch((err) => console.log(err));
});

// Unlike a blog
router.post('/:id/unlike', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog.likes.includes(req.user.id)) {
                blog.likes = blog.likes.filter(userId => userId !== req.user.id);
                blog.save().then(blog => res.json(blog));
            } else {
                res.status(400).json({ msg: 'You have not liked this blog yet' });
            }
        })
        .catch(err => console.log(err));
});

// Get comments count for a specific blog
router.get('/:id/comments/count', (req, res) => {
    Comment.countDocuments({ blog: req.params.id })
        .then(count => res.json({ count }))
        .catch(err => console.log(err));
});


module.exports = router;

