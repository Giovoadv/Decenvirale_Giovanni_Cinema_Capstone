import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notFound">
      404 Not Found
      <span className="homeLink">
        <Link to="/">Back to Home Page</Link>
      </span>
    </div>
  );
};

export default NotFoundPage;
