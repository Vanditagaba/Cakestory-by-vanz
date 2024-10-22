import React from "react";
import "./inputfield.scss";

const InputField = ({
  type,
  name,
  label,
  fieldType,
  options,
  placeholder,
  onChange,
  value,
}) => {
  if (fieldType === "input") {
    return (
      <div className="inputContainer">
        <label htmlFor={name} className="inputLabel">
          {label}
        </label>
        <input
          type={type}
          name={name}
          className="formInput"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          required
          autoComplete="off"
        />
      </div>
    );
  }

  if (fieldType === "select") {
    return (
      <div className="inputContainer">
        <label htmlFor={name} className="inputLabel">
          {label}
        </label>

        <select
          name={name}
          id={name}
          className="formSelect"
          onChange={onChange}
          value={value}
        >
          {options.map((option) => {
            return (
              <>
                <option value={option.value === "select" ? "" : option.value}>
                  {option.option}
                </option>
              </>
            );
          })}
        </select>
      </div>
    );
  }
};

export default InputField;
