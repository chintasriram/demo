/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Property1Multiple } from "../../icons/Property1Multiple";
import { Property1Tiktok } from "../../icons/Property1Tiktok";
import { Property1Youtube } from "../../icons/Property1Youtube";
import "./style.css";

export const Social = ({ property1, propertyInstaClassName }) => {
  return (
    <>
      {property1 === "Tiktok" && <Property1Tiktok className="instance-node" />}

      {["Instagram", "people"].includes(property1) && (
        <div className={`social ${property1} ${propertyInstaClassName}`}>
          {property1 === "people" && <img className="group" alt="Group" src="/img/group-1.png" />}
        </div>
      )}

      {/* {property1 === "Instagram" && <Property1Youtube className="instance-node" />} */}

      {property1 === "Youtube" && <Property1Youtube className="instance-node" />}

      {property1 === "multiple" && <Property1Multiple className="instance-node" />}
    </>
  );
};

Social.propTypes = {
  property1: PropTypes.oneOf(["Youtube", "Tiktok", "Instagram", "multiple", "people"]),
};
