import React from "react";

const CircularProgress = ({ size, strokeWidth, progress }) => {
  const viewbox = `0 0 ${size} ${size}`;
  const radius = size / 2 - strokeWidth / 2;
  const strokeDashArray = radius * 2 * Math.PI;
  const strokeDashOffset = strokeDashArray * ((100 - progress) / 100);
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewbox}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="#e4e4e7"
        strokeWidth={`${strokeWidth}px`}
      ></circle>
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="#2276D6"
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        strokeDasharray={`${strokeDashArray}px`}
        strokeDashoffset={`${strokeDashOffset}px`}
      ></circle>
    </svg>
  );
};

export default CircularProgress;
