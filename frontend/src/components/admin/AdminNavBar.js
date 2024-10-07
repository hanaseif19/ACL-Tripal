import React from "react";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <nav>
      <div class="nav-bar">
        <div class="nav-bar-link">
          <Link to="/admin">Home</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/activity-categories">Activity Categories</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/preference-tags">Preference Tags</Link>
        </div>
        <div class="nav-bar-link">
          <Link to="/admin/view-products">Products</Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
