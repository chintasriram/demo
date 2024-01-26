/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Property1Star = ({ color = "white", className }) => {
  return (
    <svg
      className={`property-1-star ${className}`}
      fill="none"
      height="12"
      viewBox="0 0 12 12"
      width="12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="g" clipPath="url(#clip0_1937_21863)">
        <path
          className="path"
          d="M11.8725 5.04327L9.24294 7.59875L9.86391 11.2081C9.89093 11.3659 9.82592 11.5254 9.6959 11.6197C9.62245 11.6731 9.53506 11.7 9.44768 11.7C9.38056 11.7 9.31301 11.6841 9.25138 11.6516L6 9.94758L2.74904 11.6512C2.6072 11.7261 2.43454 11.7139 2.30452 11.6192C2.1745 11.525 2.10949 11.3655 2.13651 11.2076L2.75749 7.59833L0.127509 5.04327C0.0126845 4.93132 -0.0291081 4.76382 0.0207053 4.61189C0.0705187 4.45996 0.202651 4.34843 0.3618 4.32528L3.99607 3.7992L5.62133 0.515635C5.7636 0.228187 6.2364 0.228187 6.37867 0.515635L8.00393 3.7992L11.6382 4.32528C11.7973 4.34843 11.9295 4.45954 11.9793 4.61189C12.0291 4.76424 11.9873 4.9309 11.8725 5.04327Z"
          fill={color}
        />
      </g>
      <defs className="defs">
        <clipPath className="clip-path" id="clip0_1937_21863">
          <rect className="rect" fill="white" height="12" width="12" />
        </clipPath>
      </defs>
    </svg>
  );
};

Property1Star.propTypes = {
  color: PropTypes.string,
};
