import React, { useEffect, useRef, useState } from "react";
import classes from "./MultiSelectDate.Module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MultiSelectDate = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDisabled, setIsDisabled] = useState({
    check_all: false,
    clear_all: true,
  });

  //   const options =
  //     searchQuery.length !== 0
  //       ? props.options.filter((option) =>
  //           typeof option === "object"
  //             ? option.data.toLowerCase().includes(searchQuery.toLowerCase())
  //             : option.toLowerCase().includes(searchQuery.toLowerCase())
  //         )
  //       : props.options;

  const searchInputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  //   useEffect(() => {
  //     props.onChange(selectedOptions);
  //     if (
  //       selectedOptions.length > 0 &&
  //       selectedOptions.length === options.length
  //     ) {
  //       setIsDisabled({
  //         check_all: true,
  //         clear_all: false,
  //       });
  //     } else if (
  //       selectedOptions.length > 0 &&
  //       selectedOptions.length < options.length
  //     ) {
  //       setIsDisabled({
  //         check_all: false,
  //         clear_all: false,
  //       });
  //     } else if (selectedOptions.length === 0) {
  //       setIsDisabled({
  //         check_all: false,
  //         clear_all: true,
  //       });
  //     }
  //   }, [selectedOptions]);

  const displayOptionsHandler = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const hideOptionsHandler = () => {
    setShowOptions(false);
  };

  const checkboxChangeHandler = (e, option) => {
    const foundOption = selectedOptions.find((opt) => opt === option);
    if (!foundOption) {
      setSelectedOptions((previousSelectedOptions) => [
        ...previousSelectedOptions,
        option,
      ]);
    } else {
      const updatedSelectedOptions = selectedOptions.filter(
        (opt) => opt !== option
      );
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  const checkboxChangeHandlerObj = (e, option) => {
    const foundOption = selectedOptions.find(
      (opt) => opt.value === option.value
    );
    if (!foundOption) {
      setSelectedOptions((previousSelectedOptions) => [
        ...previousSelectedOptions,
        option,
      ]);
    } else {
      const updatedSelectedOptions = selectedOptions.filter(
        (opt) => opt.value !== option.value
      );
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  //   const checkAllClickHandler = () => {
  //     const allOptions = options.map((option) => option);
  //     setSelectedOptions(allOptions);
  //   };

  useEffect(() => {
    setSelectedOptions([]);
  }, [props.emptyTextField]);

  const clearAllClickHandler = () => {
    setSelectedOptions([]);
  };

  const optionsContainerRef = useRef(null);

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(e.target)
      ) {
        hideOptionsHandler();
      }
    };
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);
  return (
    <div className={classes["multi-select-form-controls"]}>
      <input
        type="text"
        name={props.name}
        id={props.name}
        className={classes["multi-select-input-box"]}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          displayOptionsHandler();
        }}
        onChange={() => {}}
        disabled={props.disabled}
        autoComplete={props.autoComplete}
        value={
          props.emptyTextField
            ? ""
            : selectedOptions.map((opt) => (opt.data ? opt.data : opt))
        }
        required
      />
      <label style={props.style} htmlFor={props.name}>
        {props.label}
      </label>
      <FontAwesomeIcon
        icon={faChevronDown}
        className={
          !showOptions
            ? classes["select-dropdown-icon"]
            : classes["select-dropdown-icon-rotated"]
        }
      />

      {showOptions && (
        <div
          className={classes["multi-select-options-container"]}
          ref={optionsContainerRef}
        >
          <div className={classes["multiselect-search-container"]}>
            <input
              type="date"
              onKeyDown={(e) => e.preventDefault(e)}
              name="search"
              className={classes["search-input"]}
              id="search"
              autoFocus
              placeholder="Search..."
              onChange={searchInputChangeHandler}
              value={searchQuery}
            />
          </div>
          <div className={classes["check-clear-container"]}>
            {/* <div
              className={`${classes["check-all-box"]} ${
                isDisabled.check_all ? classes["disabled-btn"] : ""
              }`}
              onClick={isDisabled.check_all ? () => {} : checkAllClickHandler}
            >
              Check All
            </div>
            <div
              className={`${classes["clear-all-box"]} ${
                isDisabled.clear_all ? classes["disabled-btn"] : ""
              }`}
              onClick={isDisabled.clear_all ? () => {} : clearAllClickHandler}
            >
              Clear All
            </div> */}
          </div>
          {/* {options.length > 0 ? (
            <ul className={classes["multi-select-option-list"]}>
              {options.map((option) =>
                typeof option === "object" ? (
                  <li
                    className={classes["multi-option-items"]}
                    key={`${option.data}_${Math.random().toString()}`}
                    onClick={(e) => checkboxChangeHandlerObj(e, option)}
                  >
                    <input
                      type="checkbox"
                      className={classes["checkbox-selection"]}
                      onChange={() => {}}
                      checked={
                        selectedOptions.filter(
                          (opt) => opt.data === option.data
                        ).length === 1
                      }
                    />
                    <p>{option.data}</p>
                  </li>
                ) : (
                  <li
                    className={classes["multi-option-items"]}
                    key={`${option}_${Math.random().toString()}`}
                    onClick={(e) => checkboxChangeHandler(e, option)}
                  >
                    <input
                      type="checkbox"
                      className={classes["checkbox-selection"]}
                      onChange={() => {}}
                      checked={selectedOptions.includes(option)}
                    />
                    <p>{option}</p>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className={classes["no-options-text"]}>No options found</p>
          )} */}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDate;
