import React, { useEffect, useRef, useState } from "react";
import classes from "./InputItem.module.css";
import chevrondown from "../../../Assets/chevrondown.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  const inputChangeHandler = (e) => {
    if (props.fields) {
      props.onChange(e.target.value, ...props.fields);
    } else {
      props.onChange(e.target.value);
    }
  };

  const inputBlurHandler = (e) => {
    if (props.fields) {
      props.onChange(e.target.value.trim(), ...props.fields);
      props.onBlur && props.onBlur();
    } else {
      props.onChange(e.target.value.trim());
      props.onBlur && props.onBlur();
    }
  };

  return (
    <div className={classes["form-controls"]}>
      <input
        type={props.type}
        ref={props.refs}
        name={props.name}
        id={props.name}
        pattern={props.pattern}
        min={props.min}
        max={props.max}
        checked={props.checked}
        required={props.required}
        onChange={props.readOnly ? () => null : inputChangeHandler}
        onBlur={props.readOnly ? () => null : inputBlurHandler}
        value={props.value}
        autoComplete="off"
        disabled={props.disabled}
        style={props.style}
        maxLength={props.maxLength}
        minLength={props.minLength}
      />
      <label style={props.style} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
};

const TextArea = (props) => {
  const inputChangeHandler = (e) => {
    if (props.fields) {
      props.onChange(e.target.value, ...props.fields);
    } else {
      props.onChange(e.target.value);
    }
  };

  const inputBlurHandler = (e) => {
    if (props.fields) {
      props.onChange(e.target.value.trim(), ...props.fields);
    } else {
      props.onChange(e.target.value.trim());
    }
  };

  return (
    <div className={`${classes["form-controls"]} ${classes.textarea}`}>
      <textarea
        name={props.name}
        id={props.name}
        ref={props.refs}
        cols={props.cols}
        rows={props.rows}
        required={props.required}
        onChange={props.readOnly ? () => null : inputChangeHandler}
        onBlur={props.readOnly ? () => null : inputBlurHandler}
        value={props.value}
        autoComplete="off"
        disabled={props.disabled}
        style={{ resize: "none" }}
      />
      <label style={props.style} htmlFor={props.name}>
        {props.label}
      </label>
    </div>
  );
};

const SelectInput = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const options =
    searchQuery.length !== 0
      ? props.options.filter((option) =>
          typeof option === "object"
            ? option.data.toLowerCase().includes(searchQuery.toLowerCase())
            : option.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : props.options;

  const searchInputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const displayOptionsHandler = () => {
    setSearchQuery("");
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };
  const hideOptionsHandler = () => {
    setShowOptions(false);
  };

  const selectOptionHandler = (option) => {
    if (props.fields) {
      typeof option === "object"
        ? props.onChange(option, ...props.fields)
        : props.onChange(
            {
              data: option,
              value: option,
            },
            ...props.fields
          );
    } else {
      typeof option === "object"
        ? props.onChange(option)
        : props.onChange({
            data: option,
            value: option,
          });
    }

    hideOptionsHandler();
  };
  const optionsContainerRef = useRef(null);
  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(e.target)
      ) {
        setSearchQuery("");
        hideOptionsHandler();
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return (
    <div
      className={`${classes["form-controls"]} ${classes["select-form-controls"]}`}
    >
      <input
        type={props.type}
        name={props.name}
        id={props.name}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          displayOptionsHandler();
        }}
        // onChange={() => null}
        onChange={() => {}}
        value={props.value}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        autoComplete={props.autoComplete}
        required
        ref={props.ref}
      />
      <label style={props.style} htmlFor={props.name}>
        {props.label}
      </label>
      {/* <FontAwesomeIcon
        icon={faChevronDown}
        className={
          !showOptions
            ? classes["select-dropdown-icon"]
            : classes["select-dropdown-icon-rotated"]
        }
      /> */}
      <img
        src={chevrondown}
        className={
          !showOptions
            ? classes["select-dropdown-icon"]
            : classes["select-dropdown-icon-rotated"]
        }
      ></img>
      {showOptions && (
        <div className={classes["options-container"]} ref={optionsContainerRef}>
          <div className={classes["single-search-container"]}>
            <input
              type="text"
              name="search"
              className={classes["search-input-single"]}
              autoFocus
              placeholder="Search..."
              onChange={searchInputChangeHandler}
              value={searchQuery}
            />
          </div>
          <ul className={classes["options-lists"]}>
            {options.map((option) =>
              typeof option === "object" ? (
                <li
                  className={classes["dropdownList"]}
                  key={`${option.data}_${Math.random().toString()}`}
                  onClick={() => selectOptionHandler(option)}
                >
                  <p htmlFor={option.value}>{option.data}</p>
                </li>
              ) : (
                <li
                  className={classes["dropdownList"]}
                  key={option}
                  onClick={() => selectOptionHandler(option)}
                >
                  <p htmlFor={option}>{option}</p>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { Input, TextArea, SelectInput };
