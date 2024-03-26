const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Initiate password reset
router.post("/reset", (req, res) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Generate password reset token
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
      user.save();

      // Send password reset email
      const transporter = nodemailer.createTransport({
        // Configure your email service here
      });

      const mailOptions = {
        from: "your_email@example.com",
        to: user.email,
        subject: "Password Reset Request",
        text:
          `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://localhost:3000/reset/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.json({ msg: "Password reset email sent" });
        }
      });
    })
    .catch((err) => console.log(err));
});

// Reset password
router.post("/reset/:token", (req, res) => {
  const { newPassword } = req.body;
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Password reset token is invalid or has expired" });
      }

      // Set new password
      user.password = newPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save();

      res.json({ msg: "Password reset successful" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
