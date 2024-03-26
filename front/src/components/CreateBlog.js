import React, { useState } from "react";
import axios from "./axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/blogs", { title, content });
      console.log(response.data);
      // Redirect or handle successful creation
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateBlog;
