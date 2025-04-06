import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome, {user?.username}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
