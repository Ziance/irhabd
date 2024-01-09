import React, { useEffect, useRef } from "react";

const Marker = ({ onClick }) => {
  return (
    <div className="marker" onClick={onClick}>
      &#x1F6A9;
    </div>
  );
};

export default Marker;
