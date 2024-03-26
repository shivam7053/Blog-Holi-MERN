module.exports = {
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.status(403).json({ msg: "Forbidden: You are already logged in" });
  },
};
