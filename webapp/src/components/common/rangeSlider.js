// CustomRangeSlider.js
import React from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const CustomRangeSlider = (props) => {
  const {
    minVal = 0,
    maxVal = 0,
    defaultMin = 0,
    defaultMax = 1000,
    step = 1,
    onInputHandler,
  } = props;

  return (
    <>
      <RangeSlider
        min={defaultMin}
        max={defaultMax}
        step={step}
        value={[minVal, maxVal]}
        onInput={onInputHandler}
        className="custom-range-slider"
        thumbClassName="custom-thumb"
        trackClassName="custom-track"
      />
      <div className="d-flex w-full justify-content-between mt-1">
        <p className="text-muted text-sm">{defaultMin}</p>
        <p className="text-muted text-sm">{`${minVal}, ${maxVal}`}</p>
        <p className="text-muted text-sm">{defaultMax}</p>
      </div>
    </>
  );
};

export default CustomRangeSlider;
