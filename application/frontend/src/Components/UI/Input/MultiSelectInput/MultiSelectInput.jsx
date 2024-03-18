import React, { useEffect, useRef, useState } from "react";
import classes from "./MultiSelectInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MultiSelectInput = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDisabled, setIsDisabled] = useState({
    check_all: false,
    clear_all: true,
  });

  const options =
    searchQuery?.length !== 0
      ? props.options.filter((option) =>
          typeof option === "object"
            ? option.data.toLowerCase().includes(searchQuery.toLowerCase())
            : option.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : props.options;

  const searchInputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    props.onChange(selectedOptions);
    if (
      selectedOptions?.length > 0 &&
      selectedOptions?.length === options?.length
    ) {
      setIsDisabled({
        check_all: true,
        clear_all: false,
      });
    } else if (
      selectedOptions?.length > 0 &&
      selectedOptions?.length < options?.length
    ) {
      setIsDisabled({
        check_all: false,
        clear_all: false,
      });
    } else if (selectedOptions?.length === 0) {
      setIsDisabled({
        check_all: false,
        clear_all: true,
      });
    }
  }, [selectedOptions]);

  const displayOptionsHandler = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const hideOptionsHandler = () => {
    setShowOptions(false);
  };

  const checkboxChangeHandler = (e, option) => {
    const updatedSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((opt) => opt !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedSelectedOptions);
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

  const checkAllClickHandler = () => {
    const allOptions = options.map((option) => option);
    setSelectedOptions(allOptions);
  };

  useEffect(() => {
    setSelectedOptions([]);
  }, [props.emptyTextField]);

  const clearAllClickHandler = () => {
    setSelectedOptions([]);
  };

  const optionsContainerRef = useRef(null);

  useEffect(() => {
    if (props?.prevvalue !== "[]" && props.prevvalue?.length > 0) {
      setSelectedOptions(props?.prevvalue);
    }
    const outsideClickHandler = (e) => {
      if (
        optionsContainerRef.current &&
        !optionsContainerRef.current.contains(e.target)
      ) {
        hideOptionsHandler();
      }
    };
    document.addEventListener("mouseover", outsideClickHandler);
    return () => {
      document.removeEventListener("mouseover", outsideClickHandler);
    };
  }, []);

  return (
    <div className={classes["multi-select-form-controls"]}>
      <input
        type="text"
        name={props.name}
        ref={props.refs}
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
        // value={
        //   props.emptyTextField
        //     ? ""
        //     : selectedOptions.includes(",")
        //     ? selectedOptions?.map((opt) => (opt.data ? opt.data : opt))
        //     : selectedOptions
        // }
        value={
          props.emptyTextField
            ? ""
            : selectedOptions?.map((opt) => (opt.data ? opt.data : opt))
        }
        prevvalue={props.prevvalue}
        required={props.required}
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
              type="text"
              name="search"
              className={classes["search-input"]}
              id="search"
              autoFocus
              placeholder="Search..."
              onChange={searchInputChangeHandler}
              value={searchQuery}
              autoComplete="off"
            />
          </div>
          <div className={classes["check-clear-container"]}>
            <div
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
            </div>
          </div>
          {options?.length > 0 ? (
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
                          (opt) => opt.value === option.value
                        )?.length === 1
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
          )}
        </div>
      )}
    </div>
  );
};

const MultiSelectDropdown = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(selectedOptions);
  const [validationError, setValidationError] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const updatedSelectedItems = selectedItems.includes(option)
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(updatedSelectedItems);
    setValidationError("");
    onChange(updatedSelectedItems, null);
  };

  const validateSelection = () => {
    if (selectedItems?.length === 0) {
      setValidationError("Please select at least one option.");
      return false;
    }

    return true;
  };

  const handleDropdownChange = () => {
    const isValid = validateSelection();

    if (!isValid) {
      onChange(null, validationError);
    }
  };

  return (
    <div className={`multiSelectFormControls ${isOpen ? "open" : ""}`}>
      <div onClick={toggleDropdown} className="multiSelectInputBox">
        {selectedItems?.length > 0
          ? selectedItems.join(", ")
          : "Select options"}
      </div>
      {isOpen && (
        <div className="multiSelectOptionsContainer">
          {options.map((option) => (
            <div
              key={option}
              className={`multiOptionItems ${
                selectedItems.includes(option) ? "multiOptionItemsSelected" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(option)}
                onChange={() => handleOptionClick(option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      )}
      {validationError && (
        <div className="validationError">{validationError}</div>
      )}
    </div>
  );
};

const MultiSelectWithDisableOption = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(props.value);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    props.onChange(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    const selectedOptionsCount = selectedOptions?.length;
    if (selectedOptionsCount >= +props.totalNoOfSeats) {
      setDisabledOptions(
        props.options.filter((option) => !selectedOptions.includes(option))
      );
    } else {
      setDisabledOptions([]);
    }
  }, [selectedOptions, props.totalNoOfSeats, props.options]);

  const displayOptionsHandler = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const hideOptionsHandler = () => {
    setShowOptions(false);
  };

  const checkboxChangeHandler = (e, option) => {
    const foundOption = selectedOptions.find((opt) => opt === option);
    if (foundOption) {
      const updatedSelectedOptions = selectedOptions.filter(
        (opt) => opt !== option
      );
      setSelectedOptions(updatedSelectedOptions);
    } else if (selectedOptions?.length < +props.totalNoOfSeats) {
      setSelectedOptions((previousSelectedOptions) => [
        ...previousSelectedOptions,
        option,
      ]);
    }
  };

  const checkboxChangeHandlerObj = (e, option) => {
    const foundOption = selectedOptions.find(
      (opt) => opt.value === option.value
    );
    if (foundOption) {
      const updatedSelectedOptions = selectedOptions.filter(
        (opt) => opt.value !== option.value
      );
      setSelectedOptions(updatedSelectedOptions);
    } else if (selectedOptions?.length < +props.totalNoOfSeats) {
      setSelectedOptions((previousSelectedOptions) => [
        ...previousSelectedOptions,
        option,
      ]);
    }
  };

  useEffect(() => {
    disabledOptions?.length > 0 && props.openTo("None");
  }, [disabledOptions]);

  const openToManagerClickHandler = () => {
    props.openTo("Manager");
  };

  const openToEEClickHandler = () => {
    props.openTo("EE");
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

  const options =
    searchQuery?.length !== 0
      ? props?.options?.filter((option) =>
          typeof option === "object"
            ? option?.data?.toLowerCase().includes(searchQuery?.toLowerCase())
            : option?.toLowerCase().includes(searchQuery?.toLowerCase())
        )
      : props.options;

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
        autoComplete={props.autoComplete}
        value={selectedOptions.map((opt) => (opt.data ? opt.data : opt))}
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
              type="text"
              name="search"
              className={classes["search-input"]}
              id="search"
              autoFocus
              placeholder="Search..."
              onChange={searchInputChangeHandler}
              value={searchQuery}
            />
          </div>
          {options?.length > 0 ? (
            <div className={classes["multi-select-option-list-btn-container"]}>
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
                          )?.length === 1
                        }
                        disabled={disabledOptions?.includes(option)}
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
                        disabled={disabledOptions.includes(option)}
                      />
                      <p>{option}</p>
                    </li>
                  )
                )}
              </ul>
              {props?.nominate === "Admin" && (
                <div className={classes["action-btns-container"]}>
                  <div
                    className={`${classes["select-open-btn"]} ${
                      disabledOptions?.length > 0 && classes["disabled-btn"]
                    }`}
                    onClick={
                      disabledOptions?.length > 0
                        ? () => {}
                        : openToManagerClickHandler
                    }
                  >
                    Open to Manager
                  </div>
                  <div
                    className={`${classes["select-open-btn"]} ${
                      disabledOptions?.length > 0 && classes["disabled-btn"]
                    }`}
                    onClick={
                      disabledOptions?.length > 0
                        ? () => {}
                        : openToEEClickHandler
                    }
                  >
                    Open to EE
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className={classes["no-options-text"]}>No options found</p>
          )}
        </div>
      )}
    </div>
  );
};

const MultiSelectInputTraining = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(props.value);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDisabled, setIsDisabled] = useState({
    check_all: false,
    clear_all: true,
  });

  const options =
    searchQuery?.length !== 0
      ? props.options.filter((option) =>
          typeof option === "object"
            ? option.data.toLowerCase().includes(searchQuery.toLowerCase())
            : option.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : props.options;

  const searchInputChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    props.onChange(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    if (
      selectedOptions?.length > 0 &&
      selectedOptions?.length === options?.length
    ) {
      setIsDisabled({
        check_all: true,
        clear_all: false,
      });
    } else if (
      selectedOptions?.length > 0 &&
      selectedOptions?.length < options?.length
    ) {
      setIsDisabled({
        check_all: false,
        clear_all: false,
      });
    } else if (selectedOptions?.length === 0) {
      setIsDisabled({
        check_all: false,
        clear_all: true,
      });
    }
  }, [selectedOptions]);

  const displayOptionsHandler = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

  const hideOptionsHandler = () => {
    setShowOptions(false);
  };

  const checkboxChangeHandler = (e, option) => {
    if (props.openTo === "Manager" || props.openTo === "EE") {
      return; // Do nothing if openTo is "Manager" or "EE"
    }
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

  const checkAllClickHandler = () => {
    const allOptions = options.map((option) => option);
    setSelectedOptions(allOptions);
  };

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
        value={selectedOptions.map((opt) => (opt.data ? opt.data : opt))}
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
              type="text"
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
            <div
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
            </div>
          </div>
          {options?.length > 0 ? (
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
                        )?.length === 1
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
          )}
        </div>
      )}
    </div>
  );
};

export {
  MultiSelectInput,
  MultiSelectWithDisableOption,
  MultiSelectInputTraining,
  MultiSelectDropdown,
};
