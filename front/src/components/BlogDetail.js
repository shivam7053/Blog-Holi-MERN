import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <div>
      {blog ? (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
