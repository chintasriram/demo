/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Like } from "../Like";
import { Social } from "../Social";
import "./style.css";

export const InfluencerItem = ({ property1, className, socialPropertyInstaClassName, selectedItem, onOpenCallback }) => {

  const handleClick = () => {
    onOpenCallback()
  }
  return (
    <div className={`influencer-item ${className}`} onClick={handleClick}>
      <div className="overlap-group">
        <div className="overlap">
          <div className="text-wrapper">{selectedItem.title}</div>
          <div className="frame">
            {/* <div className="div">Apparel</div> */}
            {/* <div className="ellipse-wrapper">
              <div className="ellipse" />
            </div> */}
            <div className="div">{selectedItem.geography}</div>
            <div className="ellipse-2" />
            <Social
              property1={selectedItem.platform}
              propertyInstaClassName={`${property1 === "past-hire" ? "class" : socialPropertyInstaClassName}`}
            />
          </div>
        </div>
        <Like className="like-instance" property1="default" />
        {property1 === "past-hire" && (
          <div className="div-wrapper">
            <div className="text-wrapper-2">Past Hire</div>
          </div>
        )}
      </div>
    </div>
  );
};

InfluencerItem.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "past-hire", "default"]),
};
