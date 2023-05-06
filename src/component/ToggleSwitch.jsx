import React from "react";

const ToggleSwitch = (props) => {
  return (
    <div className="form-check form-switch mx-3">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault"
        onClick={props.applyMode}
      />
      <label
        className={`form-check-label ${
          props.mode === "light" ? "text-dark" : "text-light"
        }`}
        htmlFor="flexSwitchCheckDefault">
        {props.mode === "light" ? "Light" : "Dark"} Mode
      </label>
    </div>
  );
};

export default ToggleSwitch;
