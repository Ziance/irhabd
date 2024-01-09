import React from "react";

const InfoWindow = ({onClose, children }) => {
  return (
    <div className="info-window">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      {children}
    </div>
  );
};

export default InfoWindow;

// style={{
//   position: "absolute",
//   top: 0, //infoWindow?.latitude,
//   left: 0, //infoWindow?.longitude,
//   backgroundColor: 'red',
//   padding: '6px',
//   boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//   maxWidth: '300px',
//   minWidth: '100px',
// }}
