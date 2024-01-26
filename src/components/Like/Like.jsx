/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icon1 } from "../../icons/Icon1";
import { Property1Star } from "../../icons/Property1Star";
import "./style.css";

export const Like = ({ property1, className }) => {
  return (
    <div className={`like ${property1} ${className}`}>
      {["default", "hover"].includes(property1) && <Icon1 className="icon" />}

      {property1 === "variant-3" && <Property1Star className="icon" color="#2A85FF" />}
    </div>
  );
};

Like.propTypes = {
  property1: PropTypes.oneOf(["variant-3", "hover", "default"]),
};
