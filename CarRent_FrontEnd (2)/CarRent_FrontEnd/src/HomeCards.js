import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCards = () => {
  const navigate = useNavigate();

  const cardStyle = {
    width: "18rem",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div
          className="card mx-3 text-center border-primary"
          style={cardStyle}
          onClick={() => navigate("/dashboard")}
          onMouseOver={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseOut={(e) => (e.currentTarget.style = cardStyle)}
        >
          <div className="card-body">
            <h5 className="card-title">Admin Side</h5>
            <p className="card-text">Access the admin dashboard and manage the system.</p>
          </div>
        </div>
        <div
          className="card mx-3 text-center border-success"
          style={cardStyle}
          onClick={() => navigate("/")}
          onMouseOver={(e) => (e.currentTarget.style = { ...cardStyle, ...cardHoverStyle })}
          onMouseOut={(e) => (e.currentTarget.style = cardStyle)}
        >
          <div className="card-body">
            <h5 className="card-title">User Side</h5>
            <p className="card-text">Explore the user interface and shop for products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;