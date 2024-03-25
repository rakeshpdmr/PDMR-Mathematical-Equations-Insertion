import React, { useState, useRef, useEffect, Component } from "react";
import { convertLatexToMathMl } from "mathlive";

import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import classes from "./MathEquationEditorOutput.module.css";
import HoverDetailsModal from "../UI/Modal/HoverDetailsModal/HoverDetailsModal";
import MatrixInputModal from "../UI/Modal/MatrixInputModal/MatrixInputModal";
import SearchModal from "../UI/Modal/SearchModal/SearchModal";
import searchIcon from "../../Assets/search.png";
import fractionIcon from "../../Assets/buttonImages/fraction.png";
import integralIcon from "../../Assets/buttonImages/integral.png";
import oversetIcon from "../../Assets/buttonImages/overset.png";
import oversetUndersetIcon from "../../Assets/buttonImages/overset-underset.png";
import undersetIcon from "../../Assets/buttonImages/underset.png";
import squareRootIcon from "../../Assets/buttonImages/squareroot.png";
import subscriptIcon from "../../Assets/buttonImages/subscript.png";
import superscriptIcon from "../../Assets/buttonImages/superscript.png";
import matrixIcon from "../../Assets/buttonImages/matrix.png";
import pmatrixIcon from "../../Assets/buttonImages/pmatrix.png";
import vectorIcon from "../../Assets/buttonImages/vector.png";
import hatIcon from "../../Assets/buttonImages/hat.png";
// import { mathjax } from "mathjax-full/js/mathjax";
// import { TeX } from "mathjax-full/js/input/tex";
// import { SVG } from "mathjax-full/js/output/svg";
// import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor";
// import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";
// import { mathjax } from "mathjax-full/es5/mathjax";
// import { TeX } from "mathjax-full/es5/input/tex";
// import { SVG } from "mathjax-full/es5/output/svg";
// import { liteAdaptor } from "mathjax-full/es5/adaptors/liteAdaptor";
// import { RegisterHTMLHandler } from "mathjax-full/es5/handlers/html";

import cloudDownloadIcon from "../../Assets/cloud-download.png";
import katex from "katex";
import buttonInfos from "../Infos/buttonInfos.json";
import { SelectInput } from "../UI/Input/InputItem";

export const MathEquationEditorOutput = () => {
  // modal
  const [hoverDetailsModal, setHoverDetailsModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [matrixInputModal, setMatrixInputModal] = useState(false);

  const [hoverButtonInfo, setHoverButtonInfo] = useState({});

  const buttonImages = {
    fractionIcon,
    integralIcon,
    oversetIcon,
    oversetUndersetIcon,
    undersetIcon,
    squareRootIcon,
    subscriptIcon,
    superscriptIcon,
    matrixIcon,
    pmatrixIcon,
    vectorIcon,
    hatIcon,
  };

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
  const [clickedPanelButton, setClickedPanelButton] = useState("");
  const [equation, setEquation] = useState([]);
  const editAreaRef = useRef(null);
  const [lengthOfSelectedArea, setLengthOfSelectedArea] = useState(0);
  const [cursorIndex, setCursorIndex] = useState(0);

  // final equation
  const [htmlLang, setHtmlLang] = useState("");
  const [mathmlLang, setMathmlLang] = useState("");
  const [displayMode, setDisplayMode] = useState(false);
  const [outputType, setOutputType] = useState("math");
  const [xmlMode, setXmlMode] = useState(false);

  //undo
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  // console Use Effects

  useEffect(() => {
    console.log(" changed displayMode ", displayMode);
    console.log(" changed outputType ", outputType);
  }, [displayMode, outputType]);
  useEffect(() => {
    console.log(" cursor lengthOfSelectedArea ", lengthOfSelectedArea);
    console.log(" cursor cursor index ", cursorIndex);
    console.log("cursor selectedEditArea ", selectedEditArea);
  }, [lengthOfSelectedArea, cursorIndex]);

  useEffect(() => {
    console.log("history changed ", history);
  }, [history]);

  // useEffect(() => {
  //   console.log("equation uf  changed ", equation);
  // }, [equation]);

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
    } else if (lastIdx === "ov") {
      setLengthOfSelectedArea(targetArray?.value1?.length);
      setCursorIndex(targetArray?.value1?.length - 1);
    } else if (lastIdx === "uv") {
      setLengthOfSelectedArea(targetArray?.value2?.length);
      setCursorIndex(targetArray?.value2?.length - 1);
    } else {
      if (targetArray.name === "Matrix") {
        setLengthOfSelectedArea(targetArray?.value[lastIdx]?.length);
        setCursorIndex(targetArray?.value[lastIdx]?.length - 1);
      } else if (targetArray.name === "Vector Matrix") {
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
    console.log(" equation uf ", equation);
    let splittedIndexes = selectedEditArea.split(",");
    const copy = [...equation];
    const lastIdx = splittedIndexes.pop();
    const targetArray = getValueAtIndex(copy, splittedIndexes);
    setLengthOfSelectedArea(targetArray.length);
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
        event.key,
        "check ",
        editAreaRef.current,
        !editAreaRef?.current?.contains(event.target),
        event.target.className !== "",
        !event.target.className.includes("panel-button-ref"),
        event.target.className !== "panel-button",
        !event.target.className.includes("panel-tab"),
        event.target.className.includes("MathEquationEditorOutput"),
        "sss",
        editAreaRef.current &&
          !editAreaRef.current.contains(event.target) &&
          event.target.className !== "" &&
          !event.target.className.includes("panel-button-ref") &&
          event.target.className !== "panel-button" &&
          !event.target.className.includes("panel-tab") &&
          event.target.className.includes("MathEquationEditorOutput")
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
      if (event.ctrlKey && (event.key === "z" || event.key === "Z")) {
        event.preventDefault();
        handleUndo(equation, history);
      }
      if (event.ctrlKey && (event.key === "y" || event.key === "Y")) {
        event.preventDefault();
        handleRedo(equation, redoHistory);
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
  }, [
    selectedEditArea,
    cursorIndex,
    lengthOfSelectedArea,
    searchModal,
    equation,
    history,
    redoHistory,
  ]);

  // equation change use effect handler
  useEffect(() => {
    const result = convertToLatex(equation);
    console.log("equation uf after converted", result);
    // rendering mathml format in output div
    const renderEquation = (convertedLatex) => {
      try {
        console.log("mathlive converter", convertLatexToMathMl(convertedLatex));
        if (outputType === "math") {
          const mathOutputDiv = document.getElementById("math-output");
          // Clear contents of math-output div
          mathOutputDiv.innerHTML = "";
          // Render the equation
          katex.render(convertedLatex, mathOutputDiv, {
            output: "mathml",
            throwOnError: false,
            // maxExpand: 1000,
            // maxSize: 500,
            // minRuleThickness: 0.04,
            displayMode: displayMode,
          });
          // katex.render(convertedLatex, mathOutputDiv, {
          //   displayMode: true,
          //   leqno: false,
          //   fleqn: false,
          //   throwOnError: true,
          //   errorColor: "#cc0000",
          //   strict: "warn",
          //   output: "htmlAndMathml",
          //   trust: false,
          //   macros: { "\\f": "#1f(#2)" },
          // });
        } else if (outputType === "html") {
          const htmlString = katex.renderToString(convertedLatex, {
            output: "html",
            throwOnError: false,
            displayMode: displayMode,
          });
          setHtmlLang(htmlString);
        } else if (outputType === "mathml") {
          const mathmlString = katex.renderToString(
            convertedLatex,
            // {
            //   displayMode: true,
            //   leqno: false,
            //   fleqn: false,
            //   throwOnError: true,
            //   errorColor: "#cc0000",
            //   strict: "warn",
            //   output: "htmlAndMathml",
            //   trust: false,
            //   macros: { "\\f": "#1f(#2)" },
            // }

            {
              // output: "htmlAndMathml",
              output: "mathml",
              throwOnError: false,
              displayMode: displayMode,
            }
          );
          setMathmlLang(mathmlString);
        }
        // const html = katex.renderToString(convertedLatex, {
        //   output: "mathml", // "html"
        //   throwOnError: false,
        //   displayMode: displayMode,
        // });

        // console.log("rendered html ", htmlString);
        // console.log("rendered mathml ", mathmlString);

        console.log(
          "inside render equation function ",
          displayMode,
          outputType
        );
      } catch (error) {
        console.error("Error rendering LaTeX:", error);
      }
    };

    renderEquation(result);
  }, [equation, outputType, displayMode]);

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
    handleChange(deepClone(equation));
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

        console.log("history changed");
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
        // handleChange(deepClone(copy));
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
        // handleChange(deepClone(copy));
      } else if (lastIdx === "ov") {
        if (value === "Backspace") {
          // targetArray?.value?.pop();
          targetArray?.value1?.splice(cursorIndex, 1);
          // minus
          setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
        } else {
          // targetArray.value = [
          //   ...targetArray.value,
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
        console.log("copy before setting");
        setEquation(copy);
        // handleChange(deepClone(copy));
      } else if (lastIdx === "uv") {
        if (value === "Backspace") {
          // targetArray?.value?.pop();
          targetArray?.value2?.splice(cursorIndex, 1);
          // minus
          setCursorIndex((prev) => (prev === -1 ? -1 : prev - 1)); // changed from 0 ? 0
        } else {
          // targetArray.value = [
          //   ...targetArray.value,
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
        console.log("copy before setting");
        setEquation(copy);
        // handleChange(deepClone(copy));
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
        // handleChange(deepClone(copy));
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
      // handleChange(deepClone(copy));
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
        handleChange(deepClone(equation));
        let finalValue = [...equation];
        finalValue.splice(cursorIndex + 1, 0, event.key);
        setEquation((prev) => {
          finalValue = [...prev];
          finalValue.splice(cursorIndex + 1, 0, event.key);

          return finalValue;
        });
        // handleChange(deepClone(finalValue), " 449 ");
        console.log(" history change 449 ", finalValue);
        // plus
        setCursorIndex((prev) => prev + 1);
      } else {
        updateValueAtIndex(splittedIndexes, event.key);
      }
    } else if (selectedEditArea !== "" && event.code === "Space") {
      if (selectedEditArea === "0") {
        // setEquation((prev) => [...prev, " "]);
        handleChange(deepClone(equation));
        let finalValue = [...equation];
        finalValue.splice(cursorIndex + 1, 0, " ");

        setEquation((prev) => {
          let finalValue = [...prev];
          finalValue.splice(cursorIndex + 1, 0, " ");

          return finalValue;
        });
        // handleChange(deepClone(finalValue));

        // plus
        setCursorIndex((prev) => prev + 1);
      } else {
        updateValueAtIndex(splittedIndexes, event.key);
      }
    } else if (selectedEditArea !== "" && event.key === "Backspace") {
      console.log("backspace selected edited ", selectedEditArea);
      if (selectedEditArea === "0") {
        handleChange(deepClone(equation));
        let final = [...equation];
        final?.splice(cursorIndex, 1);
        setEquation((prev) => {
          let final = [...prev];
          final?.splice(cursorIndex, 1);
          // final.pop();

          return final;
        });
        console.log("final value backspace ", final);
        // handleChange(deepClone(final));
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
    setClickedPanelButton(buttonInfo.name);
    if (
      (buttonInfo.name === "Matrix" || buttonInfo.name === "Vector Matrix") &&
      rowsCount === undefined &&
      columnsCount === undefined
    ) {
      setMatrixInputModal(true);
      return;
    } else if (
      (buttonInfo.name === "Matrix" || buttonInfo.name === "Vector Matrix") &&
      rowsCount &&
      columnsCount
    ) {
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
      " inside updateValueAtIndex target array 101 ",
      selectedEditArea,
      buttonInfo,
      splittedIndexes,
      targetArray,
      lastIdx
    );
    console.log("target arrau ", targetArray, lastIdx, splittedIndexes);

    if (selectedEditArea !== "") {
      handleChange(deepClone(equation));
      // if (!Array.isArray(targetArray)) {
      if (lastIdx === "n") {
        // targetArray.value1.push({ ...buttonInfo, value1: [] });
        targetArray.value1.splice(cursorIndex + 1, 0, {
          ...buttonInfo,
          value1: [],
        });

        console.log("copy before setting", copy);
        setEquation(copy);
        // handleChange(deepClone(copy));

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
        // handleChange(deepClone(copy));

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
          // handleChange(deepClone(copy));

          // plus
          setCursorIndex((prev) => prev + 1);
        } catch (error) {
          console.log("error was ", error);
        }
      } else if (lastIdx === "ov") {
        try {
          // targetArray.value.push({ ...buttonInfo, value: [] });
          targetArray.value1.splice(cursorIndex + 1, 0, {
            ...buttonInfo,
            value: [],
          });

          console.log("copy before setting", copy);
          setEquation(copy);
          // handleChange(deepClone(copy));

          // plus
          setCursorIndex((prev) => prev + 1);
        } catch (error) {
          console.log("error was ", error);
        }
      } else if (lastIdx === "uv") {
        try {
          // targetArray.value.push({ ...buttonInfo, value: [] });
          targetArray.value2.splice(cursorIndex + 1, 0, {
            ...buttonInfo,
            value: [],
          });

          console.log("copy before setting", copy);
          setEquation(copy);
          // handleChange(deepClone(copy));

          // plus
          setCursorIndex((prev) => prev + 1);
        } catch (error) {
          console.log("error was ", error);
        }
      } else {
        if (
          targetArray.name === "Matrix" ||
          targetArray.name === "Vector Matrix"
        ) {
          try {
            targetArray.value[lastIdx]?.splice(cursorIndex + 1, 0, {
              ...buttonInfo,
              // value: [],
            });

            console.log("copy before setting", copy);
            setEquation(copy);
            // handleChange(deepClone(copy));

            // plus
            setCursorIndex((prev) => prev + 1);
          } catch (error) {
            console.log("error was ", error);
          }
        } else {
          // setEquation((prev) => [...prev, { ...buttonInfo, value: [] }]);
          let finalValue = [...equation];
          finalValue.splice(cursorIndex + 1, 0, {
            ...buttonInfo,
            // value: [],
          });
          setEquation((prev) => {
            console.log("3101");
            // return prev;
            let finalValue = [...prev];
            // finalValue.splice(cursorIndex + 1, 0, { ...buttonInfo, value: [] });

            finalValue.splice(cursorIndex + 1, 0, {
              ...buttonInfo,
              // value: [],
            });

            return finalValue;
          });

          // handleChange(deepClone(finalValue));

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

    if (buttonInfo.name === "Overset") {
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
          <div className={classes["overset-container"]}>
            <div
              className={`${
                buttonInfo?.value1?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              }  ${
                selectedEditArea === `${nest},ov` &&
                classes["selected-edit-area"]
              } `}
              id={`${nest},ov`}
              ref={editAreaRef}
              onClick={(e) => selectedEditAreaHandler(e, `${nest},ov`)}
            >
              {buttonInfo?.value1.map((value, index) => (
                <div>
                  {typeof value === "string" ? (
                    value === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      <p
                        className={
                          selectedEditArea === `${nest},ov` &&
                          cursorIndex === index
                            ? classes["cursor"]
                            : selectedEditArea === `${nest},ov` &&
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
                    <div>{renderComponent(value, `${nest},ov,${index}`)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={classes["fraction-denominator"]}>
            <div
              className={`
              ${
                buttonInfo?.value?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              } 
               ${
                 selectedEditArea === `${nest},v` &&
                 classes["selected-edit-area"]
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
        </div>
      );
    }

    if (buttonInfo.name === "Overset and Underset") {
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
          <div className={classes["overset-container"]}>
            <div
              className={`${
                buttonInfo?.value1?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              }  ${
                selectedEditArea === `${nest},ov` &&
                classes["selected-edit-area"]
              } `}
              id={`${nest},ov`}
              ref={editAreaRef}
              onClick={(e) => selectedEditAreaHandler(e, `${nest},ov`)}
            >
              {buttonInfo?.value1.map((value, index) => (
                <div>
                  {typeof value === "string" ? (
                    value === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      <p
                        className={
                          selectedEditArea === `${nest},ov` &&
                          cursorIndex === index
                            ? classes["cursor"]
                            : selectedEditArea === `${nest},ov` &&
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
                    <div>{renderComponent(value, `${nest},ov,${index}`)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={classes["fraction-denominator"]}>
            <div
              className={`
              ${
                buttonInfo?.value?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              } 
               ${
                 selectedEditArea === `${nest},v` &&
                 classes["selected-edit-area"]
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
          <div className={classes["underset-container"]}>
            <div
              className={`${
                buttonInfo?.value2?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              }  ${
                selectedEditArea === `${nest},uv` &&
                classes["selected-edit-area"]
              } `}
              id={`${nest},uv`}
              ref={editAreaRef}
              onClick={(e) => selectedEditAreaHandler(e, `${nest},uv`)}
            >
              {buttonInfo?.value2.map((value, index) => (
                <div>
                  {typeof value === "string" ? (
                    value === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      <p
                        className={
                          selectedEditArea === `${nest},uv` &&
                          cursorIndex === index
                            ? classes["cursor"]
                            : selectedEditArea === `${nest},uv` &&
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
                    <div>{renderComponent(value, `${nest},uv,${index}`)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Underset") {
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
          <div className={classes["fraction-denominator"]}>
            <div
              className={`
              ${
                buttonInfo?.value?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              } 
               ${
                 selectedEditArea === `${nest},v` &&
                 classes["selected-edit-area"]
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
          <div className={classes["underset-container"]}>
            <div
              className={`${
                buttonInfo?.value2?.length > 0
                  ? classes["edit-area"]
                  : classes["edit-area-empty"]
              }  ${
                selectedEditArea === `${nest},uv` &&
                classes["selected-edit-area"]
              } `}
              id={`${nest},uv`}
              ref={editAreaRef}
              onClick={(e) => selectedEditAreaHandler(e, `${nest},uv`)}
            >
              {buttonInfo?.value2.map((value, index) => (
                <div>
                  {typeof value === "string" ? (
                    value === " " ? (
                      <span>&nbsp;</span>
                    ) : (
                      <p
                        className={
                          selectedEditArea === `${nest},uv` &&
                          cursorIndex === index
                            ? classes["cursor"]
                            : selectedEditArea === `${nest},uv` &&
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
                    <div>{renderComponent(value, `${nest},uv,${index}`)}</div>
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
      }
      return (
        <div
          className={` ${classes["square-root-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === `${nest},n` &&
                cursorIndex === cursorPointerIndex
              ? classes["cursor-1"]
              : ""
          }`}
        >
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
          <span style={{ fontSize: "3rem" }}>&int;</span>
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
          {/* using flex */}
          {/* {[...Array(buttonInfo.row)].map((_, rowIndex) => (
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
                </div>
              ))}
            </div>
          ))} */}

          <div
            className={classes["matrix-cells-container"]}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${buttonInfo.column} , 1fr)`,
              gridTemplateRows: `repeat(${buttonInfo.row} , 1fr)`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {console.log(" matrix cells ", buttonInfo)}
            {[...Array(buttonInfo.row * buttonInfo.column)].map(
              (_, cellIndex) => (
                <div className={classes["matrix-cell"]}>
                  {/* {[...Array(buttonInfo.column)].map((_, columnIndex) => ( */}
                  {(() => {
                    console.log(
                      "1250 before ",
                      document.getElementById(`${nest},${cellIndex}`)
                        ?.textContent
                    );
                    // let element = document.getElementById(
                    //   `${nest},${cellIndex}`
                    // );
                    // if (element) {
                    //   element.textContent = "";
                    // }
                  })()}
                  <div
                    className={`${classes["matrix-cell"]} ${
                      buttonInfo?.value[cellIndex]?.length > 0
                        ? classes["edit-area"]
                        : classes["edit-area-empty"]
                    }  ${
                      selectedEditArea === `${nest},${cellIndex}` &&
                      classes["selected-edit-area"]
                    } `}
                    id={`${nest},${cellIndex}`}
                    ref={editAreaRef}
                    onClick={(e) =>
                      selectedEditAreaHandler(e, `${nest},${cellIndex}`)
                    }
                  >
                    {/* {buttonInfo?.value[cellIndex]} */}
                    {buttonInfo?.value[cellIndex].map((value, index) => (
                      <div>
                        {typeof value === "string" ? (
                          value === " " ? (
                            <span>&nbsp;</span>
                          ) : (
                            <p
                              className={
                                selectedEditArea === `${nest},${cellIndex}` &&
                                cursorIndex === index
                                  ? classes["cursor"]
                                  : selectedEditArea ===
                                      `${nest},${cellIndex}` &&
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
                              `${nest},v,${cellIndex},${index}`
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* ))} */}
                </div>
              )
            )}
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Vector Matrix") {
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
          {/* using flex */}
          {/* {[...Array(buttonInfo.row)].map((_, rowIndex) => (
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
                </div>
              ))}
            </div>
          ))} */}

          <div
            className={classes["matrix-cells-container"]}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${buttonInfo.column} , 1fr)`,
              gridTemplateRows: `repeat(${buttonInfo.row} , 1fr)`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {console.log(" matrix cells ", buttonInfo)}
            {[...Array(buttonInfo.row * buttonInfo.column)].map(
              (_, cellIndex) => (
                <div className={classes["matrix-cell"]}>
                  {/* {[...Array(buttonInfo.column)].map((_, columnIndex) => ( */}
                  {(() => {
                    console.log(
                      "1250 before ",
                      document.getElementById(`${nest},${cellIndex}`)
                        ?.textContent
                    );
                    // let element = document.getElementById(
                    //   `${nest},${cellIndex}`
                    // );
                    // if (element) {
                    //   element.textContent = "";
                    // }
                  })()}
                  <div
                    className={`${classes["matrix-cell"]} ${
                      buttonInfo?.value[cellIndex]?.length > 0
                        ? classes["edit-area"]
                        : classes["edit-area-empty"]
                    }  ${
                      selectedEditArea === `${nest},${cellIndex}` &&
                      classes["selected-edit-area"]
                    } `}
                    id={`${nest},${cellIndex}`}
                    ref={editAreaRef}
                    onClick={(e) =>
                      selectedEditAreaHandler(e, `${nest},${cellIndex}`)
                    }
                  >
                    {/* {buttonInfo?.value[cellIndex]} */}
                    {buttonInfo?.value[cellIndex].map((value, index) => (
                      <div>
                        {typeof value === "string" ? (
                          value === " " ? (
                            <span>&nbsp;</span>
                          ) : (
                            <p
                              className={
                                selectedEditArea === `${nest},${cellIndex}` &&
                                cursorIndex === index
                                  ? classes["cursor"]
                                  : selectedEditArea ===
                                      `${nest},${cellIndex}` &&
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
                              `${nest},v,${cellIndex},${index}`
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* ))} */}
                </div>
              )
            )}
          </div>
        </div>
      );
    }

    if (buttonInfo.name === "Vector") {
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
          className={` ${classes["vector-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === -1 &&
                cursorPointerIndex === 0
              ? classes["cursor-1"]
              : ""
          } `}
        >
          <div
            style={{ fontSize: "2rem" }}
            className={classes["top-container"]}
          >
            →
          </div>
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

    if (buttonInfo.name === "Hat") {
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
          className={` ${classes["vector-container"]}  ${
            selectedEditArea === editAreaIndex &&
            cursorIndex === cursorPointerIndex
              ? classes["cursor"]
              : selectedEditArea === editAreaIndex &&
                cursorIndex === -1 &&
                cursorPointerIndex === 0
              ? classes["cursor-1"]
              : ""
          } `}
        >
          {/* <span style={{ fontSize: "3rem" }}>&int;</span>{" "} */}
          <div
            style={{ fontSize: "2rem" }}
            className={classes["top-container"]}
          >
            ^
          </div>
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
  };

  // convert our format to latex format
  const convertToLatex = (arr) => {
    let latex = "";

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
        } else if (item.name === "Overset") {
          latex += `\\overset{${convertToLatex(item.value1)}}{{${convertToLatex(
            item.value
          )}}}`;
          // latex += `\\frac{${convertToLatex(item.value1)}}{${convertToLatex(
          //   item.value2
          // )}}`;
        } else if (item.name === "Overset and Underset") {
          latex += `\\overset{${convertToLatex(
            item.value1
          )}} {\\underset {${convertToLatex(item.value2)}}  {${convertToLatex(
            item.value
          )}}}`;
          // latex += `\\frac{${convertToLatex(item.value1)}}{${convertToLatex(
          //   item.value2
          // )}}`;
        } else if (item.name === "Underset") {
          latex += `\\underset {${convertToLatex(
            item.value2
          )}}  {{${convertToLatex(item.value)}}}`;
          // latex += `\\frac{${convertToLatex(item.value1)}}{${convertToLatex(
          //   item.value2
          // )}}`;
        } else if (item.name === "Square Root") {
          latex += `\\sqrt{${convertToLatex(item.value)}}`;
        } else if (item.name === "Superscript") {
          latex += `^{${convertToLatex(item.value)}}`;
        } else if (item.name === "Subscript") {
          latex += `_{${convertToLatex(item.value)}}`;
        } else if (item.name === "Vector") {
          latex += `\\vec{${convertToLatex(item.value)}}`;
        } else if (item.name === "Hat") {
          latex += `\\hat{${convertToLatex(item.value)}}`;
        } else if (item.name === "Integral") {
          latex += `\\int{${convertToLatex(item.value)}}`;
        } else if (item.name === "Matrix") {
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
        } else if (item.name === "Vector Matrix") {
          let matrixLatexValue = `\\begin{vmatrix}`;

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
          matrixLatexValue += ` \\end{vmatrix}`;
          // latex += `\\begin{pmatrix} 1 & 0 & 0 & 4 & 2_{s}^2 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1  \\\\ \\end{pmatrix}`;
          latex += matrixLatexValue;
        } else if (item.name === "Integral") {
          latex += `\\int{${convertToLatex(item.value)}}`;
        } else {
          // Handle other types of objects here
        }
      } else {
        latex += item;
      }
    });

    return latex;
  };

  // const downloadInWmfFile = async () => {
  //   const latexEquation = convertToLatex(equation);
  //   console.log("inside downloadInWmfFile ", latexEquation);
  //   const formData = new FormData();
  //   formData.append("file", latexEquation);

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/convert/blob-to-wmf",
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to convert Latex to WMF");
  //     }

  //     const wmfBlob = await response.blob();
  //     const url = URL.createObjectURL(wmfBlob);

  //     // Create a link to download the WMF file
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "converted_equation.wmf";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.error("Error converting Latex to WMF:", error);
  //   }
  // };

  // modal close
  const downloadInWmfFile = async () => {
    const latexEquation = convertToLatex(equation); // Assuming this function converts the equation to LaTeX format
    console.log("inside downloadInWmfFile ", latexEquation);

    try {
      const response = await fetch(
        "http://localhost:8000/convert/latex-to-wmf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify({ latexEquation }), // Send the LaTeX equation as JSON data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to convert Latex to WMF");
      }

      const wmfBlob = await response.blob();
      const url = URL.createObjectURL(wmfBlob);

      // Create a link to download the WMF file
      const a = document.createElement("a");
      a.href = url;
      a.download = "equation.wmf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error converting Latex to WMF:", error);
    }
  };

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
      clickedPanelButton,
      buttonInfos.mathConstructs[8],
      rowsCount,
      columnsCount
    );
    if (clickedPanelButton === "Matrix") {
      panelButtonClicked(
        buttonInfos.mathConstructs[8],
        rowsCount,
        columnsCount
      );
    } else if (clickedPanelButton === "Vector Matrix") {
      panelButtonClicked(
        buttonInfos.mathConstructs[9],
        rowsCount,
        columnsCount
      );
    }
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
    downloadInWmfFile();
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

  const handleChange = (value, line) => {
    console.log(" history changed inside handle change ", value, line);
    // Update history with the new text
    setHistory((prevHistory) => [...prevHistory, value]);

    // Clear redo history whenever new text is entered
    setRedoHistory([]);
  };

  const handleUndo = (equation, history) => {
    if (history.length > 0) {
      // Get the last text state from history
      const lastTextState = history[history.length - 1];
      const currentEquation = equation;
      console.log("lastTextState ", lastTextState, history);
      // setEquation([]);
      // Set the text state to the last state
      setEquation(lastTextState);

      // Remove the last state from history
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      // Add the current text to redo history
      setRedoHistory((prevRedoHistory) => [
        ...prevRedoHistory,
        currentEquation,
      ]);
    } else {
      setEquation([]);
    }
  };

  const handleRedo = (equation, redoHistory) => {
    if (redoHistory.length > 0) {
      // Get the last text state from redo history
      const nextTextState = redoHistory[redoHistory.length - 1];
      const currentEquation = equation;
      // Set the text state to the next state
      setEquation(nextTextState);
      //
      // Remove the last state from redo history
      setRedoHistory((prevRedoHistory) => prevRedoHistory.slice(0, -1));
      // Add the current text to undo history
      setHistory((prevUndoHistory) => [...prevUndoHistory, currentEquation]);
    }
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
              className={`panel-button-ref ${classes["panel-button"]} ${
                buttonInfo.image && classes["image-button"]
              }`}
            >
              {console.log("  buttonInfo.image ", buttonInfo.image, buttonInfo)}
              {buttonInfo.image ? (
                <img
                  src={buttonImages[buttonInfo.image]}
                  width="20px"
                  height="20px"
                ></img>
              ) : (
                buttonInfo.name
              )}
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
          <h4>Latex Format Output</h4>
          <div className={classes["latex-equation"]}>
            {convertToLatex(equation)}
          </div>
        </div>

        <div className={classes["final-output"]}>
          <div className={classes["final-output-header"]}>
            <h4>Final Equation </h4>
            <div className={classes["final-output-inputs"]}>
              <div>
                <input
                  type="checkbox"
                  // checked={displayMode}
                  onChange={() => setDisplayMode((prev) => !prev)}
                ></input>
                <label>Display Mode</label>
              </div>
              <div className={classes["us-form"]}>
                <select
                  name="Output Type"
                  id="output-type"
                  onChange={(e) => {
                    console.log(" select input  clicked ", e.target.value);
                    setOutputType(e.target.value);
                  }}
                >
                  <option value="math">Math</option>
                  <option value="mathml">MathML</option>
                  <option value="html">Html</option>
                </select>
              </div>
            </div>
          </div>
          {outputType === "math" ? (
            <div
              id="math-output"
              // ref={equationRef}
              className={classes["final-equation"]}
            ></div>
          ) : //   math
          // </div>
          outputType === "html" ? (
            <div
              className={` ${classes["final-equation"]} ${classes["final-equation-html"]}  `}
            >
              {htmlLang}
            </div>
          ) : (
            <div
              className={` ${classes["final-equation"]} ${classes["final-equation-mathml"]}  `}
            >
              {mathmlLang}
            </div>
          )}

          {/* <div
            id="math-output"
            // ref={equationRef}
            className={classes["final-equation"]}
          ></div> */}
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

      {hoverDetailsModal && (
        <HoverDetailsModal
          buttonInfo={hoverButtonInfo}
          buttonImages={buttonImages}
        />
      )}
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
          clickedPanelButton={clickedPanelButton}
        />
      )}
    </div>
  );
};

export default MathEquationEditorOutput;
