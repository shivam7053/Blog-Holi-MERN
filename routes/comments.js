const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Create a new comment
router.post("/", (req, res) => {
  const { content, blogId } = req.body;
  const newComment = new Comment({
    content,
    author: req.user.id,
    blog: blogId,
  });
  newComment
    .save()
    .then((comment) => res.json(comment))
    .catch((err) => console.log(err));
});

// Get comments for a specific blog
router.get("/:blogId", (req, res) => {
  Comment.find({ blog: req.params.blogId })
    .populate("author", "name")
    .then((comments) => res.json(comments))
    .catch((err) => console.log(err));
});

// Update a comment
router.put('/:id', (req, res) => {
    const { content } = req.body;
    Comment.findByIdAndUpdate(req.params.id, { content }, { new: true })
        .then(comment => res.json(comment))
        .catch(err => console.log(err));
});

// Delete a comment
router.delete('/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: 'Comment deleted successfully' }))
        .catch(err => console.log(err));
});

module.exports = router;

