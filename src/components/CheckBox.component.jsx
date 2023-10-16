import React, { useState, useEffect } from "react";
import App from "../App";

const CustomCheckbox = ({
  dateArg,
  inputContent,
  isChecked,
  onCheckboxChange,
  label,
  checked,
  onChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="custom-checkbox">
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
