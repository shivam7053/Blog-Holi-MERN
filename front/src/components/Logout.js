import React from "react";
import axios from "./axios";

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      // Redirect or handle successful logout
    } catch (error) {
      console.error("Logout failed:", error.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
