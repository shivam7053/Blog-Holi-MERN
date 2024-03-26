import React, { useEffect, useState } from "react";
import axios from "./axios";

const CommentList = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/blogs/${blogId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };
    fetchComments();
  }, [blogId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id}>
          <p>{comment.content}</p>
          <p>By: {comment.author.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
