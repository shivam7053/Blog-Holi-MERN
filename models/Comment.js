const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: "blog",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
