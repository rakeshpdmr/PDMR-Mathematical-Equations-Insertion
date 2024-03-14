import React, { useRef, useEffect, useState } from "react";
import katex from "katex";
import MathEquationEditorOutput from "./MathEquationEditorOutput";

// using mathquill library
// const EquationEditor = () => {
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (window.MathQuill) {
//       const mathField = MathQuill.getInterface(2).MathField(inputRef.current);
//       // Optionally, you can save `mathField` in a state if you need to manipulate it later.
//     } else {
//       console.error("MathQuill not loaded");
//     }
//   }, []);

//   const insertEquation = () => {
//     const equation = inputRef.current.value;
//     const mathField = window.MathQuill.getInterface(2).MathField(
//       inputRef.current
//     );

//     console.log("math field ", mathField);
//     if (!equation) return;

//     // You can also perform the insertion directly here if needed
//     // const mathField = window.MathQuill.getInterface(2).MathField(inputRef.current);
//     // mathField.write(equation);
//   };

//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button onClick={insertEquation}>Insert Equation</button>
//       <div id="math-input"></div>
//     </div>
//   );
// };

// working version one
// const EquationEditor = () => {
//   const inputRef = useRef(null);

//   const insertEquation = () => {
//     const equation = inputRef.current.value;
//     if (!equation) return;

//     const outputDiv = document.getElementById("math-output");
//     try {
//       let result = katex.render("c = \\pm\\sqrt{a^2 + b^2}", outputDiv, {
//         throwOnError: false,
//       });
//       //       var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
//       //         throwOnError: false,
//       //       });
//       var html = katex.renderToString("c = \\pm\\sqrt{a^2 + b^2}", {
//         throwOnError: false,
//       });
//       console.log("result of katex render html ", html);
//     } catch (error) {
//       console.error("Error rendering LaTeX:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button onClick={insertEquation}>Insert Equation</button>
//       <div id="math-output"></div>
//     </div>
//   );
// };

// working version two
// const EquationEditor = () => {
//   const inputRef = useRef(null);

//   const insertSquareRoot = () => {
//     const value = inputRef.current.value;
//     const equation = `\\sqrt{${value}}`;

//     renderEquation(equation);
//   };

//   const renderEquation = (equation) => {
//     const outputDiv = document.getElementById("math-output");
//     try {
//       katex.render(equation, outputDiv, { throwOnError: false });
//     } catch (error) {
//       console.error("Error rendering LaTeX:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div>
//           <div>
//             <button onClick={insertSquareRoot}>Square Root</button>
//           </div>

//           <div>
//             <button onClick={insertSquareRoot}>Square Root</button>
//           </div>

//           <div>
//             <button onClick={insertSquareRoot}>Square Root</button>
//           </div>
//         </div>

//         <input type="text" ref={inputRef} />
//       </div>
//       <div id="math-output"></div>
//     </div>
//   );
// };

// working version three
// const EquationEditor = () => {
//   const inputRef = useRef(null);
//   const [selectedText, setSelectedText] = useState("");

//   // Function to get selected text
//   const getSelectedText = () => {
//     const input = inputRef.current;
//     if (!input) return;

//     const startPos = input.selectionStart;
//     const endPos = input.selectionEnd;
//     const text = input.value.substring(startPos, endPos);
//     setSelectedText(text);
//     console.log("selected text ", text);
//   };

//   // Function to apply square root to selected text
//   const insertSquareRootToSelected = () => {
//     const equation = `\\sqrt{${selectedText}}`;
//     insertEquation(equation);
//   };

//   // Function to insert equation
//   const insertEquation = (equation) => {
//     const input = inputRef.current;
//     if (!input) return;

//     const startPos = input.selectionStart;
//     const endPos = input.selectionEnd;

//     const textBefore = input.value.substring(0, startPos);
//     const textAfter = input.value.substring(endPos, input.value.length);

//     input.value = textBefore + equation + textAfter;
//     input.focus();

//     input.selectionStart = startPos + equation.length;
//     input.selectionEnd = startPos + equation.length;
//     setSelectedText("");
//     renderEquation();
//   };

//   // Function to render the equation using KaTeX
//   const renderEquation = () => {
//     const outputDiv = document.getElementById("math-output");
//     const equation = inputRef.current.value;
//     try {
//       katex.render(equation, outputDiv, { throwOnError: false });
//     } catch (error) {
//       console.error("Error rendering LaTeX:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={insertSquareRootToSelected}>Square Root</button>
//         <input
//           type="text"
//           ref={inputRef}
//           onMouseUp={getSelectedText}
//           onKeyDown={getSelectedText}
//         />
//       </div>

//       <div id="math-output"></div>
//     </div>
//   );
// };

// workign version four
// const EquationEditor = () => {
//   const [equations, setEquations] = useState([]);

//   const addSquareRoot = () => {
//     setEquations([...equations, { type: "squareRoot", value: "" }]);
//   };

//   const handleInputChange = (index, event) => {
//     const newEquations = [...equations];
//     newEquations[index].value = event.target.value;
//     setEquations(newEquations);
//   };

//   const removeEquation = (index) => {
//     const newEquations = [...equations];
//     newEquations.splice(index, 1);
//     setEquations(newEquations);
//   };

//   const renderEquations = () => {
//     return equations.map((equation, index) => {
//       switch (equation.type) {
//         case "squareRoot":
//           return (
//             <div key={index}>
//               <button onClick={() => removeEquation(index)}>Remove</button>
//               <span>√</span>
//               <input
//                 type="text"
//                 value={equation.value}
//                 onChange={(e) => handleInputChange(index, e)}
//               />
//             </div>
//           );
//         default:
//           return null;
//       }
//     });
//   };

//   const renderLatex = () => {
//     const latex = equations
//       .map((equation) => {
//         switch (equation.type) {
//           case "squareRoot":
//             return `\\sqrt{${equation.value}}`;
//           default:
//             return null;
//         }
//       })
//       .join("");

//     return latex;
//   };

//   const renderMathOutput = () => {
//     try {
//       katex.render(renderLatex(), document.getElementById("math-output"), {
//         throwOnError: false,
//       });
//     } catch (error) {
//       console.error("Error rendering LaTeX:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={addSquareRoot}>Add Square Root</button>
//       {renderEquations()}
//       <div id="math-output"></div>
//       <button onClick={renderMathOutput}>Render</button>
//     </div>
//   );
// };

// working version five

const DragAndSelectComponent = () => {
  // State to track whether an item is selected
  const [isSelected, setIsSelected] = useState(false);
  // State to track the position of the dragged item
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    // Prevent default behavior to avoid selecting text
    event.preventDefault();

    // Capture initial mouse position
    const startX = event.clientX;
    const startY = event.clientY;

    // Handler for mousemove event
    const handleMouseMove = (event) => {
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      setPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
    };

    // Handler for mouseup event
    const handleMouseUp = () => {
      // Remove event listeners when mouse is released
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for mousemove and mouseup events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        border: "1px solid black",
        position: "relative",
      }}
    >
      {/* Render a draggable element */}
      <div> dkmikm kmk</div>
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: isSelected ? "blue" : "red",
          position: "absolute",
          left: position.x,
          top: position.y,
          cursor: "pointer",
        }}
      ></div>
    </div>
  );
};

// const EquationEditor = () => {
//   const [equations, setEquations] = useState([]);

//   const addSquareRoot = () => {
//     setEquations([...equations, { type: "squareRoot", value: "" }]);
//   };

//   const handleInputChange = (index, event) => {
//     const newEquations = [...equations];
//     newEquations[index].value = event.target.value;
//     setEquations(newEquations);
//   };

//   const removeEquation = (index) => {
//     const newEquations = [...equations];
//     newEquations.splice(index, 1);
//     setEquations(newEquations);
//   };

//   const renderEquation = (equation, index) => {
//     switch (equation.type) {
//       case "squareRoot":
//         return (
//           <div key={index}>
//             <button onClick={() => removeEquation(index)}>Remove</button>
//             <span>√</span>
//             <input
//               type="text"
//               value={equation.value}
//               onChange={(e) => handleInputChange(index, e)}
//             />
//             <button onClick={() => addSquareRoot()}>Add Square Root</button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderEquations = () => {
//     return equations.map((equation, index) => {
//       return renderEquation(equation, index);
//     });
//   };

//   const renderLatex = () => {
//     const latex = equations
//       .map((equation) => {
//         switch (equation.type) {
//           case "squareRoot":
//             return `\\sqrt{${equation.value}}`;
//           default:
//             return null;
//         }
//       })
//       .join("");

//     return latex;
//   };

//   const renderMathOutput = () => {
//     try {
//       katex.render(renderLatex(), document.getElementById("math-output"), {
//         throwOnError: false,
//       });
//     } catch (error) {
//       console.error("Error rendering LaTeX:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={addSquareRoot}>Add Square Root</button>
//       {renderEquations()}
//       <div id="math-output"></div>
//       <button onClick={renderMathOutput}>Render</button>
//     </div>
//   );
// };

// const TextSelector = () => {
//   const [selectedText, setSelectedText] = useState("");

//   // Function to handle text selection
//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     if (selection) {
//       const selectedString = selection.toString();
//       console.log("selectedString ", selectedString);
//       setSelectedText(selectedString);
//     }
//   };

//   return (
//     <div onMouseUp={handleTextSelection}>
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
//         habitant morbi tristique senectus et netus et malesuada fames ac turpis
//         egestas. In hac habitasse platea dictumst. Vestibulum ante ipsum primis
//         in faucibus orci luctus et ultrices posuere cubilia curae; Mauris
//         euismod congue justo, at tempus urna rutrum a. Morbi pharetra metus eget
//         velit ullamcorper hendrerit. Sed mattis ultricies mauris, vel blandit
//         urna accumsan vel. Nulla facilisi.
//       </p>
//       <p>
//         Vestibulum suscipit suscipit magna, ac mattis mi malesuada a. Fusce nec
//         est sed velit lobortis gravida. Sed nec scelerisque arcu. Cras vitae
//         ullamcorper ligula, et dapibus nunc. Nulla facilisi. Sed congue, risus
//         sit amet gravida consequat, ipsum odio ultricies nibh, nec luctus orci
//         eros vel libero.
//       </p>
//       <p>
//         Integer gravida id lacus id sagittis. Curabitur placerat libero in urna
//         egestas, at finibus arcu rhoncus. In hac habitasse platea dictumst. Ut
//         vehicula vestibulum tellus sit amet aliquet. Proin interdum, risus non
//         fermentum molestie, libero velit elementum lectus, a ultrices nunc magna
//         sed ipsum.
//       </p>
//       <p>
//         Cras ut metus quis nulla elementum accumsan eget nec quam. Nullam
//         tincidunt orci at quam gravida efficitur. Fusce vitae dapibus lacus, vel
//         pellentesque tortor. Sed ut enim ultricies, tristique magna sit amet,
//         placerat tortor. Donec euismod efficitur tellus, nec convallis nisi
//         ultrices at. Donec sit amet enim sapien.
//       </p>
//       <div>Selected Text: {selectedText}</div>
//     </div>
//   );
// };

// const TextSelector = () => {
//   const [selectedText, setSelectedText] = useState("");
//   const [selectedElement, setSelectedElement] = useState(null);
//   const [selectionPosition, setSelectionPosition] = useState({
//     start: 0,
//     end: 0,
//   });

//   // Function to handle text selection
//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     if (selection) {
//       const selectedString = selection.toString();
//       console.log("selected string ", selectedString);
//       console.log(
//         "selected string element ",
//         selection.anchorNode.parentElement
//       );
//       console.log("selected string position", {
//         start: selection.focusOffset,
//         end: selection.anchorOffset,
//       });

//       setSelectedText(selectedString);
//       setSelectedElement(selection.anchorNode.parentElement); // Get the parent element of the selection
//       setSelectionPosition({
//         start: selection.anchorOffset,
//         end: selection.focusOffset,
//       }); // Get start and end offset
//     }
//   };

//   return (
//     <div onMouseUp={handleTextSelection}>
//       <EquationEditor />
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
//         habitant morbi tristique senectus et netus et malesuada fames ac turpis
//         egestas. In hac habitasse platea dictumst. Vestibulum ante ipsum primis
//         in faucibus orci luctus et ultrices posuere cubilia curae; Mauris
//         euismod congue justo, at tempus urna rutrum a. Morbi pharetra metus eget
//         velit ullamcorper hendrerit. Sed mattis ultricies mauris, vel blandit
//         urna accumsan vel. Nulla facilisi.
//       </p>
//       <p>
//         Vestibulum suscipit suscipit magna, ac mattis mi malesuada a. Fusce nec
//         est sed velit lobortis gravida. Sed nec scelerisque arcu. Cras vitae
//         ullamcorper ligula, et dapibus nunc. Nulla facilisi. Sed congue, risus
//         sit amet gravida consequat, ipsum odio ultricies nibh, nec luctus orci
//         eros vel libero.
//       </p>
//       <p>
//         Integer gravida id lacus id sagittis. Curabitur placerat libero in urna
//         egestas, at finibus arcu rhoncus. In hac habitasse platea dictumst. Ut
//         vehicula vestibulum tellus sit amet aliquet. Proin interdum, risus non
//         fermentum molestie, libero velit elementum lectus, a ultrices nunc magna
//         sed ipsum.
//       </p>
//       <p>
//         Cras ut metus quis nulla elementum accumsan eget nec quam. Nullam
//         tincidunt orci at quam gravida efficitur. Fusce vitae dapibus lacus, vel
//         pellentesque tortor. Sed ut enim ultricies, tristique magna sit amet,
//         placerat tortor. Donec euismod efficitur tellus, nec convallis nisi
//         ultrices at. Donec sit amet enim sapien.
//       </p>
//       <div>
//         Selected Text: {selectedText}
//         <br />
//         Selected Element: {selectedElement && selectedElement.tagName}
//         <br />
//         Selection Start: {selectionPosition.start}, Selection End:{" "}
//         {selectionPosition.end}
//       </div>
//     </div>
//   );
// };

// export default TextSelector;

// export default DragAndSelectComponent;

// import React, { useRef } from "react";

// const EquationEditor = () => {
//   const inputRef = useRef(null);

//   const insertEquation = () => {
//     const equation = inputRef.current.value;
//     if (!equation) return;

//     const mathField = MathQuill.getInterface(2).MathField(inputRef.current);
//     mathField.write(equation);
//   };

//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button onClick={insertEquation}>Insert Equation</button>
//       <div id="math-input"></div>
//     </div>
//   );
// };

// export default EquationEditor;

// import React, { useRef } from "react";
// import MathQuill from "mathquill";

// const EquationEditor = () => {
//   const inputRef = useRef(null);

//   const insertEquation = () => {
//     const equation = inputRef.current.value;
//     if (!equation) return;

//     const mathField = MathQuill.MathField(
//       document.getElementById("math-input"),
//       {
//         spaceBehavesLikeTab: true,
//         restrictMismatchedBrackets: true,
//         autoSubscriptNumerals: true,
//       }
//     );
//     mathField.write(equation);
//   };

//   return (
//     <div>
//       <input type="text" ref={inputRef} />
//       <button onClick={insertEquation}>Insert Equation</button>
//       <div id="math-input"></div>
//     </div>
//   );
// };

// export default EquationEditor;

// const EquationEditor = () => {
//   const [equation, setEquation] = useState("");

//   const handleChange = (event) => {
//     setEquation(event.target.value);
//   };

//   const handleRender = () => {
//     try {
//       katex.render(equation, document.getElementById("math-output"), {
//         throwOnError: false,
//       });
//     } catch (error) {
//       console.error("Error rendering LaTeX:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <textarea value={equation} onChange={handleChange} />
//       </div>
//       <div>
// <button onClick={() => setEquation(equation + "\\sqrt{}")}>
//   Square Root
// </button>
// <button onClick={() => setEquation(equation + "^{}")}>
//   Superscript
// </button>
// <button onClick={() => setEquation(equation + "_{}")}>Subscript</button>
// <button onClick={() => setEquation(equation + "\\frac{}{}")}>
//   Fraction
// </button>
// <button onClick={() => setEquation(equation + "\\int{}")}>
//   Integral
// </button>
//       </div>
//       <div id="math-output"></div>
//       <button onClick={handleRender}>Render</button>
//     </div>
//   );
// };

// export default EquationEditor;

const EquationEditor = () => {
  const [equation, setEquation] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  useEffect(() => {
    renderEquation();
  }, [equation]);

  const renderEquation = () => {
    try {
      katex.render(equation, document.getElementById("math-output"), {
        throwOnError: false,
      });
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
  };

  const handleInsert = (value) => {
    const updatedEquation =
      equation.slice(0, cursorPosition) +
      value +
      equation.slice(cursorPosition);
    setEquation(updatedEquation);
    setCursorPosition(cursorPosition + value.length);
  };

  const handleBackspace = () => {
    if (cursorPosition === 0) return;
    const updatedEquation =
      equation.slice(0, cursorPosition - 1) + equation.slice(cursorPosition);
    setEquation(updatedEquation);
    setCursorPosition(cursorPosition - 1);
  };

  const handleDelete = () => {
    if (cursorPosition === equation.length) return;
    const updatedEquation =
      equation.slice(0, cursorPosition) + equation.slice(cursorPosition + 1);
    setEquation(updatedEquation);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setCursorPosition(Math.max(0, cursorPosition - 1));
    } else if (event.key === "ArrowRight") {
      setCursorPosition(Math.min(equation.length, cursorPosition + 1));
    }
  };

  const handleKeyUp = () => {
    const input = document.getElementById("equation-input");
    setCursorPosition(input.selectionStart);
    setSelectionStart(input.selectionStart);
    setSelectionEnd(input.selectionEnd);
  };

  const handleBlur = () => {
    setCursorPosition(0);
    setSelectionStart(0);
    setSelectionEnd(0);
  };

  return (
    <div>
      <MyOwnEditor
        equation={parseEquation(equation.replace(/\s+/g, ""))}
        depth={0}
      />
      <div>
        <textarea
          id="equation-input"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        />
      </div>
      <div>
        {/* <button onClick={() => handleInsert("\\sqrt{}")}>Square Root</button>
        <button onClick={() => setEquation(equation + "\\sqrt{}")}>
          Square Root
        </button>
        <button onClick={() => setEquation(equation + "^{}")}>
          Superscript
        </button>
        <button onClick={() => setEquation(equation + "_{}")}>Subscript</button>
        <button onClick={() => setEquation(equation + "\\frac{}{}")}>
          Fraction
        </button>
        <button onClick={() => setEquation(equation + "\\int{}")}>
          Integral
        </button> */}
        {/* Add more buttons for other mathematical expressions */}
        <MathEquationEditorOutput />
      </div>
      <div id="math-output"></div>
    </div>
  );
};

function parseEquation(equation) {
  let components = [];
  let temp = "";
  let i = 0;

  while (i < equation.length) {
    if (equation[i] === "\\") {
      let command = "";
      i++; // Move i to the next character after '\'
      while (i < equation.length && /[a-zA-Z]/.test(equation[i])) {
        command += equation[i];
        i++;
      }
      if (command === "frac") {
        let insideValues1 = [];
        let bracketCount1 = 0;
        i++; // Move i to the next character after '{'
        while (
          i < equation.length &&
          (bracketCount1 > 0 || equation[i] !== "}")
        ) {
          if (equation[i] === "{") bracketCount1++;
          else if (equation[i] === "}") bracketCount1--;
          if (bracketCount1 > 0 || equation[i] !== "}") {
            insideValues1.push(equation[i]);
          }
          i++;
        }
        let insideValues2 = [];
        let bracketCount2 = 0;
        i++; // Move i to the next character after '{'
        while (
          i < equation.length &&
          (bracketCount2 > 0 || equation[i] !== "}")
        ) {
          if (equation[i] === "{") bracketCount2++;
          else if (equation[i] === "}") bracketCount2--;
          if (bracketCount2 > 0 || equation[i] !== "}") {
            insideValues2.push(equation[i]);
          }
          i++;
        }
        components.push([
          command,
          parseEquation(insideValues1.join("")),
          parseEquation(insideValues2.join("")),
        ]);
      } else if (command === "sqrt") {
        let insideValues = [];
        let bracketCount = 0;
        i++; // Move i to the next character after '{'
        while (
          i < equation.length &&
          (bracketCount > 0 || equation[i] !== "}")
        ) {
          if (equation[i] === "{") bracketCount++;
          else if (equation[i] === "}") bracketCount--;
          if (bracketCount > 0 || equation[i] !== "}") {
            insideValues.push(equation[i]);
          }
          i++;
        }
        components.push([command, parseEquation(insideValues.join(""))]);
      } else {
        components.push(command);
      }
    } else if (equation[i] === "{") {
      let bracketCount = 1;
      let subExpression = "";
      i++; // Move i to the next character after '{'
      while (i < equation.length && bracketCount > 0) {
        if (equation[i] === "{") bracketCount++;
        else if (equation[i] === "}") bracketCount--;
        if (bracketCount > 0) subExpression += equation[i];
        i++;
      }
      components.push(parseEquation(subExpression));
    } else if (equation[i] === "}") {
      i++; // Move i to the next character after '}'
    } else if (equation[i] === "^") {
      let base = components.pop(); // Previous component is the base
      i++; // Move i to the next character after '^'
      let exponent = "";
      while (i < equation.length && /[0-9]/.test(equation[i])) {
        exponent += equation[i];
        i++;
      }
      components.push(["^", base, parseInt(exponent)]);
    } else {
      components.push(equation[i]);
      i++;
    }
  }

  return components;
}

const MyOwnEditor = ({ equation, depth }) => {
  //   let equation = "\\frac{\\sqrt{5}}{5^{2}}";
  //   let equation = " c = \\frac{ a + b }{c}";
  //   const characters = equation.split("");
  let finalArray = [];
  let components = equation;
  console.log("845 ", components);
  console.log("846 array ", JSON.stringify(components));
  let syntax = "";
  //   for (let i = 0; i < equation.length; i++) {
  //     console.log("equation .cha ", equation.charAt(i));
  //     if (equation.charAt(i) === "\\") {
  //       i++;
  //       while (equation.charAt(i) !== "{") {
  //         syntax += equation.charAt(i);
  //         i++;
  //       }
  //       if (finalArray !== "") {
  //         finalArray.push(syntax);
  //       }
  //       while (equation.charAt(i) !== "{") {
  //         syntax += equation.charAt(i);
  //         i++;
  //       }
  //     }
  //   }
  //   console.log("characters ", characters);

  return (
    <div>
      {/* Map over the array of characters and render each character */}
      {/* {characters.map((char, index) => (
        <div key={index}>{char}</div>
      ))} */}

      <div
        style={{
          display: "flex",
          gap: "4px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {components.map((char, index) =>
          Array.isArray(char) ? (
            <div>
              {/* <div>{depth}</div> */}
              <MyOwnEditor equation={char} depth={depth + 1} />
            </div>
          ) : char === "frac" ? (
            <div>
              <input type="text"></input>
              <div>/</div>
              <input type="text"></input>
            </div>
          ) : (
            <div key={index}>{char}</div>
          )
        )}
      </div>

      {/* {{components.map((value) => (
        <div>{value}</div>
        )}} */}
    </div>
  );
};

export default EquationEditor;
