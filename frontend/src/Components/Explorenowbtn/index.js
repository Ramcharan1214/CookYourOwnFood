import React from "react";
import { useNavigate } from "react-router-dom";

function NavigateButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dishes");
  };

  return (
    <button type="button" className="explore-button" onClick={handleClick}>
      Explore Now
    </button>
  );
}

export default NavigateButton;
