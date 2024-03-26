module.exports = {
  authorizeBlog: function (req, res, next) {
    // Check if the user is the author of the blog
    Blog.findById(req.params.id)
      .then((blog) => {
        if (!blog) {
          return res.status(404).json({ msg: "Blog not found" });
        }
        if (blog.author.toString() !== req.user.id) {
          return res
            .status(403)
            .json({ msg: "Forbidden: You are not the author of this blog" });
        }
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
      });
  },
};
