import React, { useState, useRef, useEffect, Component } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import classes from "./MathEquationEditorOutput.module.css";
import HoverDetailsModal from "../UI/Modal/HoverDetailsModal/HoverDetailsModal";
import MatrixInputModal from "../UI/Modal/MatrixInputModal/MatrixInputModal";
import SearchModal from "../UI/Modal/SearchModal/SearchModal";
import searchIcon from "../../Assets/search.png";
import cloudDownloadIcon from "../../Assets/cloud-download.png";
import katex from "katex";
// import canvg from "canvg";
// import { default as canvg } from "canvg";
import { Canvg } from "canvg";
import WMF from "wmf";
// import wmfjs from "wmf-js";
import buttonInfos from "../Infos/buttonInfos.json";

export const MathEquationEditorOutput = () => {
  // modal
  const [hoverDetailsModal, setHoverDetailsModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [matrixInputModal, setMatrixInputModal] = useState(false);

  const [hoverButtonInfo, setHoverButtonInfo] = useState({});

  const tabs = [
    {
      name: "mathConstructs",
      label: "Math Constructs",
    },
    {
      name: "greekAndHebrewLetters",
      label: "Greek and Hebrew Letters",
    },
    {
      name: "delimiters",
      label: "Delimiters",
    },
    {
      name: "standardFunctionNames",
      label: "Standard Function Names",
    },
    {
      name: "binaryOperationAndRelationSymbols",
      label: "Binary and Relation Symbols",
    },
    {
      name: "arrowSymbols",
      label: "Arrow Symbols",
    },
  ];

  const mathConstructs = buttonInfos.mathConstructs;

  const greekAndHebrewLetters = buttonInfos.greekAndHebrewLetters;

  const delimiters = buttonInfos.delimiters;

  const standardFunctionNames = buttonInfos.standardFunctionNames;

  const binaryOperationAndRelationSymbols =
    buttonInfos.binaryOperationAndRelationSymbols;

  const arrowSymbols = buttonInfos.arrowSymbols;

  // use states
  const [selectedEditArea, setSelectedEditArea] = useState("0");
  const [tabSelected, setTabSelected] = useState("mathConstructs");
  const [panelButtons, setPanelButtons] = useState(mathConstructs);
  const [equation, setEquation] = useState([]);
  const editAreaRef = useRef(null);
  const [lengthOfSelectedArea, setLengthOfSelectedArea] = useState(0);
  const [cursorIndex, setCursorIndex] = useState(0);

  // console Use Effects
  useEffect(() => {
    console.log("panelButtons", panelButtons);
  }, [panelButtons]);

  useEffect(() => {
    console.log(" cursor lengthOfSelectedArea ", lengthOfSelectedArea);
    console.log(" cursor cursor index ", cursorIndex);
    console.log("cursor selectedEditArea ", selectedEditArea);
  }, [lengthOfSelectedArea, cursorIndex]);

  // use effects
  useEffect(() => {
    console.log("selectedEditArea uf", selectedEditArea);
    let splittedIndexes = selectedEditArea.split(",");
    const copy = [...equation];
    const lastIdx = splittedIndexes.pop();
    const targetArray = getValueAtIndex(copy, splittedIndexes);
    console.log("target array 2656 ", targetArray, selectedEditArea, lastIdx);
    if (lastIdx === "n") {
      setLengthOfSelectedArea(targetArray?.value1?.length);
      setCursorIndex(targetArray?.value1?.length - 1);
    } else if (lastIdx === "d") {
      setLengthOfSelectedArea(targetArray?.value2.length);
      setCursorIndex(targetArray?.value2.length - 1);
    } else if (lastIdx === "v") {
      setLengthOfSelectedArea(targetArray?.value?.length);
      setCursorIndex(targetArray?.value?.length - 1);
    } else {
      if (targetArray.name === "Matrix") {
        setLengthOfSelectedArea(targetArray?.value[lastIdx]?.length);
        setCursorIndex(targetArray?.value[lastIdx]?.length - 1);
      } else {
        setLengthOfSelectedArea(targetArray?.length);
        setCursorIndex(targetArray?.length - 1);
      }
    }

    console.log(
      "target arrau 547",
      lastIdx === "n"
        ? targetArray?.value1?.length
        : lastIdx === "d"
        ? targetArray?.value2?.length
        : targetArray?.value?.length,
      targetArray,
      lastIdx,
      splittedIndexes
    );
  }, [selectedEditArea]);

  useEffect(() => {
    console.log("selectedEditArea uf", selectedEditArea);
    let splittedIndexes = selectedEditArea.split(",");
    const copy = [...equation];
    const lastIdx = splittedIndexes.pop();
    const targetArray = getValueAtIndex(copy, splittedIndexes);
    setLengthOfSelectedArea(targetArray.length);
    console.log(
      "target arrau 547",
      lastIdx === "n"
        ? targetArray?.value1?.length
        : lastIdx === "d"
        ? targetArray?.value2?.length
        : targetArray?.value?.length,
      targetArray,
      lastIdx,
      splittedIndexes
    );
  }, [equation]);

  // useEffect(() => {
  //   setCursorIndex()
  // }, [selectedEditArea]);

  // mouse outside click event handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(
        "event handleClickOutside",
        event.target.className,
        event.ctrlKey,
        event.key
      );

      if (
        editAreaRef.current &&
        !editAreaRef.current.contains(event.target) &&
        event.target.className !== "" &&
        !event.target.className.includes("panel-button-ref") &&
        event.target.className !== "panel-button" &&
        !event.target.className.includes("panel-tab") &&
        event.target.className.includes("MathEquationEditorOutput")
      ) {
        setSelectedEditArea("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(
        "event handleClickOutside",
        event.target.className,
        event.ctrlKey,
        event.key
      );
      if (event.ctrlKey && (event.key === "s" || event.key === "s")) {
        event.preventDefault();
        alert("ctrl + s");
      }
      if (!event.ctrlKey && !searchModal && !matrixInputModal) {
        handleKeyDownOutside(
          event,
          selectedEditArea,
          lengthOfSelectedArea,
          cursorIndex
        );
      }
    };

    const handleKeyUp = () => {
      // Handle key up if needed
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedEditArea, cursorIndex, lengthOfSelectedArea, searchModal]);

  // equation change use effect handler
  useEffect(() => {
    console.log("equation  uf", equation);
    const result = convertToLatex(equation);
    console.log("equation  uf result", result);

    renderEquation(result);
  }, [equation]);

  // functions

  //handle tab select
  const tabSelectHandler = (tabName) => {
    setTabSelected(tabName);
    if (tabName === "mathConstructs") {
      setPanelButtons(mathConstructs);
    } else if (tabName === "greekAndHebrewLetters") {
      setPanelButtons(greekAndHebrewLetters);
    } else if (tabName === "delimiters") {
      setPanelButtons(delimiters);
    } else if (tabName === "standardFunctionNames") {
      setPanelButtons(standardFunctionNames);
    } else if (tabName === "binaryOperationAndRelationSymbols") {
      setPanelButtons(binaryOperationAndRelationSymbols);
    } else if (tabName === "arrowSymbols") {
      setPanelButtons(arrowSymbols);
    }
  };
  // iterating value through indexes in equation array
  const getValueAtIndex = (arr, indices) => {
    const getValue = (array, idxs) => {
      if (idxs.length === 0) {
        return array;
      }
      const index = idxs.shift();
      let value;
      if (index === "v") {
        value = array["value"];
      } else if (index === "n") {
        value = array["value1"];
      } else if (index === "d") {
        value = array["value2"];
      } else if (typeof index === "string" && !isNaN(parseInt(index))) {
        value = array[parseInt(index)];
      } else {
        return undefined;
      }
      console.log("inside get value function ", index, "idxs ", idxs, value);
      if (Array.isArray(value) || typeof value === "object") {
        return getValue(value, idxs);
      }
      return value;
    };

    return getValue(arr, [...indices]);
  };

  // updating value of selected edit area accordingly
  const updateValueAtIndex = (indexes, value) => {
    console.log("inside updateValueAtIndex ", indexes, value);
    const copy = [...equation];
    const lastIdx = indexes.pop();
    const targetArray = getValueAtIndex(copy, indexes);
    console.log(
      " inside updateValueAtIndex target array 101",
      indexes,
      targetArray,
      lastIdx
    );
    if (!Array.isArray(targetArray)) {
      if (lastIdx === "n") {
        if (value === "Backspace") {
          // targetArray?.value1?.pop();

          targetArray?.value1?.splice(cursorIndex, 1);

          // minus
          setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
        } else {
          // targetArray.value1 = [
          //   ...targetArray.value1,
          //   Array.isArray(value) ? [...value] : value,
          // ];

          targetArray.value1.splice(
            cursorIndex + 1,
            0,
            Array.isArray(value) ? [...value] : value
          );
          // plus
          setCursorIndex((prev) => prev + 1);
        }
        setEquation(copy);
      } else if (lastIdx === "d") {
        if (value === "Backspace") {
          // targetArray?.value2?.pop();
          targetArray?.value2?.splice(cursorIndex, 1);
          // minus
          setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
        } else {
          // targetArray.value2 = [
          //   ...targetArray.value2,
          //   Array.isArray(value) ? [...value] : value,
          // ];

          targetArray.value2.splice(
            cursorIndex + 1,
            0,
            Array.isArray(value) ? [...value] : value
          );
          // plus
          setCursorIndex((prev) => prev + 1);
        }
        setEquation(copy);
      } else if (lastIdx === "v") {
        if (value === "Backspace") {
          // targetArray?.value?.pop();
          targetArray?.value?.splice(cursorIndex, 1);
          // minus
          setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
        } else {
          // targetArray.value = [
          //   ...targetArray.value,
          //   Array.isArray(value) ? [...value] : value,
          // ];
          targetArray.value.splice(
            cursorIndex + 1,
            0,
            Array.isArray(value) ? [...value] : value
          );
          // plus
          setCursorIndex((prev) => prev + 1);
        }
        console.log("copy before setting");
        setEquation(copy);
      } else {
        if (value === "Backspace") {
          // targetArray?.value?.pop();
          targetArray?.value[lastIdx]?.splice(cursorIndex, 1);
          // minus
          setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
        } else {
          // targetArray.value = [
          //   ...targetArray.value,
          //   Array.isArray(value) ? [...value] : value,
          // ];
          console.log("copy before setting", lastIdx, value);

          targetArray.value[lastIdx].splice(
            cursorIndex + 1,
            0,
            Array.isArray(value) ? [...value] : value
          );
          // plus
          setCursorIndex((prev) => prev + 1);
        }
        setEquation(copy);
      }
    }
    if (Array.isArray(targetArray)) {
      // targetArray[lastIdx] = value;
      // targetArray[cursorIndex] = value;Array.isArray(value) ? [...value] : value
      targetArray.splice(
        cursorIndex + 1,
        0,
        Array.isArray(value) ? [...value] : value
      );
      // plus
      setCursorIndex((prev) => prev + 1);
      setEquation(copy);
    }
  };

  // handling key pressed and inserting accordindly
  const handleKeyDownOutside = (
    event,
    selectedEditArea,
    lengthOfSelectedArea,
    cursorIndex
  ) => {
    let splittedIndexes = selectedEditArea.split(",");
    console.log("event key ", event, handleKeyDownOutside);
    if (
      selectedEditArea !== "" &&
      (/^[a-zA-Z0-9]$/.test(event.key) ||
        event.key === "+" ||
        event.key === "-" ||
        event.key === "/" ||
        event.key === "*" ||
        event.key === "=" ||
        event.key === "(" ||
        event.key === ")" ||
        event.key === "." ||
        event.key === "," ||
        event.key === "<" ||
        event.key === ">" ||
        event.key === ":" ||
        event.key === ";" ||
        event.key === "[" ||
        event.key === "]")
    ) {
      if (selectedEditArea === "0") {
        // setEquation((prev) => [...prev, event.key]);
        setEquation((prev) => {
          let finalValue = [...prev];
          finalValue.splice(cursorIndex + 1, 0, event.key);
          console.log("equation uf ", finalValue);

          return finalValue;
        });

        // plus
        setCursorIndex((prev) => prev + 1);
      } else {
        updateValueAtIndex(splittedIndexes, event.key);
      }
    } else if (selectedEditArea !== "" && event.code === "Space") {
      if (selectedEditArea === "0") {
        // setEquation((prev) => [...prev, " "]);
        setEquation((prev) => {
          let finalValue = [...prev];
          finalValue.splice(cursorIndex + 1, 0, " ");
          console.log("equation uf ", finalValue);

          return finalValue;
        });

        // plus
        setCursorIndex((prev) => prev + 1);
      } else {
        updateValueAtIndex(splittedIndexes, event.key);
      }
    } else if (selectedEditArea !== "" && event.key === "Backspace") {
      console.log("backspace selected edited ", selectedEditArea);
      if (selectedEditArea === "0") {
        setEquation((prev) => {
          let final = [...prev];
          final?.splice(cursorIndex, 1);
          // final.pop();
          console.log("final value backspace ", final);

          return final;
        });
        // minus
        setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
      } else {
        updateValueAtIndex(splittedIndexes, event.key);
      }
    } else if (selectedEditArea !== "" && event.key === "ArrowLeft") {
      console.log("backspace selected edited ", selectedEditArea);
      // setLengthOfSelectedArea((prev) => prev - 1);
      setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1));
    } else if (selectedEditArea !== "" && event.key === "ArrowRight") {
      console.log("backspace selected edited ", selectedEditArea);
      // setLengthOfSelectedArea((prev) => prev + 1);
      console.log("right arrow ", cursorIndex, lengthOfSelectedArea);
      setCursorIndex((prev) =>
        prev + 1 >= lengthOfSelectedArea ? prev : prev + 1
      );
    }
  };

  // selected edit change handler
  const selectedEditAreaHandler = (event, id) => {
    event.stopPropagation();
    setSelectedEditArea(id);
  };

  //cloning objects
  function deepClone(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj; // Return non-object values as-is
    }

    if (Array.isArray(obj)) {
      // If obj is an array, create a new array and recursively clone its elements
      return obj.map((item) => deepClone(item));
    }

    // If obj is an object, create a new object and recursively clone its properties
    const clonedObj = {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  // panel button inserting
  const panelButtonClicked = (buttonInfo, rowsCount, columnsCount) => {
    console.log("buttonInfo panelButtonClicked", buttonInfo);
    if (selectedEditArea === "") {
      return;
    }
    if (
      buttonInfo.name === "Matrix" &&
      rowsCount === undefined &&
      columnsCount === undefined
    ) {
      setMatrixInputModal(true);
      return;
    } else if (buttonInfo.name === "Matrix" && rowsCount && columnsCount) {
      console.log(
        " inside panel button clicked  matrix ",
        buttonInfo,
        rowsCount,
        columnsCount
      );
      let rows = typeof rowsCount === "string" ? Number(rowsCount) : rowsCount;
      let columns =
        typeof columnsCount === "string" ? Number(columnsCount) : columnsCount;
      buttonInfo.row = rows;
      buttonInfo.column = columns;
      buttonInfo.value = [...Array(rows * columns)].map((value) => []);
    }

    let splittedIndexes = selectedEditArea.split(",");
    const copy = [...equation];
    const lastIdx = splittedIndexes.pop();
    const targetArray = getValueAtIndex(copy, splittedIndexes);
    console.log(
      " inside updateValueAtIndex target array 101",
      buttonInfo,
      splittedIndexes,
      targetArray,
      lastIdx
    );
    console.log("target arrau ", targetArray, lastIdx, splittedIndexes);

    if (selectedEditArea !== "") {
      // if (!Array.isArray(targetArray)) {
      if (lastIdx === "n") {
        // targetArray.value1.push({ ...buttonInfo, value1: [] });
        targetArray.value1.splice(cursorIndex + 1, 0, {
          ...buttonInfo,
          value1: [],
        });

        console.log("copy before setting", copy);
        setEquation(copy);
        // plus
        setCursorIndex((prev) => prev + 1);
      } else if (lastIdx === "d") {
        // targetArray.value2.push({ ...buttonInfo, value2: [] });
        targetArray.value2.splice(cursorIndex + 1, 0, {
          ...buttonInfo,
          value2: [],
        });

        console.log("copy before setting", copy);
        setEquation(copy);
        // plus
        setCursorIndex((prev) => prev + 1);
      } else if (lastIdx === "v") {
        try {
          // targetArray.value.push({ ...buttonInfo, value: [] });
          targetArray.value.splice(cursorIndex + 1, 0, {
            ...buttonInfo,
            value: [],
          });

          console.log("copy before setting", copy);
          setEquation(copy);
          // plus
          setCursorIndex((prev) => prev + 1);
        } catch (error) {
          console.log("error was ", error);
        }
      } else {
        if (targetArray.name === "Matrix") {
          try {
            targetArray.value[lastIdx]?.splice(cursorIndex + 1, 0, {
              ...buttonInfo,
              // value: [],
            });

            console.log("copy before setting", copy);
            setEquation(copy);
            // plus
            setCursorIndex((prev) => prev + 1);
          } catch (error) {
            console.log("error was ", error);
          }
        } else {
          // setEquation((prev) => [...prev, { ...buttonInfo, value: [] }]);
          setEquation((prev) => {
            console.log("3101");
            // return prev;
            let finalValue = [...prev];
            // finalValue.splice(cursorIndex + 1, 0, { ...buttonInfo, value: [] });

            finalValue.splice(cursorIndex + 1, 0, {
              ...buttonInfo,
              // value: [],
            });

            // console.log("equation uf 934", finalValue, ...buttonInfo);

            return finalValue;
          });

          // plus
          setCursorIndex((prev) => prev + 1);
          console.log("copy before setting", copy);
        }
      }
    }
  };

  // rendering nested components
  const renderComponent = (buttonInfo, nest) => {
    console.log("render component ", nest, buttonInfo);

    if (buttonInfo.type === "simple") {
      const lastIdx =
        typeof nest === "object" ? nest[0] : Number(nest.split(",").pop());
      console.log("inside simple ", buttonInfo, nest, lastIdx);
      return (
        <div className={classes["simple-container"]}>
          <p
            className={
              selectedEditArea === `0` && cursorIndex === lastIdx
                ? classes["cursor"]
                : selectedEditArea === `0` &&
                  cursorIndex === -1 &&
                  lastIdx === 0
                ? classes["cursor-1"]
                : ""
            }
          >
            {buttonInfo.name}
          </p>
        </div>
      );
    }

    if (buttonInfo.name === "Fraction") {
      console.log("inside fraction ", nest);
      let editAreaIndex;
      let cursorPointerIndex;
      if (typeof nest === "object") {
        editAreaIndex = "0";
        cursorPointerIndex = nest[0];
      } else {
        cursorPointerIndex = Number(
          nest.split(",")[nest.split(",").length - 1]
        );
        let lastIndex = nest.lastIndexOf(",");
        editAreaIndex = nest.substring(0, lastIndex);
        console.log(" last index ", nest, cursorPointerIndex, editAreaIndex);
        // editAreaIndex = 0;
      }
      return (
        <div
          className={`${classes["fraction-container"]} ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === cursorPointerIndex // && index === 0
              ? classes["cursor-1"]
              : ""
          } `}
        >
          <div className={classes["fraction-numerator"]}>
            <div
              className={`${
                buttonInfo?.value1?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              }  ${
                selectedEditArea === `${nest},n` &&
                classes["selected-edit-area"]
              } `}
              id={`${nest},n`}
              ref={editAreaRef}
              onClick={(e) => selectedEditAreaHandler(e, `${nest},n`)}
              //   contentEditable={true}
              //   onInput={(e) => handleChange(e, 0)}
            >
              {buttonInfo?.value1.map((value, index) => (
                <div>
                  {typeof value === "string" ? (
                    value === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      <p
                        className={
                          selectedEditArea === `${nest},n` &&
                          cursorIndex === index
                            ? classes["cursor"]
                            : selectedEditArea === `${nest},n` &&
                              cursorIndex === -1 &&
                              index === 0
                            ? classes["cursor-1"]
                            : ""
                        }
                      >
                        {value}
                      </p>
                    )
                  ) : (
                    <div>{renderComponent(value, `${nest},n,${index}`)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className={classes["fraction-denominator"]}>
            <div
              className={`
              ${
                buttonInfo?.value2?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              } 
               ${
                 selectedEditArea === `${nest},d` &&
                 classes["selected-edit-area"]
               } `}
              id={`${nest},d`}
              ref={editAreaRef}
              onClick={(e) => selectedEditAreaHandler(e, `${nest},d`)}
            >
              {buttonInfo?.value2.map((value, index) => (
                <div>
                  {typeof value === "string" ? (
                    value === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      <p
                        className={
                          selectedEditArea === `${nest},d` &&
                          cursorIndex === index
                            ? classes["cursor"]
                            : selectedEditArea === `${nest},d` &&
                              cursorIndex === -1 &&
                              index === 0
                            ? classes["cursor-1"]
                            : ""
                        }
                      >
                        {value}
                      </p>
                    )
                  ) : (
                    <div>{renderComponent(value, `${nest},d,${index}`)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Square Root") {
      let editAreaIndex;
      let cursorPointerIndex;
      if (typeof nest === "object") {
        editAreaIndex = "0";
        cursorPointerIndex = nest[0];
      } else {
        cursorPointerIndex = Number(
          nest.split(",")[nest.split(",").length - 1]
        );
        let lastIndex = nest.lastIndexOf(",");
        editAreaIndex = nest.substring(0, lastIndex);
        console.log(" last index ", nest, cursorPointerIndex, editAreaIndex);
        // editAreaIndex = 0;
      }
      return (
        <div
          className={` ${classes["square-root-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === `${nest},n` &&
                cursorIndex === cursorPointerIndex // && index === 0
              ? classes["cursor-1"]
              : ""
          }`}
        >
          {/* <div>&radic;</div> */}
          <span style={{ fontSize: "1.8rem" }}>&#8730;</span>
          <div
            className={`${
              buttonInfo?.value?.length > 0
                ? classes["edit-area"]
                : classes["edit-area-empty"]
            }  ${
              selectedEditArea === `${nest},v` && classes["selected-edit-area"]
            }  `}
            id={`${nest},v`}
            ref={editAreaRef}
            onClick={(e) => selectedEditAreaHandler(e, `${nest},v`)}
            //   contentEditable={true}
            //   onInput={(e) => handleChange(e, 0)}
          >
            {buttonInfo?.value.map((value, index) => (
              <div>
                {typeof value === "string" ? (
                  value === " " ? (
                    <span>&nbsp;</span>
                  ) : (
                    <p
                      className={
                        selectedEditArea === `${nest},v` &&
                        cursorIndex === index
                          ? classes["cursor"]
                          : selectedEditArea === `${nest},v` &&
                            cursorIndex === -1 &&
                            index === 0
                          ? classes["cursor-1"]
                          : ""
                      }
                    >
                      {value}
                    </p>
                  )
                ) : (
                  <div>{renderComponent(value, `${nest},v,${index}`)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Superscript") {
      let editAreaIndex;
      let cursorPointerIndex;
      if (typeof nest === "object") {
        editAreaIndex = "0";
        cursorPointerIndex = nest[0];
      } else {
        cursorPointerIndex = Number(
          nest.split(",")[nest.split(",").length - 1]
        );
        let lastIndex = nest.lastIndexOf(",");
        editAreaIndex = nest.substring(0, lastIndex);
        console.log(" last index ", nest, cursorPointerIndex, editAreaIndex);
        // editAreaIndex = 0;
      }
      return (
        <div
          className={` ${classes["superscript-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === -1 &&
                cursorPointerIndex === 0
              ? classes["cursor-1"]
              : ""
          }`}
        >
          <div
            className={`${
              buttonInfo?.value?.length > 0
                ? classes["edit-area"]
                : classes["edit-area-empty"]
            }  ${
              selectedEditArea === `${nest},v` && classes["selected-edit-area"]
            } `}
            id={`${nest},v`}
            ref={editAreaRef}
            onClick={(e) => selectedEditAreaHandler(e, `${nest},v`)}
            //   contentEditable={true}
            //   onInput={(e) => handleChange(e, 0)}
          >
            {buttonInfo?.value.map((value, index) => (
              <div>
                {typeof value === "string" ? (
                  value === " " ? (
                    <span>&nbsp;</span>
                  ) : (
                    <p
                      className={
                        selectedEditArea === `${nest},v` &&
                        cursorIndex === index
                          ? classes["cursor"]
                          : selectedEditArea === `${nest},v` &&
                            cursorIndex === -1 &&
                            index === 0
                          ? classes["cursor-1"]
                          : ""
                      }
                    >
                      {value}
                    </p>
                  )
                ) : (
                  <div>{renderComponent(value, `${nest},v,${index}`)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Subscript") {
      let editAreaIndex;
      let cursorPointerIndex;
      if (typeof nest === "object") {
        editAreaIndex = "0";
        cursorPointerIndex = nest[0];
      } else {
        cursorPointerIndex = Number(
          nest.split(",")[nest.split(",").length - 1]
        );
        let lastIndex = nest.lastIndexOf(",");
        editAreaIndex = nest.substring(0, lastIndex);
        console.log(" last index ", nest, cursorPointerIndex, editAreaIndex);
        // editAreaIndex = 0;
      }
      return (
        <div
          className={` ${classes["subscript-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === -1 &&
                cursorPointerIndex === 0
              ? classes["cursor-1"]
              : ""
          }`}
        >
          <div
            className={`${
              buttonInfo?.value?.length > 0
                ? classes["edit-area"]
                : classes["edit-area-empty"]
            }  ${
              selectedEditArea === `${nest},v` && classes["selected-edit-area"]
            } `}
            id={`${nest},v`}
            ref={editAreaRef}
            onClick={(e) => selectedEditAreaHandler(e, `${nest},v`)}
          >
            {buttonInfo?.value.map((value, index) => (
              <div>
                {typeof value === "string" ? (
                  value === " " ? (
                    <span>&nbsp;</span>
                  ) : (
                    <p
                      className={
                        selectedEditArea === `${nest},v` &&
                        cursorIndex === index
                          ? classes["cursor"]
                          : selectedEditArea === `${nest},v` &&
                            cursorIndex === -1 &&
                            index === 0
                          ? classes["cursor-1"]
                          : ""
                      }
                    >
                      {value}
                    </p>
                  )
                ) : (
                  <div>{renderComponent(value, `${nest},v,${index}`)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Integral") {
      let editAreaIndex;
      let cursorPointerIndex;
      if (typeof nest === "object") {
        editAreaIndex = "0";
        cursorPointerIndex = nest[0];
      } else {
        cursorPointerIndex = Number(
          nest.split(",")[nest.split(",").length - 1]
        );
        let lastIndex = nest.lastIndexOf(",");
        editAreaIndex = nest.substring(0, lastIndex);
        console.log(" last index ", nest, cursorPointerIndex, editAreaIndex);
        // editAreaIndex = 0;
      }
      return (
        <div
          className={` ${classes["integral-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === -1 &&
                cursorPointerIndex === 0
              ? classes["cursor-1"]
              : ""
          }`}
        >
          <div
            className={`${
              buttonInfo?.value?.length > 0
                ? classes["edit-area"]
                : classes["edit-area-empty"]
            }  ${
              selectedEditArea === `${nest},v` && classes["selected-edit-area"]
            } `}
            id={`${nest},v`}
            ref={editAreaRef}
            onClick={(e) => selectedEditAreaHandler(e, `${nest},v`)}
          >
            {buttonInfo?.value.map((value, index) => (
              <div>
                {typeof value === "string" ? (
                  value === " " ? (
                    <span>&nbsp;</span>
                  ) : (
                    <p
                      className={
                        selectedEditArea === `${nest},v` &&
                        cursorIndex === index
                          ? classes["cursor"]
                          : selectedEditArea === `${nest},v` &&
                            cursorIndex === -1 &&
                            index === 0
                          ? classes["cursor-1"]
                          : ""
                      }
                    >
                      {value}
                    </p>
                  )
                ) : (
                  <div>{renderComponent(value, `${nest},v,${index}`)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Matrix") {
      let editAreaIndex;
      let cursorPointerIndex;
      if (typeof nest === "object") {
        editAreaIndex = "0";
        cursorPointerIndex = nest[0];
      } else {
        cursorPointerIndex = Number(
          nest.split(",")[nest.split(",").length - 1]
        );
        let lastIndex = nest.lastIndexOf(",");
        editAreaIndex = nest.substring(0, lastIndex);
        console.log(" last index ", nest, cursorPointerIndex, editAreaIndex);
        // editAreaIndex = 0;
      }
      return (
        <div
          className={` ${classes["matrix-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === -1 &&
                cursorPointerIndex === 0
              ? classes["cursor-1"]
              : ""
          }`}
        >
          {[...Array(buttonInfo.row)].map((_, rowIndex) => (
            <div className={classes["matrix-row"]}>
              {[...Array(buttonInfo.column)].map((_, columnIndex) => (
                <div
                  className={`${classes["matrix-column"]} ${
                    buttonInfo?.value[
                      buttonInfo.column * rowIndex + columnIndex
                    ]?.length > 0
                      ? classes["edit-area"]
                      : classes["edit-area-empty"]
                  }  ${
                    selectedEditArea ===
                      `${nest},${buttonInfo.column * rowIndex + columnIndex}` &&
                    classes["selected-edit-area"]
                  } `}
                  id={`${nest},${buttonInfo.column * rowIndex + columnIndex}`}
                  ref={editAreaRef}
                  onClick={(e) =>
                    selectedEditAreaHandler(
                      e,
                      `${nest},${buttonInfo.column * rowIndex + columnIndex}`
                    )
                  }
                >
                  {
                    buttonInfo?.value[
                      buttonInfo.column * rowIndex + columnIndex
                    ]
                  }
                  {buttonInfo?.value[
                    buttonInfo.column * rowIndex + columnIndex
                  ].map((value, index) => (
                    <div>
                      {console.log("matrix value", value, buttonInfo)}

                      {typeof value === "string" ? (
                        value === " " ? (
                          <span>&nbsp;</span>
                        ) : (
                          <p
                            className={
                              selectedEditArea ===
                                `${nest},${
                                  buttonInfo.column * rowIndex + columnIndex
                                }` && cursorIndex === index
                                ? classes["cursor"]
                                : selectedEditArea ===
                                    `${nest},${
                                      buttonInfo.column * rowIndex + columnIndex
                                    }` &&
                                  cursorIndex === -1 &&
                                  index === 0
                                ? classes["cursor-1"]
                                : ""
                            }
                          >
                            {value}
                          </p>
                        )
                      ) : (
                        <div>
                          {renderComponent(
                            value,
                            `${nest},v,${
                              buttonInfo.column * rowIndex + columnIndex
                            },${index}`
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {console.log(
                    "buttonInfo?.value[ buttonInfo.column * rowIndex + columnIndex ]",
                    buttonInfo?.value[
                      buttonInfo.column * rowIndex + columnIndex
                    ]
                  )}
                  {/* {buttonInfo.column * rowIndex + columnIndex} */}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (buttonInfo.name === "ω") {
      return <div className={classes["simple-container"]}>ω</div>;
    }

    if (buttonInfo.name === "α") {
      return <div className={classes["simple-container"]}>α</div>;
    }
  };

  // convert our format to latex format
  const convertToLatex = (arr) => {
    let latex = "";

    console.log("equation uf convertedToLatex", arr);
    if (!arr) {
      return "";
    }
    arr.forEach((item) => {
      if (typeof item === "object") {
        if (Array.isArray(item)) {
          latex += `${item}`;
        } else if (item.type === "simple") {
          latex += `${item.latexFormat} `;
          //   if (item.name === "±") {
          //     latex += `\\pm `;
          //   }
          //   if (item.name === "ω") {
          //     latex += `\\omega `;
          //   }
        } else if (item.name === "Fraction") {
          latex += `\\frac{${convertToLatex(item.value1)}}{${convertToLatex(
            item.value2
          )}}`;
        } else if (item.name === "Square Root") {
          latex += `\\sqrt{${convertToLatex(item.value)}}`;
        } else if (item.name === "Superscript") {
          latex += `^{${convertToLatex(item.value)}}`;
        } else if (item.name === "Subscript") {
          latex += `_{${convertToLatex(item.value)}}`;
        } else if (item.name === "Integral") {
          latex += `\\int{${convertToLatex(item.value)}}`;
        } else if (item.name === "Matrix") {
          console.log("3710 ", item);
          let matrixLatexValue = `\\begin{pmatrix}`;
          for (let i = 0; i < item.row; i++) {
            for (let j = 0; j < item.column; j++) {
              if (j !== 0) {
                matrixLatexValue += " & ";
              }
              matrixLatexValue += `${convertToLatex(
                item.value[item.column * i + j]
              )}`;
            }
            matrixLatexValue += ` \\\\ `;
          }
          matrixLatexValue += ` \\end{pmatrix}`;
          // latex += `\\begin{pmatrix} 1 & 0 & 0 & 4 & 2_{s}^2 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1  \\\\ \\end{pmatrix}`;
          latex += matrixLatexValue;
        } else if (item.name === "Integral") {
          latex += `\\int{${convertToLatex(item.value)}}`;
        } else {
          // Handle other types of objects here
        }
      } else {
        console.log("equation uf convertedToLatex else ", item);
        latex += item;
      }
    });

    return latex;
  };

  // rendering mathml format in output div
  const renderEquation = (convertedLatex) => {
    try {
      const mathOutputDiv = document.getElementById("math-output");
      const html = katex.renderToString(convertedLatex, {
        output: "mathml", // "html"
        throwOnError: false,
        // displayMode: true,
      });
      console.log("rendered html ", html);
      // Clear contents of math-output div
      mathOutputDiv.innerHTML = "";
      // Render the equation
      katex.render(convertedLatex, mathOutputDiv, {
        output: "mathml",
        throwOnError: false,
        // maxExpand: 1000,
        // maxSize: 500,
        // minRuleThickness: 0.04,
        // displayMode: true,
      });
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
  };

  // modal close
  const hoverInfoModalCloseHandler = () => {
    setHoverDetailsModal(false);
  };

  const searchModalCloseHandler = () => {
    setSearchModal(false);
  };

  const matrixInputModalCloseHandler = () => {
    setMatrixInputModal(false);
  };

  const matrixInputsSubmitHandler = (e, rowsCount, columnsCount) => {
    e.preventDefault();
    console.log(
      "inside matrixInputsSubmitHandler ",
      buttonInfos.mathConstructs[5],
      rowsCount,
      columnsCount
    );
    panelButtonClicked(buttonInfos.mathConstructs[5], rowsCount, columnsCount);
    setMatrixInputModal(false);
  };

  // const svgRef = React.useRef(null);

  // const renderSVG = () => {
  //   const svgString = katex.renderToString(convertToLatex(equation), {
  //     throwOnError: false,
  //   });
  //   const svgElement = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "svg"
  //   );
  //   svgElement.innerHTML = svgString;
  //   return svgElement;
  // };

  // const saveAsWMF = () => {
  //   const svgElement = renderSVG();
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");

  //   let canvgObj = new Canvg();
  //   // canvg(canvas, new XMLSerializer().serializeToString(svgElement));
  //   canvgObj(canvas, new XMLSerializer().serializeToString(svgElement));
  //   console.log(" canvg ", canvgObj);

  //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //   const wmf = new WMF(imageData.width, imageData.height);
  //   wmf.drawImage(imageData.data, imageData.width, imageData.height);
  //   const wmfData = wmf.createBuffer();

  //   const blob = new Blob([wmfData], { type: "image/x-wmf" });
  //   const url = window.URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "equation.wmf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const equationRef = React.useRef(null);

  const renderEquation2 = () => {
    try {
      const options = {
        output: "mathml",
        throwOnError: false,
        // maxExpand: 1000,
        // maxSize: 500,
        // minRuleThickness: 0.04,
        // displayMode: true,
      };
      katex.render(convertToLatex(equation), equationRef.current, options);
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
  };

  const saveAsWMF = () => {
    renderEquation2();
    toPng(equationRef.current, { backgroundColor: "#fff" })
      .then((dataUrl) => {
        // Convert PNG to WMF (use a library or tool to accomplish this)
        // For demonstration purposes, we'll just save the PNG
        const blob = dataURItoBlob(dataUrl);
        saveAs(blob, "equation.png");
        let downloadElement = document.getElementById("final-equation-2");
        downloadElement.innerHTML = "";
      })
      .catch((error) => {
        console.error("Error converting HTML to image:", error);
      });
  };

  // Utility function to convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className={classes.main}>
      <div className={classes["header-container"]}>
        {/* <div>
          <div dangerouslySetInnerHTML={{ __html: renderEquation2() }} />
          <button onClick={saveAsWMF}>Save as WMF</button>
        </div> */}

        <div
          className={classes["search-container"]}
          title={"Search Symbols"}
          onClick={() => {
            setSearchModal(true);
          }}
        >
          <img src={searchIcon} width={"25rem"}></img>
        </div>
        <div
          className={classes["download-icon-container"]}
          title={"Download Equation"}
          onClick={() => {
            saveAsWMF();
          }}
        >
          <img src={cloudDownloadIcon} width={"25rem"}></img>
        </div>
        <div className={classes["panel-buttons-tabs"]}>
          {tabs.map((tab) => (
            <div
              className={`${classes["panel-buttons-tab"]} ${
                tabSelected === tab.name &&
                classes["panel-buttons-tab-selected"]
              } panel-tab`}
              onClick={() => tabSelectHandler(tab.name)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className={classes["panel-buttons-container"]}>
          {/* {panelButtons?.length ? panelButtons.length : panelButtons + "sss"} */}
          {panelButtons.map((buttonInfo, index) => (
            <button
              onClick={() => panelButtonClicked({ ...deepClone(buttonInfo) })}
              onMouseOver={() => {
                setHoverButtonInfo(buttonInfo);
                // setTimeout(() => {
                setHoverDetailsModal(true);
                // }, [400]);
                // setHoverDetailsModal(true);
              }}
              onMouseLeave={() => {
                // setTimeout(() => {
                if (hoverDetailsModal) {
                  hoverInfoModalCloseHandler();
                }
                // }, [400]);
                // setHoverDetailsModal(true);

                // setHoverDetailsModal(false);
              }}
              className={`panel-button-ref ${classes["panel-button"]}`}
            >
              {buttonInfo.name}
            </button>
          ))}
        </div>
      </div>
      <div className={classes["main-container"]}>
        <div
          className={`${classes["edit-area-main"]} ${
            selectedEditArea === "0" && classes["selected-edit-area"]
          } `}
          id="0"
          ref={editAreaRef}
          onClick={(e) => selectedEditAreaHandler(e, "0", [])}
        >
          {equation.map((value, index) => (
            <div>
              {console.log("equation value ", value)}
              {typeof value === "string" ? (
                value === " " ? (
                  <span
                    className={
                      selectedEditArea === "0" && cursorIndex === index
                        ? classes["cursor"]
                        : selectedEditArea === "0" &&
                          cursorIndex === -1 &&
                          index === 0
                        ? classes["cursor-1"]
                        : ""
                    }
                  >
                    &nbsp;
                  </span>
                ) : (
                  <p
                    className={
                      selectedEditArea === "0" && cursorIndex === index
                        ? classes["cursor"]
                        : selectedEditArea === "0" &&
                          cursorIndex === -1 &&
                          index === 0
                        ? classes["cursor-1"]
                        : ""
                    }
                  >
                    {value}
                  </p>
                )
              ) : (
                <div>{renderComponent(value, [index], index, cursorIndex)}</div>
              )}
            </div>
          ))}
        </div>

        <div className={classes["latex-output"]}>
          <h3>Latex Format Output</h3>
          <div className={classes["latex-equation"]}>
            {convertToLatex(equation)}
          </div>
        </div>

        <div className={classes["final-output"]}>
          <h3>Final Equation</h3>
          <div
            id="math-output"
            // ref={equationRef}
            className={classes["final-equation"]}
          ></div>
        </div>
      </div>
      <div className={classes["footer-container"]}>
        {
          <div
            className={classes["final-equation2"]}
            ref={equationRef}
            id={"final-equation-2"}
          />
        }
      </div>

      {hoverDetailsModal && <HoverDetailsModal buttonInfo={hoverButtonInfo} />}
      {searchModal && (
        <SearchModal
          closeSearchModal={searchModalCloseHandler}
          panelButtonClicked={panelButtonClicked}
          selectedEditArea={selectedEditArea}
          cursorIndex={cursorIndex}
        />
      )}

      {matrixInputModal && (
        <MatrixInputModal
          closeSearchModal={matrixInputModalCloseHandler}
          matrixSubmitHandler={matrixInputsSubmitHandler}
        />
      )}
    </div>
  );
};

export default MathEquationEditorOutput;
