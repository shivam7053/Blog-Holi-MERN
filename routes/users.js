const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const guestMiddleware = require("../middlewares/guest");
const authMiddleware = require("../middlewares/auth")

// Load User model
const User = require("../models/User");

// Register
router.post("/register", guestMiddleware.ensureGuest, (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Logout
router.get("/logout", (req, res) => {
  // Remove token from localStorage
  res.clearCookie('token'); // Clear the cookie if token is stored in cookies
  res.json({ msg: 'Logout successful' });
});

// Login
router.post("/login", guestMiddleware.ensureGuest, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred while authenticating" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  })(req, res, next);
});

// Get user profile
router.get('/profile/:userId', (req, res) => {
    User.findById(req.params.userId)
        .then(user => res.json(user))
        .catch(err => console.log(err));
});

// Update user profile
router.put('/profile', authMiddleware.ensureAuthenticated, (req, res) => {
    const { name, email } = req.body;
    User.findById(req.user.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            user.name = name || user.name;
            user.email = email || user.email;
            user.save()
                .then(updatedUser => res.json(updatedUser))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


module.exports = router;
