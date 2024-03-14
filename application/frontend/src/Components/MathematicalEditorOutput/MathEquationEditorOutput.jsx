import React, { useState, useRef, useEffect, Component } from "react";
import classes from "./MathEquationEditorOutput.module.css";
import HoverDetailsModal from "../HoverDetailsModal/HoverDetailsModal";
import SearchModal from "../SearchModal/SearchModal";
import katex from "katex";

export const MathEquationEditorOutput = () => {
  // modal
  const [hoverDetails, setHoverDetails] = useState(false);
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

  const all = [
    {
      name: "Fraction",
      label: "Fraction",
      latexFormat: "\\frac{}{}",
      value1: [],
      value2: [],
      type: "complex",
    },
    {
      name: "Square Root",
      label: "Square Root",
      latexFormat: "\\sqrt{}",
      value: [],
      type: "complex",
    },
    {
      name: "Superscript",
      label: "Superscript",
      latexFormat: "^{}",
      value: [],
      type: "complex",
    },
    {
      name: "Subscript",
      label: "Subscript",
      latexFormat: "_{}",
      value: [],
      type: "complex",
    },
    {
      name: "Integral",
      label: "Integral",
      latexFormat: "\\int{}",
      value: [],
      type: "complex",
    },

    {
      name: "ω",
      label: "omega",
      latexFormat: "\\omega",
      value: [],
      type: "simple",
    },
    {
      name: "α",
      label: "alpha",
      latexFormat: "\\alpha",
      value: [],
      type: "simple",
    },
    {
      name: "β",
      label: "beta",
      latexFormat: "\\beta",
      value: [],
      type: "simple",
    },
    {
      name: "χ",
      label: "chi",
      latexFormat: "\\chi",
      value: [],
      type: "simple",
    },
    {
      name: "δ",
      label: "delta",
      latexFormat: "\\delta",
      value: [],
      type: "simple",
    },
    {
      name: "η",
      label: "eta",
      latexFormat: "\\eta",
      value: [],
      type: "simple",
    },
    {
      name: "γ",
      label: "gamma",
      latexFormat: "\\gamma",
      value: [],
      type: "simple",
    },
    {
      name: "ι",
      label: "iota",
      latexFormat: "\\iota",
      value: [],
      type: "simple",
    },
    {
      name: "κ",
      label: "kappa",
      latexFormat: "\\kappa",
      value: [],
      type: "simple",
    },
    {
      name: "λ",
      label: "lambda",
      latexFormat: "\\lambda",
      value: [],
      type: "simple",
    },
    { name: "µ", label: "mu", latexFormat: "\\mu", value: [], type: "simple" },
    { name: "ν", label: "nu", latexFormat: "\\nu", value: [], type: "simple" },
    { name: "o", label: "o", latexFormat: "o", value: [], type: "simple" },
    {
      name: "φ",
      label: "phi",
      latexFormat: "\\phi",
      value: [],
      type: "simple",
    },
    { name: "π", label: "pi", latexFormat: "\\pi", value: [], type: "simple" },
    {
      name: "ψ",
      label: "psi",
      latexFormat: "\\psi",
      value: [],
      type: "simple",
    },
    {
      name: "ρ",
      label: "rho",
      latexFormat: "\\rho",
      value: [],
      type: "simple",
    },
    {
      name: "σ",
      label: "sigma",
      latexFormat: "\\sigma",
      value: [],
      type: "simple",
    },
    {
      name: "τ",
      label: "tau",
      latexFormat: "\\tau",
      value: [],
      type: "simple",
    },
    {
      name: "θ",
      label: "theta",
      latexFormat: "\\theta",
      value: [],
      type: "simple",
    },
    {
      name: "υ",
      label: "upsilon",
      latexFormat: "\\upsilon",
      value: [],
      type: "simple",
    },
    {
      name: "φ",
      label: "varphi",
      latexFormat: "\\varphi",
      value: [],
      type: "simple",
    },
    {
      name: "Ω",
      label: "Omega",
      latexFormat: "\\Omega",
      value: [],
      type: "simple",
    },
    {
      name: "ε",
      label: "epsilon",
      latexFormat: "\\epsilon",
      value: [],
      type: "simple",
    },
    {
      name: "ϑ",
      label: "vartheta",
      latexFormat: "\\vartheta",
      value: [],
      type: "simple",
    },
    {
      name: "ϴ",
      label: "vartheta",
      latexFormat: "\\vartheta",
      value: [],
      type: "simple",
    },
    {
      name: "ϖ",
      label: "varpi",
      latexFormat: "\\varpi",
      value: [],
      type: "simple",
    },
    {
      name: "Φ",
      label: "Phi",
      latexFormat: "\\Phi",
      value: [],
      type: "simple",
    },
    {
      name: "ℵ",
      label: "aleph",
      latexFormat: "\\aleph",
      value: [],
      type: "simple",
    },
    {
      name: "ϱ",
      label: "varrho",
      latexFormat: "\\varrho",
      value: [],
      type: "simple",
    },
    { name: "Π", label: "Pi", latexFormat: "\\Pi", value: [], type: "simple" },
    {
      name: "i",
      label: "beth",
      latexFormat: "\\beth",
      value: [],
      type: "simple",
    },
    { name: "ξ", label: "xi", latexFormat: "\\xi", value: [], type: "simple" },
    {
      name: "ς",
      label: "varsigma",
      latexFormat: "\\varsigma",
      value: [],
      type: "simple",
    },
    {
      name: "Ψ",
      label: "Psi",
      latexFormat: "\\Psi",
      value: [],
      type: "simple",
    },
    {
      name: "k",
      label: "daleth",
      latexFormat: "\\daleth",
      value: [],
      type: "simple",
    },
    {
      name: "ζ",
      label: "zeta",
      latexFormat: "\\zeta",
      value: [],
      type: "simple",
    },
    {
      name: "Σ",
      label: "Sigma",
      latexFormat: "\\Sigma",
      value: [],
      type: "simple",
    },
    {
      name: "ג",
      label: "gimel",
      latexFormat: "\\gimel",
      value: [],
      type: "simple",
    },
    {
      name: "⇑",
      label: "Uparrow",
      latexFormat: "\\Uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇓",
      label: "Downarrow",
      latexFormat: "\\Downarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↑",
      label: "uparrow",
      latexFormat: "\\uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "⌜",
      label: "ulcorner",
      latexFormat: "\\ulcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⌞",
      label: "llcorner",
      latexFormat: "\\llcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⌝",
      label: "urcorner",
      latexFormat: "\\urcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⌟",
      label: "lrcorner",
      latexFormat: "\\lrcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⟨",
      label: "langle",
      latexFormat: "\\langle",
      value: [],
      type: "simple",
    },
    {
      name: "⟩",
      label: "rangle",
      latexFormat: "\\rangle",
      value: [],
      type: "simple",
    },
    {
      name: "⌈",
      label: "lceil",
      latexFormat: "\\lceil",
      value: [],
      type: "simple",
    },
    {
      name: "⌉",
      label: "rceil",
      latexFormat: "\\rceil",
      value: [],
      type: "simple",
    },
    {
      name: "⌊",
      label: "lfloor",
      latexFormat: "\\lfloor",
      value: [],
      type: "simple",
    },
    {
      name: "⌋",
      label: "rfloor",
      latexFormat: "\\rfloor",
      value: [],
      type: "simple",
    },
    {
      name: "[",
      label: "left square bracket",
      latexFormat: "[",
      value: [],
      type: "simple",
    },
    {
      name: "]",
      label: "right square bracket",
      latexFormat: "]",
      value: [],
      type: "simple",
    },
    {
      name: "|",
      label: "vertical bar",
      latexFormat: "|",
      value: [],
      type: "simple",
    },
    {
      name: "∣",
      label: "divides",
      latexFormat: "\\vert",
      value: [],
      type: "simple",
    },
    {
      name: "|",
      label: "vertical bar",
      latexFormat: "\\|",
      value: [],
      type: "simple",
    },
    {
      name: "∥",
      label: "parallel",
      latexFormat: "\\Vert",
      value: [],
      type: "simple",
    },
    {
      name: "{",
      label: "left curly brace",
      latexFormat: "\\{",
      value: [],
      type: "simple",
    },
    {
      name: "}",
      label: "right curly brace",
      latexFormat: "\\}",
      value: [],
      type: "simple",
    },
    {
      name: "\\",
      label: "backslash",
      latexFormat: "\\\\",
      value: [],
      type: "simple",
    },
    {
      name: "/",
      label: "forward slash",
      latexFormat: "/",
      value: [],
      type: "simple",
    },
    { name: "b", label: "b", latexFormat: "b", value: [], type: "simple" },
    { name: "c", label: "c", latexFormat: "c", value: [], type: "simple" },
    { name: "d", label: "d", latexFormat: "d", value: [], type: "simple" },
    { name: "e", label: "e", latexFormat: "e", value: [], type: "simple" },
    { name: "h", label: "h", latexFormat: "h", value: [], type: "simple" },
    { name: "i", label: "i", latexFormat: "i", value: [], type: "simple" },
    { name: "k", label: "k", latexFormat: "k", value: [], type: "simple" },
    { name: "p", label: "p", latexFormat: "p", value: [], type: "simple" },
    { name: "q", label: "q", latexFormat: "q", value: [], type: "simple" },
    { name: "x", label: "x", latexFormat: "x", value: [], type: "simple" },
    { name: "y", label: "y", latexFormat: "y", value: [], type: "simple" },
    {
      name: "arccos",
      label: "arccosine",
      latexFormat: "\\arccos",
      value: [],
      type: "simple",
    },
    {
      name: "arcsin",
      label: "arcsine",
      latexFormat: "\\arcsin",
      value: [],
      type: "simple",
    },
    {
      name: "arctan",
      label: "arctangent",
      latexFormat: "\\arctan",
      value: [],
      type: "simple",
    },
    {
      name: "arg",
      label: "argument",
      latexFormat: "\\arg",
      value: [],
      type: "simple",
    },
    {
      name: "cos",
      label: "cosine",
      latexFormat: "\\cos",
      value: [],
      type: "simple",
    },
    {
      name: "cosh",
      label: "hyperbolic cosine",
      latexFormat: "\\cosh",
      value: [],
      type: "simple",
    },
    {
      name: "cot",
      label: "cotangent",
      latexFormat: "\\cot",
      value: [],
      type: "simple",
    },
    {
      name: "coth",
      label: "hyperbolic cotangent",
      latexFormat: "\\coth",
      value: [],
      type: "simple",
    },
    {
      name: "csc",
      label: "cosecant",
      latexFormat: "\\csc",
      value: [],
      type: "simple",
    },
    {
      name: "deg",
      label: "degree",
      latexFormat: "\\deg",
      value: [],
      type: "simple",
    },
    {
      name: "det",
      label: "determinant",
      latexFormat: "\\det",
      value: [],
      type: "simple",
    },
    {
      name: "dim",
      label: "dimension",
      latexFormat: "\\dim",
      value: [],
      type: "simple",
    },
    {
      name: "exp",
      label: "exponential",
      latexFormat: "\\exp",
      value: [],
      type: "simple",
    },
    {
      name: "gcd",
      label: "greatest common divisor",
      latexFormat: "\\gcd",
      value: [],
      type: "simple",
    },
    {
      name: "hom",
      label: "homomorphism",
      latexFormat: "\\hom",
      value: [],
      type: "simple",
    },
    {
      name: "inf",
      label: "infimum",
      latexFormat: "\\inf",
      value: [],
      type: "simple",
    },
    {
      name: "∞",
      label: "infinity",
      latexFormat: "\\infty",
      value: [],
      type: "simple",
    },
    {
      name: "ker",
      label: "kernel",
      latexFormat: "\\ker",
      value: [],
      type: "simple",
    },
    {
      name: "lg",
      label: "logarithm base 2",
      latexFormat: "\\lg",
      value: [],
      type: "simple",
    },
    {
      name: "lim",
      label: "limit",
      latexFormat: "\\lim",
      value: [],
      type: "simple",
    },
    {
      name: "liminf",
      label: "limit inferior",
      latexFormat: "\\liminf",
      value: [],
      type: "simple",
    },
    {
      name: "limsup",
      label: "limit superior",
      latexFormat: "\\limsup",
      value: [],
      type: "simple",
    },
    {
      name: "ln",
      label: "natural logarithm",
      latexFormat: "\\ln",
      value: [],
      type: "simple",
    },
    {
      name: "log",
      label: "logarithm",
      latexFormat: "\\log",
      value: [],
      type: "simple",
    },
    {
      name: "max",
      label: "maximum",
      latexFormat: "\\max",
      value: [],
      type: "simple",
    },
    {
      name: "min",
      label: "minimum",
      latexFormat: "\\min",
      value: [],
      type: "simple",
    },
    {
      name: "Pr",
      label: "probability",
      latexFormat: "\\Pr",
      value: [],
      type: "simple",
    },
    {
      name: "sec",
      label: "secant",
      latexFormat: "\\sec",
      value: [],
      type: "simple",
    },
    {
      name: "sin",
      label: "sine",
      latexFormat: "\\sin",
      value: [],
      type: "simple",
    },
    {
      name: "sinh",
      label: "hyperbolic sine",
      latexFormat: "\\sinh",
      value: [],
      type: "simple",
    },
    {
      name: "sup",
      label: "supremum",
      latexFormat: "\\sup",
      value: [],
      type: "simple",
    },
    {
      name: "tan",
      label: "tangent",
      latexFormat: "\\tan",
      value: [],
      type: "simple",
    },
    {
      name: "tanh",
      label: "hyperbolic tangent",
      latexFormat: "\\tanh",
      value: [],
      type: "simple",
    },
    {
      name: "*",
      label: "Asterisk",
      latexFormat: "\\ast",
      value: [],
      type: "simple",
    },
    {
      name: "±",
      label: "Plus-Minus",
      latexFormat: "\\pm",
      value: [],
      type: "simple",
    },
    {
      name: "∩",
      label: "Intersection",
      latexFormat: "\\cap",
      value: [],
      type: "simple",
    },
    {
      name: "⊲",
      label: "Normal Subgroup",
      latexFormat: "\\lhd",
      value: [],
      type: "simple",
    },
    {
      name: "⋆",
      label: "Star",
      latexFormat: "\\star",
      value: [],
      type: "simple",
    },
    {
      name: "∓",
      label: "Minus-Plus",
      latexFormat: "\\mp",
      value: [],
      type: "simple",
    },
    {
      name: "∪",
      label: "Union",
      latexFormat: "\\cup",
      value: [],
      type: "simple",
    },
    {
      name: "⊳",
      label: "Normal Subgroup",
      latexFormat: "\\rhd",
      value: [],
      type: "simple",
    },
    {
      name: "⋅",
      label: "Dot",
      latexFormat: "\\cdot",
      value: [],
      type: "simple",
    },
    {
      name: "⨿",
      label: "Amalgamation",
      latexFormat: "\\amalg",
      value: [],
      type: "simple",
    },
    {
      name: "⊎",
      label: "Multiset Union",
      latexFormat: "\\uplus",
      value: [],
      type: "simple",
    },
    {
      name: "◃",
      label: "Left Triangle",
      latexFormat: "\\triangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "∘",
      label: "Composition",
      latexFormat: "\\circ",
      value: [],
      type: "simple",
    },
    {
      name: "⊙",
      label: "Circle Dot",
      latexFormat: "\\odot",
      value: [],
      type: "simple",
    },
    {
      name: "⊓",
      label: "Square Intersection",
      latexFormat: "\\sqcap",
      value: [],
      type: "simple",
    },
    {
      name: "▹",
      label: "Right Triangle",
      latexFormat: "\\triangleright",
      value: [],
      type: "simple",
    },
    {
      name: "∙",
      label: "Bullet",
      latexFormat: "\\bullet",
      value: [],
      type: "simple",
    },
    {
      name: "⊕",
      label: "Circle Plus",
      latexFormat: "\\oplus",
      value: [],
      type: "simple",
    },
    {
      name: "∧",
      label: "Wedge",
      latexFormat: "\\wedge",
      value: [],
      type: "simple",
    },
    {
      name: "⊵",
      label: "Normal Subgroup",
      latexFormat: "\\unrhd",
      value: [],
      type: "simple",
    },
    {
      name: "⋄",
      label: "Diamond",
      latexFormat: "\\diamond",
      value: [],
      type: "simple",
    },
    {
      name: "⊘",
      label: "Circle Slash",
      latexFormat: "\\oslash",
      value: [],
      type: "simple",
    },
    {
      name: "∨",
      label: "Vee",
      latexFormat: "\\vee",
      value: [],
      type: "simple",
    },
    {
      name: "▽",
      label: "Big Down Triangle",
      latexFormat: "\\bigtriangledown",
      value: [],
      type: "simple",
    },
    {
      name: "×",
      label: "Times",
      latexFormat: "\\times",
      value: [],
      type: "simple",
    },
    {
      name: "⊗",
      label: "Circle Times",
      latexFormat: "\\otimes",
      value: [],
      type: "simple",
    },
    {
      name: "†",
      label: "Dagger",
      latexFormat: "\\dagger",
      value: [],
      type: "simple",
    },
    {
      name: "△",
      label: "Big Up Triangle",
      latexFormat: "\\bigtriangleup",
      value: [],
      type: "simple",
    },
    {
      name: "÷",
      label: "Division",
      latexFormat: "\\div",
      value: [],
      type: "simple",
    },
    {
      name: "≀",
      label: "Wreath Product",
      latexFormat: "\\wr",
      value: [],
      type: "simple",
    },
    {
      name: "‡",
      label: "Double Dagger",
      latexFormat: "\\ddagger",
      value: [],
      type: "simple",
    },
    {
      name: " \\",
      label: "Set Minus",
      latexFormat: "\\setminus",
      value: [],
      type: "simple",
    },
    {
      name: "⋅",
      label: "Center Dot",
      latexFormat: "\\centerdot",
      value: [],
      type: "simple",
    },
    {
      name: "⊼",
      label: "Bar Wedge",
      latexFormat: "\\barwedge",
      value: [],
      type: "simple",
    },
    {
      name: "⊻",
      label: "XOR",
      latexFormat: "\\veebar",
      value: [],
      type: "simple",
    },
    {
      name: "⊛",
      label: "Circled Asterisk",
      latexFormat: "\\circledast",
      value: [],
      type: "simple",
    },
    {
      name: "⊞",
      label: "Box Plus",
      latexFormat: "\\boxplus",
      value: [],
      type: "simple",
    },
    {
      name: "⋏",
      label: "Curly Wedge",
      latexFormat: "\\curlywedge",
      value: [],
      type: "simple",
    },
    {
      name: "⋎",
      label: "Curly Vee",
      latexFormat: "\\curlyvee",
      value: [],
      type: "simple",
    },
    {
      name: "⊚",
      label: "Circled Circle",
      latexFormat: "\\circledcirc",
      value: [],
      type: "simple",
    },
    {
      name: "⊟",
      label: "Box Minus",
      latexFormat: "\\boxminus",
      value: [],
      type: "simple",
    },
    {
      name: "⋒",
      label: "Intersection with Plus",
      latexFormat: "\\Cap",
      value: [],
      type: "simple",
    },
    {
      name: "⋓",
      label: "Union with Plus",
      latexFormat: "\\Cup",
      value: [],
      type: "simple",
    },
    {
      name: "⊝",
      label: "Circled Dash",
      latexFormat: "\\circleddash",
      value: [],
      type: "simple",
    },
    {
      name: "⊠",
      label: "Box Times",
      latexFormat: "\\boxtimes",
      value: [],
      type: "simple",
    },
    {
      name: "⊥",
      label: "Perpendicular",
      latexFormat: "\\bot",
      value: [],
      type: "simple",
    },
    {
      name: "⊤",
      label: "Top",
      latexFormat: "\\top",
      value: [],
      type: "simple",
    },
    {
      name: "⋌",
      label: "Right Three Times",
      latexFormat: "\\rightthreetimes",
      value: [],
      type: "simple",
    },
    {
      name: "≅",
      label: "Divide on Times",
      latexFormat: "\\divideontimes",
      value: [],
      type: "simple",
    },
    {
      name: "⩞",
      label: "Double Bar Wedge",
      latexFormat: "\\doublebarwedge",
      value: [],
      type: "simple",
    },
    {
      name: "⋋",
      label: "Left Three Times",
      latexFormat: "\\leftthreetimes",
      value: [],
      type: "simple",
    },
    {
      name: "≡",
      label: "Equivalent",
      latexFormat: "\\equiv",
      value: [],
      type: "simple",
    },
    {
      name: "≤",
      label: "Less Than or Equal To",
      latexFormat: "\\leq",
      value: [],
      type: "simple",
    },
    {
      name: "≥",
      label: "Greater Than or Equal To",
      latexFormat: "\\geq",
      value: [],
      type: "simple",
    },
    {
      name: "⊥",
      label: "Perpendicular",
      latexFormat: "\\perp",
      value: [],
      type: "simple",
    },
    {
      name: "≅",
      label: "Congruent",
      latexFormat: "\\cong",
      value: [],
      type: "simple",
    },
    {
      name: "≺",
      label: "Precedes",
      latexFormat: "\\prec",
      value: [],
      type: "simple",
    },
    {
      name: "≻",
      label: "Succeeds",
      latexFormat: "\\succ",
      value: [],
      type: "simple",
    },
    {
      name: "∣",
      label: "Divides",
      latexFormat: "\\mid",
      value: [],
      type: "simple",
    },
    {
      name: "≠",
      label: "Not Equal To",
      latexFormat: "\\neq",
      value: [],
      type: "simple",
    },
    {
      name: "⪯",
      label: "Precedes or Equal To",
      latexFormat: "\\preceq",
      value: [],
      type: "simple",
    },
    {
      name: "⪯",
      label: "Succeeds or Equal To",
      latexFormat: "\\succeq",
      value: [],
      type: "simple",
    },
    {
      name: "∥",
      label: "Parallel",
      latexFormat: "\\parallel",
      value: [],
      type: "simple",
    },
    {
      name: "∼",
      label: "Similar",
      latexFormat: "\\sim",
      value: [],
      type: "simple",
    },
    {
      name: "≪",
      label: "Much Less Than",
      latexFormat: "\\ll",
      value: [],
      type: "simple",
    },
    {
      name: "≫",
      label: "Much Greater Than",
      latexFormat: "\\gg",
      value: [],
      type: "simple",
    },
    {
      name: "⋈",
      label: "Bowtie",
      latexFormat: "\\bowtie",
      value: [],
      type: "simple",
    },
    {
      name: "≃",
      label: "Asymptotically Equal To",
      latexFormat: "\\simeq",
      value: [],
      type: "simple",
    },
    {
      name: "⊂",
      label: "Subset",
      latexFormat: "\\subset",
      value: [],
      type: "simple",
    },
    {
      name: "⊃",
      label: "Superset",
      latexFormat: "\\supset",
      value: [],
      type: "simple",
    },
    {
      name: "⋈",
      label: "Join",
      latexFormat: "\\Join",
      value: [],
      type: "simple",
    },
    {
      name: "≈",
      label: "Approximately Equal To",
      latexFormat: "\\approx",
      value: [],
      type: "simple",
    },
    {
      name: "⊆",
      label: "Subset or Equal To",
      latexFormat: "\\subseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊇",
      label: "Superset or Equal To",
      latexFormat: "\\supseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⋉",
      label: "Left Semidirect Product",
      latexFormat: "\\ltimes",
      value: [],
      type: "simple",
    },
    {
      name: "⋊",
      label: "Right Semidirect Product",
      latexFormat: "\\rtimes",
      value: [],
      type: "simple",
    },
    {
      name: "≐",
      label: "Corresponds To",
      latexFormat: "\\doteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊑",
      label: "Subset or Equal To",
      latexFormat: "\\sqsubseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊒",
      label: "Superset or Equal To",
      latexFormat: "\\sqsupseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⌣",
      label: "Smile",
      latexFormat: "\\smile",
      value: [],
      type: "simple",
    },
    {
      name: "∝",
      label: "Proportional To",
      latexFormat: "\\propto",
      value: [],
      type: "simple",
    },
    {
      name: "⊣",
      label: "Left Tack",
      latexFormat: "\\dashv",
      value: [],
      type: "simple",
    },
    {
      name: "⊣",
      label: "Turnstile",
      latexFormat: "\\vdash",
      value: [],
      type: "simple",
    },
    {
      name: "⌢",
      label: "Frown",
      latexFormat: "\\frown",
      value: [],
      type: "simple",
    },
    {
      name: "⊨",
      label: "Double Turnstile",
      latexFormat: "\\models",
      value: [],
      type: "simple",
    },
    {
      name: "∈",
      label: "Element Of",
      latexFormat: "\\in",
      value: [],
      type: "simple",
    },
    {
      name: "∋",
      label: "Contains As Member",
      latexFormat: "\\ni",
      value: [],
      type: "simple",
    },
    {
      name: "∼",
      label: "Similar",
      latexFormat: "\\sim",
      value: [],
      type: "simple",
    },
    {
      name: "≦",
      label: "Less Than or Equal To",
      latexFormat: "\\leqq",
      value: [],
      type: "simple",
    },
    {
      name: "≧",
      label: "Greater Than or Equal To",
      latexFormat: "\\geqq",
      value: [],
      type: "simple",
    },
    {
      name: "≶",
      label: "Less Than or Greater Than",
      latexFormat: "\\lessgtr",
      value: [],
      type: "simple",
    },
    {
      name: "∼",
      label: "Tilde Operator",
      latexFormat: "\\thicksim",
      value: [],
      type: "simple",
    },
    {
      name: "⩽",
      label: "Less Than or Equal To",
      latexFormat: "\\leqslant",
      value: [],
      type: "simple",
    },
    {
      name: "⩾",
      label: "Greater Than or Equal To",
      latexFormat: "\\geqslant",
      value: [],
      type: "simple",
    },
    {
      name: "⋚",
      label: "Less Than Equal To or Greater Than",
      latexFormat: "\\lesseqgtr",
      value: [],
      type: "simple",
    },
    {
      name: "∽",
      label: "Reverse Tilde",
      latexFormat: "\\backsim",
      value: [],
      type: "simple",
    },
    {
      name: "⪅",
      label: "Less Than or Approximately Equal To",
      latexFormat: "\\lessapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪆",
      label: "Greater Than or Approximately Equal To",
      latexFormat: "\\gtrapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪋",
      label: "Less Than Equal To or Greater Than",
      latexFormat: "\\lesseqqgtr",
      value: [],
      type: "simple",
    },
    {
      name: "⋍",
      label: "Reverse Tilde Equals",
      latexFormat: "\\backsimeq",
      value: [],
      type: "simple",
    },
    {
      name: "⋘",
      label: "Very Much Less Than",
      latexFormat: "\\lll",
      value: [],
      type: "simple",
    },
    {
      name: "⋙",
      label: "Very Much Greater Than",
      latexFormat: "\\ggg",
      value: [],
      type: "simple",
    },
    {
      name: "⪌",
      label: "Greater Than Equal To or Less Than",
      latexFormat: "\\gtreqqless",
      value: [],
      type: "simple",
    },
    {
      name: "≜",
      label: "Triangle equal",
      latexFormat: "\\triangleq",
      value: [],
      type: "simple",
    },
    {
      name: "⋖",
      label: "Less dot",
      latexFormat: "\\lessdot",
      value: [],
      type: "simple",
    },
    {
      name: "⋗",
      label: "Greater dot",
      latexFormat: "\\gtrdot",
      value: [],
      type: "simple",
    },
    {
      name: "⋛",
      label: "Greater equal less",
      latexFormat: "\\gtreqless",
      value: [],
      type: "simple",
    },
    {
      name: "≗",
      label: "Circled equal",
      latexFormat: "\\circeq",
      value: [],
      type: "simple",
    },
    {
      name: "≲",
      label: "Less similar",
      latexFormat: "\\lesssim",
      value: [],
      type: "simple",
    },
    {
      name: "≳",
      label: "Greater similar",
      latexFormat: "\\gtrsim",
      value: [],
      type: "simple",
    },
    {
      name: "≷",
      label: "Greater less",
      latexFormat: "\\gtrless",
      value: [],
      type: "simple",
    },
    {
      name: "≏",
      label: "Bumpy equal",
      latexFormat: "\\bumpeq",
      value: [],
      type: "simple",
    },
    {
      name: "⪕",
      label: "Equal slant less",
      latexFormat: "\\eqslantless",
      value: [],
      type: "simple",
    },
    {
      name: "⪖",
      label: "Equal slant greater",
      latexFormat: "\\eqslantgtr",
      value: [],
      type: "simple",
    },
    {
      name: "∍",
      label: "Back epsilon",
      latexFormat: "\\backepsilon",
      value: [],
      type: "simple",
    },
    {
      name: "≎",
      label: "Bumpy equal",
      latexFormat: "\\Bumpeq",
      value: [],
      type: "simple",
    },
    {
      name: "≾",
      label: "Precedes similar",
      latexFormat: "\\precsim",
      value: [],
      type: "simple",
    },
    {
      name: "≿",
      label: "Succeeds similar",
      latexFormat: "\\succsim",
      value: [],
      type: "simple",
    },
    {
      name: "≬",
      label: "Between",
      latexFormat: "\\between",
      value: [],
      type: "simple",
    },
    {
      name: "≑",
      label: "Dot equal dot",
      latexFormat: "\\doteqdot",
      value: [],
      type: "simple",
    },
    {
      name: "⪷",
      label: "Precedes approximate",
      latexFormat: "\\precapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪸",
      label: "Succeeds approximate",
      latexFormat: "\\succapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⋔",
      label: "Pitchfork",
      latexFormat: "\\pitchfork",
      value: [],
      type: "simple",
    },
    {
      name: "≈",
      label: "Thick approximate",
      latexFormat: "\\thickapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⋐",
      label: "Subset",
      latexFormat: "\\Subset",
      value: [],
      type: "simple",
    },
    {
      name: "⋑",
      label: "Supset",
      latexFormat: "\\Supset",
      value: [],
      type: "simple",
    },
    {
      name: "∣",
      label: "Short mid",
      latexFormat: "\\shortmid",
      value: [],
      type: "simple",
    },
    {
      name: "≒",
      label: "Falling dot equal",
      latexFormat: "\\fallingdotseq",
      value: [],
      type: "simple",
    },
    {
      name: "⫅",
      label: "Subset equal",
      latexFormat: "\\subseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "⫆",
      label: "Supset equal",
      latexFormat: "\\supseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "⌢",
      label: "Small frown",
      latexFormat: "\\smallfrown",
      value: [],
      type: "simple",
    },
    {
      name: "≓",
      label: "Rising dot equal",
      latexFormat: "\\risingdotseq",
      value: [],
      type: "simple",
    },
    {
      name: "⊏",
      label: "Square subset",
      latexFormat: "\\sqsubset",
      value: [],
      type: "simple",
    },
    {
      name: "⊐",
      label: "Square supset",
      latexFormat: "\\sqsupset",
      value: [],
      type: "simple",
    },
    {
      name: "⌣",
      label: "Small smile",
      latexFormat: "\\smallsmile",
      value: [],
      type: "simple",
    },
    {
      name: "∝",
      label: "Variation proportional to",
      latexFormat: "\\varpropto",
      value: [],
      type: "simple",
    },
    {
      name: "≼",
      label: "Precedes curly equal",
      latexFormat: "\\preccurlyeq",
      value: [],
      type: "simple",
    },
    {
      name: "≼",
      label: "Succeeds curly equal",
      latexFormat: "\\succcurlyeq",
      value: [],
      type: "simple",
    },
    {
      name: "⊩",
      label: "Double turnstile",
      latexFormat: "\\Vdash",
      value: [],
      type: "simple",
    },
    {
      name: "∴",
      label: "Therefore",
      latexFormat: "\\therefore",
      value: [],
      type: "simple",
    },
    {
      name: "⋞",
      label: "Curly equal precedes",
      latexFormat: "\\curlyeqprec",
      value: [],
      type: "simple",
    },
    {
      name: "⋟",
      label: "Curly equal succeeds",
      latexFormat: "\\curlyeqsucc",
      value: [],
      type: "simple",
    },
    {
      name: "⊨",
      label: "Double turnstile",
      latexFormat: "\\vDash",
      value: [],
      type: "simple",
    },
    {
      name: "∵",
      label: "Because",
      latexFormat: "\\because",
      value: [],
      type: "simple",
    },
    {
      name: "◀",
      label: "Black triangle left",
      latexFormat: "\\blacktriangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "▶",
      label: "Black triangle right",
      latexFormat: "\\blacktriangleright",
      value: [],
      type: "simple",
    },
    {
      name: "⊪",
      label: "Triple vertical dash",
      latexFormat: "\\Vvdash",
      value: [],
      type: "simple",
    },
    {
      name: "≖",
      label: "Circle equal",
      latexFormat: "\\eqcirc",
      value: [],
      type: "simple",
    },
    {
      name: "⊴",
      label: "Triangle left equal",
      latexFormat: "\\trianglelefteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊵",
      label: "Triangle right equal",
      latexFormat: "\\trianglerighteq",
      value: [],
      type: "simple",
    },
    {
      name: "∥",
      label: "Double vertical dash",
      latexFormat: "\\shortparallel",
      value: [],
      type: "simple",
    },
    {
      name: "≠",
      label: "Not equal",
      latexFormat: "\\neq",
      value: [],
      type: "simple",
    },
    {
      name: "⊲",
      label: "Triangle left",
      latexFormat: "\\vartriangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "⊳",
      label: "Triangle right",
      latexFormat: "\\vartriangleright",
      value: [],
      type: "simple",
    },
    {
      name: "∦",
      label: "Not parallel",
      latexFormat: "\\nshortparallel",
      value: [],
      type: "simple",
    },
    {
      name: "≆",
      label: "Not congruent",
      latexFormat: "\\ncong",
      value: [],
      type: "simple",
    },
    {
      name: "≰",
      label: "Not less equal",
      latexFormat: "\\nleq",
      value: [],
      type: "simple",
    },
    {
      name: "⊈",
      label: "Not subset equal",
      latexFormat: "\\nsubseteq",
      value: [],
      type: "simple",
    },
    {
      name: "∤",
      label: "Not mid",
      latexFormat: "\\nmid",
      value: [],
      type: "simple",
    },
    {
      name: "≰",
      label: "Not less equal equal",
      latexFormat: "\\nleqq",
      value: [],
      type: "simple",
    },
    {
      name: "≱",
      label: "Not greater equal equal",
      latexFormat: "\\ngeqq",
      value: [],
      type: "simple",
    },
    {
      name: "⊉",
      label: "Not superset equal",
      latexFormat: "\\nsupseteq",
      value: [],
      type: "simple",
    },
    {
      name: "∦",
      label: "Not parallel",
      latexFormat: "\\nparallel",
      value: [],
      type: "simple",
    },
    {
      name: "≰",
      label: "Not less equal slant",
      latexFormat: "\\nleqslant",
      value: [],
      type: "simple",
    },
    {
      name: "≱",
      label: "Not greater equal slant",
      latexFormat: "\\ngeqslant",
      value: [],
      type: "simple",
    },
    {
      name: "⊈",
      label: "Not subset equal equal",
      latexFormat: "\\nsubseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "∤",
      label: "Not short mid",
      latexFormat: "\\nshortmid",
      value: [],
      type: "simple",
    },
    {
      name: "≮",
      label: "Not less",
      latexFormat: "\\nless",
      value: [],
      type: "simple",
    },
    {
      name: "≯",
      label: "Not greater",
      latexFormat: "\\ngtr",
      value: [],
      type: "simple",
    },
    {
      name: "⊉",
      label: "Not superset equal equal",
      latexFormat: "\\nsupseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "∦",
      label: "Not parallel",
      latexFormat: "\\nshortparallel",
      value: [],
      type: "simple",
    },
    {
      name: "⊀",
      label: "Not precedes",
      latexFormat: "\\nprec",
      value: [],
      type: "simple",
    },
    {
      name: "⊁",
      label: "Not succeeds",
      latexFormat: "\\nsucc",
      value: [],
      type: "simple",
    },
    {
      name: "⊊",
      label: "Subset not equal",
      latexFormat: "\\subsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "≁",
      label: "Not similar",
      latexFormat: "\\nsim",
      value: [],
      type: "simple",
    },
    {
      name: "⋠",
      label: "Not precedes equal",
      latexFormat: "\\npreceq",
      value: [],
      type: "simple",
    },
    {
      name: "⋡",
      label: "Not succeeds equal",
      latexFormat: "\\nsucceq",
      value: [],
      type: "simple",
    },
    {
      name: "⊋",
      label: "Superset not equal",
      latexFormat: "\\supsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "⊯",
      label: "Not double turnstile",
      latexFormat: "\\nVDash",
      value: [],
      type: "simple",
    },
    {
      name: "⪹",
      label: "Precedes not approximate",
      latexFormat: "\\precnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪺",
      label: "Succeeds not approximate",
      latexFormat: "\\succnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⫋",
      label: "Subset not equal equal",
      latexFormat: "\\subsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⊭",
      label: "Not double turnstile",
      latexFormat: "\\nvDash",
      value: [],
      type: "simple",
    },
    {
      name: "⋨",
      label: "Not precedes similar",
      latexFormat: "\\precnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⋩",
      label: "Not succeeds similar",
      latexFormat: "\\succnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⫌",
      label: "Superset not equal equal",
      latexFormat: "\\supsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⊬",
      label: "Not double turnstile",
      latexFormat: "\\nvdash",
      value: [],
      type: "simple",
    },
    {
      name: "⪉",
      label: "Less not approximate",
      latexFormat: "\\lnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪊",
      label: "Greater not approximate",
      latexFormat: "\\gnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⊊",
      label: "Var subset not equal",
      latexFormat: "\\varsubsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "⋪",
      label: "Not triangle left",
      latexFormat: "\\ntriangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "⪇",
      label: "Less not equal",
      latexFormat: "\\lneq",
      value: [],
      type: "simple",
    },
    {
      name: "⪈",
      label: "Greater not equal",
      latexFormat: "\\gneq",
      value: [],
      type: "simple",
    },
    {
      name: "⪈",
      label: "Var superset not equal",
      latexFormat: "\\varsupsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "⋬",
      label: "Not triangle left equal",
      latexFormat: "\\ntrianglelefteq",
      value: [],
      type: "simple",
    },
    {
      name: "≨",
      label: "Less not equal",
      latexFormat: "\\lneqq",
      value: [],
      type: "simple",
    },
    {
      name: "≩",
      label: "Greater not equal",
      latexFormat: "\\gneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⫋",
      label: "Var subset not equal equal",
      latexFormat: "\\varsubsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⋫",
      label: "Not triangle right",
      latexFormat: "\\ntriangleright",
      value: [],
      type: "simple",
    },
    {
      name: "⋦",
      label: "Not less not similar",
      latexFormat: "\\lnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⋧",
      label: "Not greater not similar",
      latexFormat: "\\gnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⫌",
      label: "Var superset not equal equal",
      latexFormat: "\\varsupsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "←",
      label: "Left arrow",
      latexFormat: "\\leftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟵",
      label: "Long left arrow",
      latexFormat: "\\longleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↑",
      label: "Up arrow",
      latexFormat: "\\uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇐",
      label: "Left double arrow",
      latexFormat: "\\Leftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟸",
      label: "Long left double arrow",
      latexFormat: "\\Longleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇑",
      label: "Up double arrow",
      latexFormat: "\\Uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "→",
      label: "Right arrow",
      latexFormat: "\\rightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟶",
      label: "Long right arrow",
      latexFormat: "\\longrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↓",
      label: "Down arrow",
      latexFormat: "\\downarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇒",
      label: "Right double arrow",
      latexFormat: "\\Rightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟹",
      label: "Long right double arrow",
      latexFormat: "\\Longrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇓",
      label: "Down double arrow",
      latexFormat: "\\Downarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↔",
      label: "Left right arrow",
      latexFormat: "\\leftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟷",
      label: "Long left right arrow",
      latexFormat: "\\longleftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↕",
      label: "Up down arrow",
      latexFormat: "\\updownarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇔",
      label: "Left right double arrow",
      latexFormat: "\\Leftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟺",
      label: "Long left right double arrow",
      latexFormat: "\\Longleftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇕",
      label: "Up down double arrow",
      latexFormat: "\\Updownarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↦",
      label: "Right arrow with tail",
      latexFormat: "\\mapsto",
      value: [],
      type: "simple",
    },
    {
      name: "⟼",
      label: "Long right arrow with tail",
      latexFormat: "\\longmapsto",
      value: [],
      type: "simple",
    },
    {
      name: "↗",
      label: "North east arrow",
      latexFormat: "\\nearrow",
      value: [],
      type: "simple",
    },
    {
      name: "↩",
      label: "Left hook arrow",
      latexFormat: "\\hookleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↪",
      label: "Right hook arrow",
      latexFormat: "\\hookrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↘",
      label: "South east arrow",
      latexFormat: "\\searrow",
      value: [],
      type: "simple",
    },
    {
      name: "↼",
      label: "Left harpoon up",
      latexFormat: "\\leftharpoonup",
      value: [],
      type: "simple",
    },
    {
      name: "⇀",
      label: "Right harpoon up",
      latexFormat: "\\rightharpoonup",
      value: [],
      type: "simple",
    },
    {
      name: "↙",
      label: "South west arrow",
      latexFormat: "\\swarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↽",
      label: "Left harpoon down",
      latexFormat: "\\leftharpoondown",
      value: [],
      type: "simple",
    },
    {
      name: "⇁",
      label: "Right harpoon down",
      latexFormat: "\\rightharpoondown",
      value: [],
      type: "simple",
    },
    {
      name: "↖",
      label: "North west arrow",
      latexFormat: "\\nwarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇌",
      label: "Right left harpoons",
      latexFormat: "\\rightleftharpoons",
      value: [],
      type: "simple",
    },
    {
      name: "⇝",
      label: "Leadsto",
      latexFormat: "\\leadsto",
      value: [],
      type: "simple",
    },
    {
      name: "⇢",
      label: "Dashed right arrow",
      latexFormat: "\\dashrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇠",
      label: "Dashed left arrow",
      latexFormat: "\\dashleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇆",
      label: "Left right arrows",
      latexFormat: "\\leftrightarrows",
      value: [],
      type: "simple",
    },
    {
      name: "⇚",
      label: "Left left double arrow",
      latexFormat: "\\Lleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↞",
      label: "Two headed left arrow",
      latexFormat: "\\twoheadleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↢",
      label: "Left arrow with tail",
      latexFormat: "\\leftarrowtail",
      value: [],
      type: "simple",
    },
    {
      name: "↫",
      label: "Loop left arrow",
      latexFormat: "\\looparrowleft",
      value: [],
      type: "simple",
    },
    {
      name: "⇋",
      label: "Left right harpoons",
      latexFormat: "\\leftrightharpoons",
      value: [],
      type: "simple",
    },
    {
      name: "↶",
      label: "Curve left arrow",
      latexFormat: "\\curvearrowleft",
      value: [],
      type: "simple",
    },
    {
      name: "↺",
      label: "Circle left arrow",
      latexFormat: "\\circlearrowleft",
      value: [],
      type: "simple",
    },
    {
      name: "↰",
      label: "Lsh",
      latexFormat: "\\Lsh",
      value: [],
      type: "simple",
    },
    {
      name: "⇈",
      label: "Up up arrows",
      latexFormat: "\\upuparrows",
      value: [],
      type: "simple",
    },
    {
      name: "↿",
      label: "Up harpoon left",
      latexFormat: "\\upharpoonleft",
      value: [],
      type: "simple",
    },
    {
      name: "⇃",
      label: "Down harpoon left",
      latexFormat: "\\downharpoonleft",
      value: [],
      type: "simple",
    },
    {
      name: "⊸",
      label: "Multimap",
      latexFormat: "\\multimap",
      value: [],
      type: "simple",
    },
    {
      name: "↭",
      label: "Left right squig arrow",
      latexFormat: "\\leftrightsquigarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇉",
      label: "Right right arrows",
      latexFormat: "\\rightrightarrows",
      value: [],
      type: "simple",
    },
    {
      name: "⇄",
      label: "Right left arrows",
      latexFormat: "\\rightleftarrows",
      value: [],
      type: "simple",
    },
    {
      name: "↠",
      label: "Two headed right arrow",
      latexFormat: "\\twoheadrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↣",
      label: "Right arrow with tail",
      latexFormat: "\\rightarrowtail",
      value: [],
      type: "simple",
    },
    {
      name: "↬",
      label: "Loop right arrow",
      latexFormat: "\\looparrowright",
      value: [],
      type: "simple",
    },
    {
      name: "⇌",
      label: "Right left harpoons",
      latexFormat: "\\rightleftharpoons",
      value: [],
      type: "simple",
    },
    {
      name: "↷",
      label: "Curve right arrow",
      latexFormat: "\\curvearrowright",
      value: [],
      type: "simple",
    },
    {
      name: "↻",
      label: "Circle right arrow",
      latexFormat: "\\circlearrowright",
      value: [],
      type: "simple",
    },
    {
      name: "↱",
      label: "Rsh",
      latexFormat: "\\Rsh",
      value: [],
      type: "simple",
    },
    {
      name: "⇊",
      label: "Down down arrows",
      latexFormat: "\\downdownarrows",
      value: [],
      type: "simple",
    },
    {
      name: "↾",
      label: "Up harpoon right",
      latexFormat: "\\upharpoonright",
      value: [],
      type: "simple",
    },
    {
      name: "⇂",
      label: "Down harpoon right",
      latexFormat: "\\downharpoonright",
      value: [],
      type: "simple",
    },
    {
      name: "⇝",
      label: "Right squig arrow",
      latexFormat: "\\rightsquigarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↚",
      label: "Not left arrow",
      latexFormat: "\\nleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↛",
      label: "Not right arrow",
      latexFormat: "\\nrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇍",
      label: "Not left double arrow",
      latexFormat: "\\nLeftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇏",
      label: "Not right double arrow",
      latexFormat: "\\nRightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↮",
      label: "Not left right arrow",
      latexFormat: "\\nleftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇎",
      label: "Not left right double arrow",
      latexFormat: "\\nLeftrightarrow",
      value: [],
      type: "simple",
    },
  ];

  const mathConstructs = [
    {
      name: "Fraction",
      label: "Fraction",
      latexFormat: "\\frac{}{}",
      value1: [],
      value2: [],
      type: "complex",
    },
    {
      name: "Square Root",
      label: "Square Root",
      latexFormat: "\\sqrt{}",
      value: [],
      type: "complex",
    },
    {
      name: "Superscript",
      label: "Superscript",
      latexFormat: "^{}",
      value: [],
      type: "complex",
    },
    {
      name: "Subscript",
      label: "Subscript",
      latexFormat: "_{}",
      value: [],
      type: "complex",
    },
    {
      name: "Integral",
      label: "Integral",
      latexFormat: "\\int{}",
      value: [],
      type: "complex",
    },
  ];

  const greekAndHebrewLetters = [
    {
      name: "ω",
      label: "omega",
      latexFormat: "\\omega",
      value: [],
      type: "simple",
    },
    {
      name: "α",
      label: "alpha",
      latexFormat: "\\alpha",
      value: [],
      type: "simple",
    },
    {
      name: "β",
      label: "beta",
      latexFormat: "\\beta",
      value: [],
      type: "simple",
    },
    {
      name: "χ",
      label: "chi",
      latexFormat: "\\chi",
      value: [],
      type: "simple",
    },
    {
      name: "δ",
      label: "delta",
      latexFormat: "\\delta",
      value: [],
      type: "simple",
    },
    {
      name: "η",
      label: "eta",
      latexFormat: "\\eta",
      value: [],
      type: "simple",
    },
    {
      name: "γ",
      label: "gamma",
      latexFormat: "\\gamma",
      value: [],
      type: "simple",
    },
    {
      name: "ι",
      label: "iota",
      latexFormat: "\\iota",
      value: [],
      type: "simple",
    },
    {
      name: "κ",
      label: "kappa",
      latexFormat: "\\kappa",
      value: [],
      type: "simple",
    },
    {
      name: "λ",
      label: "lambda",
      latexFormat: "\\lambda",
      value: [],
      type: "simple",
    },
    { name: "µ", label: "mu", latexFormat: "\\mu", value: [], type: "simple" },
    { name: "ν", label: "nu", latexFormat: "\\nu", value: [], type: "simple" },
    { name: "o", label: "o", latexFormat: "o", value: [], type: "simple" },
    {
      name: "φ",
      label: "phi",
      latexFormat: "\\phi",
      value: [],
      type: "simple",
    },
    { name: "π", label: "pi", latexFormat: "\\pi", value: [], type: "simple" },
    {
      name: "ψ",
      label: "psi",
      latexFormat: "\\psi",
      value: [],
      type: "simple",
    },
    {
      name: "ρ",
      label: "rho",
      latexFormat: "\\rho",
      value: [],
      type: "simple",
    },
    {
      name: "σ",
      label: "sigma",
      latexFormat: "\\sigma",
      value: [],
      type: "simple",
    },
    {
      name: "τ",
      label: "tau",
      latexFormat: "\\tau",
      value: [],
      type: "simple",
    },
    {
      name: "θ",
      label: "theta",
      latexFormat: "\\theta",
      value: [],
      type: "simple",
    },
    {
      name: "υ",
      label: "upsilon",
      latexFormat: "\\upsilon",
      value: [],
      type: "simple",
    },
    {
      name: "φ",
      label: "varphi",
      latexFormat: "\\varphi",
      value: [],
      type: "simple",
    },
    {
      name: "Ω",
      label: "Omega",
      latexFormat: "\\Omega",
      value: [],
      type: "simple",
    },
    {
      name: "ε",
      label: "epsilon",
      latexFormat: "\\epsilon",
      value: [],
      type: "simple",
    },
    {
      name: "ϑ",
      label: "vartheta",
      latexFormat: "\\vartheta",
      value: [],
      type: "simple",
    },
    {
      name: "ϴ",
      label: "vartheta",
      latexFormat: "\\vartheta",
      value: [],
      type: "simple",
    },
    {
      name: "ϖ",
      label: "varpi",
      latexFormat: "\\varpi",
      value: [],
      type: "simple",
    },
    {
      name: "Φ",
      label: "Phi",
      latexFormat: "\\Phi",
      value: [],
      type: "simple",
    },
    {
      name: "ℵ",
      label: "aleph",
      latexFormat: "\\aleph",
      value: [],
      type: "simple",
    },
    {
      name: "ϱ",
      label: "varrho",
      latexFormat: "\\varrho",
      value: [],
      type: "simple",
    },
    { name: "Π", label: "Pi", latexFormat: "\\Pi", value: [], type: "simple" },
    {
      name: "i",
      label: "beth",
      latexFormat: "\\beth",
      value: [],
      type: "simple",
    },
    { name: "ξ", label: "xi", latexFormat: "\\xi", value: [], type: "simple" },
    {
      name: "ς",
      label: "varsigma",
      latexFormat: "\\varsigma",
      value: [],
      type: "simple",
    },
    {
      name: "Ψ",
      label: "Psi",
      latexFormat: "\\Psi",
      value: [],
      type: "simple",
    },
    {
      name: "k",
      label: "daleth",
      latexFormat: "\\daleth",
      value: [],
      type: "simple",
    },
    {
      name: "ζ",
      label: "zeta",
      latexFormat: "\\zeta",
      value: [],
      type: "simple",
    },
    {
      name: "Σ",
      label: "Sigma",
      latexFormat: "\\Sigma",
      value: [],
      type: "simple",
    },
    {
      name: "ג",
      label: "gimel",
      latexFormat: "\\gimel",
      value: [],
      type: "simple",
    },
  ];

  const delimiters = [
    {
      name: "⇑",
      label: "Uparrow",
      latexFormat: "\\Uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇓",
      label: "Downarrow",
      latexFormat: "\\Downarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↑",
      label: "uparrow",
      latexFormat: "\\uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "⌜",
      label: "ulcorner",
      latexFormat: "\\ulcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⌞",
      label: "llcorner",
      latexFormat: "\\llcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⌝",
      label: "urcorner",
      latexFormat: "\\urcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⌟",
      label: "lrcorner",
      latexFormat: "\\lrcorner",
      value: [],
      type: "simple",
    },
    {
      name: "⟨",
      label: "langle",
      latexFormat: "\\langle",
      value: [],
      type: "simple",
    },
    {
      name: "⟩",
      label: "rangle",
      latexFormat: "\\rangle",
      value: [],
      type: "simple",
    },
    {
      name: "⌈",
      label: "lceil",
      latexFormat: "\\lceil",
      value: [],
      type: "simple",
    },
    {
      name: "⌉",
      label: "rceil",
      latexFormat: "\\rceil",
      value: [],
      type: "simple",
    },
    {
      name: "⌊",
      label: "lfloor",
      latexFormat: "\\lfloor",
      value: [],
      type: "simple",
    },
    {
      name: "⌋",
      label: "rfloor",
      latexFormat: "\\rfloor",
      value: [],
      type: "simple",
    },
    {
      name: "[",
      label: "left square bracket",
      latexFormat: "[",
      value: [],
      type: "simple",
    },
    {
      name: "]",
      label: "right square bracket",
      latexFormat: "]",
      value: [],
      type: "simple",
    },
    {
      name: "|",
      label: "vertical bar",
      latexFormat: "|",
      value: [],
      type: "simple",
    },
    {
      name: "∣",
      label: "divides",
      latexFormat: "\\vert",
      value: [],
      type: "simple",
    },
    {
      name: "|",
      label: "vertical bar",
      latexFormat: "\\|",
      value: [],
      type: "simple",
    },
    {
      name: "∥",
      label: "parallel",
      latexFormat: "\\Vert",
      value: [],
      type: "simple",
    },
    {
      name: "{",
      label: "left curly brace",
      latexFormat: "\\{",
      value: [],
      type: "simple",
    },
    {
      name: "}",
      label: "right curly brace",
      latexFormat: "\\}",
      value: [],
      type: "simple",
    },
    {
      name: "\\",
      label: "backslash",
      latexFormat: "\\\\",
      value: [],
      type: "simple",
    },
    {
      name: "/",
      label: "forward slash",
      latexFormat: "/",
      value: [],
      type: "simple",
    },
    { name: "b", label: "b", latexFormat: "b", value: [], type: "simple" },
    { name: "c", label: "c", latexFormat: "c", value: [], type: "simple" },
    { name: "d", label: "d", latexFormat: "d", value: [], type: "simple" },
    { name: "e", label: "e", latexFormat: "e", value: [], type: "simple" },
    { name: "h", label: "h", latexFormat: "h", value: [], type: "simple" },
    { name: "i", label: "i", latexFormat: "i", value: [], type: "simple" },
    { name: "k", label: "k", latexFormat: "k", value: [], type: "simple" },
    { name: "p", label: "p", latexFormat: "p", value: [], type: "simple" },
    { name: "q", label: "q", latexFormat: "q", value: [], type: "simple" },
    { name: "x", label: "x", latexFormat: "x", value: [], type: "simple" },
    { name: "y", label: "y", latexFormat: "y", value: [], type: "simple" },
  ];

  const standardFunctionNames = [
    {
      name: "arccos",
      label: "arccosine",
      latexFormat: "\\arccos",
      value: [],
      type: "simple",
    },
    {
      name: "arcsin",
      label: "arcsine",
      latexFormat: "\\arcsin",
      value: [],
      type: "simple",
    },
    {
      name: "arctan",
      label: "arctangent",
      latexFormat: "\\arctan",
      value: [],
      type: "simple",
    },
    {
      name: "arg",
      label: "argument",
      latexFormat: "\\arg",
      value: [],
      type: "simple",
    },
    {
      name: "cos",
      label: "cosine",
      latexFormat: "\\cos",
      value: [],
      type: "simple",
    },
    {
      name: "cosh",
      label: "hyperbolic cosine",
      latexFormat: "\\cosh",
      value: [],
      type: "simple",
    },
    {
      name: "cot",
      label: "cotangent",
      latexFormat: "\\cot",
      value: [],
      type: "simple",
    },
    {
      name: "coth",
      label: "hyperbolic cotangent",
      latexFormat: "\\coth",
      value: [],
      type: "simple",
    },
    {
      name: "csc",
      label: "cosecant",
      latexFormat: "\\csc",
      value: [],
      type: "simple",
    },
    {
      name: "deg",
      label: "degree",
      latexFormat: "\\deg",
      value: [],
      type: "simple",
    },
    {
      name: "det",
      label: "determinant",
      latexFormat: "\\det",
      value: [],
      type: "simple",
    },
    {
      name: "dim",
      label: "dimension",
      latexFormat: "\\dim",
      value: [],
      type: "simple",
    },
    {
      name: "exp",
      label: "exponential",
      latexFormat: "\\exp",
      value: [],
      type: "simple",
    },
    {
      name: "gcd",
      label: "greatest common divisor",
      latexFormat: "\\gcd",
      value: [],
      type: "simple",
    },
    {
      name: "hom",
      label: "homomorphism",
      latexFormat: "\\hom",
      value: [],
      type: "simple",
    },
    {
      name: "inf",
      label: "infimum",
      latexFormat: "\\inf",
      value: [],
      type: "simple",
    },
    {
      name: "∞",
      label: "infinity",
      latexFormat: "\\infty",
      value: [],
      type: "simple",
    },
    {
      name: "ker",
      label: "kernel",
      latexFormat: "\\ker",
      value: [],
      type: "simple",
    },
    {
      name: "lg",
      label: "logarithm base 2",
      latexFormat: "\\lg",
      value: [],
      type: "simple",
    },
    {
      name: "lim",
      label: "limit",
      latexFormat: "\\lim",
      value: [],
      type: "simple",
    },
    {
      name: "liminf",
      label: "limit inferior",
      latexFormat: "\\liminf",
      value: [],
      type: "simple",
    },
    {
      name: "limsup",
      label: "limit superior",
      latexFormat: "\\limsup",
      value: [],
      type: "simple",
    },
    {
      name: "ln",
      label: "natural logarithm",
      latexFormat: "\\ln",
      value: [],
      type: "simple",
    },
    {
      name: "log",
      label: "logarithm",
      latexFormat: "\\log",
      value: [],
      type: "simple",
    },
    {
      name: "max",
      label: "maximum",
      latexFormat: "\\max",
      value: [],
      type: "simple",
    },
    {
      name: "min",
      label: "minimum",
      latexFormat: "\\min",
      value: [],
      type: "simple",
    },
    {
      name: "Pr",
      label: "probability",
      latexFormat: "\\Pr",
      value: [],
      type: "simple",
    },
    {
      name: "sec",
      label: "secant",
      latexFormat: "\\sec",
      value: [],
      type: "simple",
    },
    {
      name: "sin",
      label: "sine",
      latexFormat: "\\sin",
      value: [],
      type: "simple",
    },
    {
      name: "sinh",
      label: "hyperbolic sine",
      latexFormat: "\\sinh",
      value: [],
      type: "simple",
    },
    {
      name: "sup",
      label: "supremum",
      latexFormat: "\\sup",
      value: [],
      type: "simple",
    },
    {
      name: "tan",
      label: "tangent",
      latexFormat: "\\tan",
      value: [],
      type: "simple",
    },
    {
      name: "tanh",
      label: "hyperbolic tangent",
      latexFormat: "\\tanh",
      value: [],
      type: "simple",
    },
  ];

  const binaryOperationAndRelationSymbols = [
    {
      name: "*",
      label: "Asterisk",
      latexFormat: "\\ast",
      value: [],
      type: "simple",
    },
    {
      name: "±",
      label: "Plus-Minus",
      latexFormat: "\\pm",
      value: [],
      type: "simple",
    },
    {
      name: "∩",
      label: "Intersection",
      latexFormat: "\\cap",
      value: [],
      type: "simple",
    },
    {
      name: "⊲",
      label: "Normal Subgroup",
      latexFormat: "\\lhd",
      value: [],
      type: "simple",
    },
    {
      name: "⋆",
      label: "Star",
      latexFormat: "\\star",
      value: [],
      type: "simple",
    },
    {
      name: "∓",
      label: "Minus-Plus",
      latexFormat: "\\mp",
      value: [],
      type: "simple",
    },
    {
      name: "∪",
      label: "Union",
      latexFormat: "\\cup",
      value: [],
      type: "simple",
    },
    {
      name: "⊳",
      label: "Normal Subgroup",
      latexFormat: "\\rhd",
      value: [],
      type: "simple",
    },
    {
      name: "⋅",
      label: "Dot",
      latexFormat: "\\cdot",
      value: [],
      type: "simple",
    },
    {
      name: "⨿",
      label: "Amalgamation",
      latexFormat: "\\amalg",
      value: [],
      type: "simple",
    },
    {
      name: "⊎",
      label: "Multiset Union",
      latexFormat: "\\uplus",
      value: [],
      type: "simple",
    },
    {
      name: "◃",
      label: "Left Triangle",
      latexFormat: "\\triangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "∘",
      label: "Composition",
      latexFormat: "\\circ",
      value: [],
      type: "simple",
    },
    {
      name: "⊙",
      label: "Circle Dot",
      latexFormat: "\\odot",
      value: [],
      type: "simple",
    },
    {
      name: "⊓",
      label: "Square Intersection",
      latexFormat: "\\sqcap",
      value: [],
      type: "simple",
    },
    {
      name: "▹",
      label: "Right Triangle",
      latexFormat: "\\triangleright",
      value: [],
      type: "simple",
    },
    {
      name: "∙",
      label: "Bullet",
      latexFormat: "\\bullet",
      value: [],
      type: "simple",
    },
    {
      name: "⊕",
      label: "Circle Plus",
      latexFormat: "\\oplus",
      value: [],
      type: "simple",
    },
    {
      name: "∧",
      label: "Wedge",
      latexFormat: "\\wedge",
      value: [],
      type: "simple",
    },
    {
      name: "⊵",
      label: "Normal Subgroup",
      latexFormat: "\\unrhd",
      value: [],
      type: "simple",
    },
    {
      name: "⋄",
      label: "Diamond",
      latexFormat: "\\diamond",
      value: [],
      type: "simple",
    },
    {
      name: "⊘",
      label: "Circle Slash",
      latexFormat: "\\oslash",
      value: [],
      type: "simple",
    },
    {
      name: "∨",
      label: "Vee",
      latexFormat: "\\vee",
      value: [],
      type: "simple",
    },
    {
      name: "▽",
      label: "Big Down Triangle",
      latexFormat: "\\bigtriangledown",
      value: [],
      type: "simple",
    },
    {
      name: "×",
      label: "Times",
      latexFormat: "\\times",
      value: [],
      type: "simple",
    },
    {
      name: "⊗",
      label: "Circle Times",
      latexFormat: "\\otimes",
      value: [],
      type: "simple",
    },
    {
      name: "†",
      label: "Dagger",
      latexFormat: "\\dagger",
      value: [],
      type: "simple",
    },
    {
      name: "△",
      label: "Big Up Triangle",
      latexFormat: "\\bigtriangleup",
      value: [],
      type: "simple",
    },
    {
      name: "÷",
      label: "Division",
      latexFormat: "\\div",
      value: [],
      type: "simple",
    },
    {
      name: "≀",
      label: "Wreath Product",
      latexFormat: "\\wr",
      value: [],
      type: "simple",
    },
    {
      name: "‡",
      label: "Double Dagger",
      latexFormat: "\\ddagger",
      value: [],
      type: "simple",
    },
    {
      name: " \\",
      label: "Set Minus",
      latexFormat: "\\setminus",
      value: [],
      type: "simple",
    },
    {
      name: "⋅",
      label: "Center Dot",
      latexFormat: "\\centerdot",
      value: [],
      type: "simple",
    },
    {
      name: "⊼",
      label: "Bar Wedge",
      latexFormat: "\\barwedge",
      value: [],
      type: "simple",
    },
    {
      name: "⊻",
      label: "XOR",
      latexFormat: "\\veebar",
      value: [],
      type: "simple",
    },
    {
      name: "⊛",
      label: "Circled Asterisk",
      latexFormat: "\\circledast",
      value: [],
      type: "simple",
    },
    {
      name: "⊞",
      label: "Box Plus",
      latexFormat: "\\boxplus",
      value: [],
      type: "simple",
    },
    {
      name: "⋏",
      label: "Curly Wedge",
      latexFormat: "\\curlywedge",
      value: [],
      type: "simple",
    },
    {
      name: "⋎",
      label: "Curly Vee",
      latexFormat: "\\curlyvee",
      value: [],
      type: "simple",
    },
    {
      name: "⊚",
      label: "Circled Circle",
      latexFormat: "\\circledcirc",
      value: [],
      type: "simple",
    },
    {
      name: "⊟",
      label: "Box Minus",
      latexFormat: "\\boxminus",
      value: [],
      type: "simple",
    },
    {
      name: "⋒",
      label: "Intersection with Plus",
      latexFormat: "\\Cap",
      value: [],
      type: "simple",
    },
    {
      name: "⋓",
      label: "Union with Plus",
      latexFormat: "\\Cup",
      value: [],
      type: "simple",
    },
    {
      name: "⊝",
      label: "Circled Dash",
      latexFormat: "\\circleddash",
      value: [],
      type: "simple",
    },
    {
      name: "⊠",
      label: "Box Times",
      latexFormat: "\\boxtimes",
      value: [],
      type: "simple",
    },
    {
      name: "⊥",
      label: "Perpendicular",
      latexFormat: "\\bot",
      value: [],
      type: "simple",
    },
    {
      name: "⊤",
      label: "Top",
      latexFormat: "\\top",
      value: [],
      type: "simple",
    },
    {
      name: "⋌",
      label: "Right Three Times",
      latexFormat: "\\rightthreetimes",
      value: [],
      type: "simple",
    },
    {
      name: "≅",
      label: "Divide on Times",
      latexFormat: "\\divideontimes",
      value: [],
      type: "simple",
    },
    {
      name: "⩞",
      label: "Double Bar Wedge",
      latexFormat: "\\doublebarwedge",
      value: [],
      type: "simple",
    },
    {
      name: "⋋",
      label: "Left Three Times",
      latexFormat: "\\leftthreetimes",
      value: [],
      type: "simple",
    },
    {
      name: "≡",
      label: "Equivalent",
      latexFormat: "\\equiv",
      value: [],
      type: "simple",
    },
    {
      name: "≤",
      label: "Less Than or Equal To",
      latexFormat: "\\leq",
      value: [],
      type: "simple",
    },
    {
      name: "≥",
      label: "Greater Than or Equal To",
      latexFormat: "\\geq",
      value: [],
      type: "simple",
    },
    {
      name: "⊥",
      label: "Perpendicular",
      latexFormat: "\\perp",
      value: [],
      type: "simple",
    },
    {
      name: "≅",
      label: "Congruent",
      latexFormat: "\\cong",
      value: [],
      type: "simple",
    },
    {
      name: "≺",
      label: "Precedes",
      latexFormat: "\\prec",
      value: [],
      type: "simple",
    },
    {
      name: "≻",
      label: "Succeeds",
      latexFormat: "\\succ",
      value: [],
      type: "simple",
    },
    {
      name: "∣",
      label: "Divides",
      latexFormat: "\\mid",
      value: [],
      type: "simple",
    },
    {
      name: "≠",
      label: "Not Equal To",
      latexFormat: "\\neq",
      value: [],
      type: "simple",
    },
    {
      name: "⪯",
      label: "Precedes or Equal To",
      latexFormat: "\\preceq",
      value: [],
      type: "simple",
    },
    {
      name: "⪯",
      label: "Succeeds or Equal To",
      latexFormat: "\\succeq",
      value: [],
      type: "simple",
    },
    {
      name: "∥",
      label: "Parallel",
      latexFormat: "\\parallel",
      value: [],
      type: "simple",
    },
    {
      name: "∼",
      label: "Similar",
      latexFormat: "\\sim",
      value: [],
      type: "simple",
    },
    {
      name: "≪",
      label: "Much Less Than",
      latexFormat: "\\ll",
      value: [],
      type: "simple",
    },
    {
      name: "≫",
      label: "Much Greater Than",
      latexFormat: "\\gg",
      value: [],
      type: "simple",
    },
    {
      name: "⋈",
      label: "Bowtie",
      latexFormat: "\\bowtie",
      value: [],
      type: "simple",
    },
    {
      name: "≃",
      label: "Asymptotically Equal To",
      latexFormat: "\\simeq",
      value: [],
      type: "simple",
    },
    {
      name: "⊂",
      label: "Subset",
      latexFormat: "\\subset",
      value: [],
      type: "simple",
    },
    {
      name: "⊃",
      label: "Superset",
      latexFormat: "\\supset",
      value: [],
      type: "simple",
    },
    {
      name: "⋈",
      label: "Join",
      latexFormat: "\\Join",
      value: [],
      type: "simple",
    },
    {
      name: "≈",
      label: "Approximately Equal To",
      latexFormat: "\\approx",
      value: [],
      type: "simple",
    },
    {
      name: "⊆",
      label: "Subset or Equal To",
      latexFormat: "\\subseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊇",
      label: "Superset or Equal To",
      latexFormat: "\\supseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⋉",
      label: "Left Semidirect Product",
      latexFormat: "\\ltimes",
      value: [],
      type: "simple",
    },
    {
      name: "⋊",
      label: "Right Semidirect Product",
      latexFormat: "\\rtimes",
      value: [],
      type: "simple",
    },
    {
      name: "≐",
      label: "Corresponds To",
      latexFormat: "\\doteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊑",
      label: "Subset or Equal To",
      latexFormat: "\\sqsubseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊒",
      label: "Superset or Equal To",
      latexFormat: "\\sqsupseteq",
      value: [],
      type: "simple",
    },
    {
      name: "⌣",
      label: "Smile",
      latexFormat: "\\smile",
      value: [],
      type: "simple",
    },
    {
      name: "∝",
      label: "Proportional To",
      latexFormat: "\\propto",
      value: [],
      type: "simple",
    },
    {
      name: "⊣",
      label: "Left Tack",
      latexFormat: "\\dashv",
      value: [],
      type: "simple",
    },
    {
      name: "⊣",
      label: "Turnstile",
      latexFormat: "\\vdash",
      value: [],
      type: "simple",
    },
    {
      name: "⌢",
      label: "Frown",
      latexFormat: "\\frown",
      value: [],
      type: "simple",
    },
    {
      name: "⊨",
      label: "Double Turnstile",
      latexFormat: "\\models",
      value: [],
      type: "simple",
    },
    {
      name: "∈",
      label: "Element Of",
      latexFormat: "\\in",
      value: [],
      type: "simple",
    },
    {
      name: "∋",
      label: "Contains As Member",
      latexFormat: "\\ni",
      value: [],
      type: "simple",
    },
    {
      name: "∼",
      label: "Similar",
      latexFormat: "\\sim",
      value: [],
      type: "simple",
    },
    {
      name: "≦",
      label: "Less Than or Equal To",
      latexFormat: "\\leqq",
      value: [],
      type: "simple",
    },
    {
      name: "≧",
      label: "Greater Than or Equal To",
      latexFormat: "\\geqq",
      value: [],
      type: "simple",
    },
    {
      name: "≶",
      label: "Less Than or Greater Than",
      latexFormat: "\\lessgtr",
      value: [],
      type: "simple",
    },
    {
      name: "∼",
      label: "Tilde Operator",
      latexFormat: "\\thicksim",
      value: [],
      type: "simple",
    },
    {
      name: "⩽",
      label: "Less Than or Equal To",
      latexFormat: "\\leqslant",
      value: [],
      type: "simple",
    },
    {
      name: "⩾",
      label: "Greater Than or Equal To",
      latexFormat: "\\geqslant",
      value: [],
      type: "simple",
    },
    {
      name: "⋚",
      label: "Less Than Equal To or Greater Than",
      latexFormat: "\\lesseqgtr",
      value: [],
      type: "simple",
    },
    {
      name: "∽",
      label: "Reverse Tilde",
      latexFormat: "\\backsim",
      value: [],
      type: "simple",
    },
    {
      name: "⪅",
      label: "Less Than or Approximately Equal To",
      latexFormat: "\\lessapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪆",
      label: "Greater Than or Approximately Equal To",
      latexFormat: "\\gtrapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪋",
      label: "Less Than Equal To or Greater Than",
      latexFormat: "\\lesseqqgtr",
      value: [],
      type: "simple",
    },
    {
      name: "⋍",
      label: "Reverse Tilde Equals",
      latexFormat: "\\backsimeq",
      value: [],
      type: "simple",
    },
    {
      name: "⋘",
      label: "Very Much Less Than",
      latexFormat: "\\lll",
      value: [],
      type: "simple",
    },
    {
      name: "⋙",
      label: "Very Much Greater Than",
      latexFormat: "\\ggg",
      value: [],
      type: "simple",
    },
    {
      name: "⪌",
      label: "Greater Than Equal To or Less Than",
      latexFormat: "\\gtreqqless",
      value: [],
      type: "simple",
    },
    {
      name: "≜",
      label: "Triangle equal",
      latexFormat: "\\triangleq",
      value: [],
      type: "simple",
    },
    {
      name: "⋖",
      label: "Less dot",
      latexFormat: "\\lessdot",
      value: [],
      type: "simple",
    },
    {
      name: "⋗",
      label: "Greater dot",
      latexFormat: "\\gtrdot",
      value: [],
      type: "simple",
    },
    {
      name: "⋛",
      label: "Greater equal less",
      latexFormat: "\\gtreqless",
      value: [],
      type: "simple",
    },
    {
      name: "≗",
      label: "Circled equal",
      latexFormat: "\\circeq",
      value: [],
      type: "simple",
    },
    {
      name: "≲",
      label: "Less similar",
      latexFormat: "\\lesssim",
      value: [],
      type: "simple",
    },
    {
      name: "≳",
      label: "Greater similar",
      latexFormat: "\\gtrsim",
      value: [],
      type: "simple",
    },
    {
      name: "≷",
      label: "Greater less",
      latexFormat: "\\gtrless",
      value: [],
      type: "simple",
    },
    {
      name: "≏",
      label: "Bumpy equal",
      latexFormat: "\\bumpeq",
      value: [],
      type: "simple",
    },
    {
      name: "⪕",
      label: "Equal slant less",
      latexFormat: "\\eqslantless",
      value: [],
      type: "simple",
    },
    {
      name: "⪖",
      label: "Equal slant greater",
      latexFormat: "\\eqslantgtr",
      value: [],
      type: "simple",
    },
    {
      name: "∍",
      label: "Back epsilon",
      latexFormat: "\\backepsilon",
      value: [],
      type: "simple",
    },
    {
      name: "≎",
      label: "Bumpy equal",
      latexFormat: "\\Bumpeq",
      value: [],
      type: "simple",
    },
    {
      name: "≾",
      label: "Precedes similar",
      latexFormat: "\\precsim",
      value: [],
      type: "simple",
    },
    {
      name: "≿",
      label: "Succeeds similar",
      latexFormat: "\\succsim",
      value: [],
      type: "simple",
    },
    {
      name: "≬",
      label: "Between",
      latexFormat: "\\between",
      value: [],
      type: "simple",
    },
    {
      name: "≑",
      label: "Dot equal dot",
      latexFormat: "\\doteqdot",
      value: [],
      type: "simple",
    },
    {
      name: "⪷",
      label: "Precedes approximate",
      latexFormat: "\\precapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪸",
      label: "Succeeds approximate",
      latexFormat: "\\succapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⋔",
      label: "Pitchfork",
      latexFormat: "\\pitchfork",
      value: [],
      type: "simple",
    },
    {
      name: "≈",
      label: "Thick approximate",
      latexFormat: "\\thickapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⋐",
      label: "Subset",
      latexFormat: "\\Subset",
      value: [],
      type: "simple",
    },
    {
      name: "⋑",
      label: "Supset",
      latexFormat: "\\Supset",
      value: [],
      type: "simple",
    },
    {
      name: "∣",
      label: "Short mid",
      latexFormat: "\\shortmid",
      value: [],
      type: "simple",
    },
    {
      name: "≒",
      label: "Falling dot equal",
      latexFormat: "\\fallingdotseq",
      value: [],
      type: "simple",
    },
    {
      name: "⫅",
      label: "Subset equal",
      latexFormat: "\\subseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "⫆",
      label: "Supset equal",
      latexFormat: "\\supseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "⌢",
      label: "Small frown",
      latexFormat: "\\smallfrown",
      value: [],
      type: "simple",
    },
    {
      name: "≓",
      label: "Rising dot equal",
      latexFormat: "\\risingdotseq",
      value: [],
      type: "simple",
    },
    {
      name: "⊏",
      label: "Square subset",
      latexFormat: "\\sqsubset",
      value: [],
      type: "simple",
    },
    {
      name: "⊐",
      label: "Square supset",
      latexFormat: "\\sqsupset",
      value: [],
      type: "simple",
    },
    {
      name: "⌣",
      label: "Small smile",
      latexFormat: "\\smallsmile",
      value: [],
      type: "simple",
    },
    {
      name: "∝",
      label: "Variation proportional to",
      latexFormat: "\\varpropto",
      value: [],
      type: "simple",
    },
    {
      name: "≼",
      label: "Precedes curly equal",
      latexFormat: "\\preccurlyeq",
      value: [],
      type: "simple",
    },
    {
      name: "≼",
      label: "Succeeds curly equal",
      latexFormat: "\\succcurlyeq",
      value: [],
      type: "simple",
    },
    {
      name: "⊩",
      label: "Double turnstile",
      latexFormat: "\\Vdash",
      value: [],
      type: "simple",
    },
    {
      name: "∴",
      label: "Therefore",
      latexFormat: "\\therefore",
      value: [],
      type: "simple",
    },
    {
      name: "⋞",
      label: "Curly equal precedes",
      latexFormat: "\\curlyeqprec",
      value: [],
      type: "simple",
    },
    {
      name: "⋟",
      label: "Curly equal succeeds",
      latexFormat: "\\curlyeqsucc",
      value: [],
      type: "simple",
    },
    {
      name: "⊨",
      label: "Double turnstile",
      latexFormat: "\\vDash",
      value: [],
      type: "simple",
    },
    {
      name: "∵",
      label: "Because",
      latexFormat: "\\because",
      value: [],
      type: "simple",
    },
    {
      name: "◀",
      label: "Black triangle left",
      latexFormat: "\\blacktriangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "▶",
      label: "Black triangle right",
      latexFormat: "\\blacktriangleright",
      value: [],
      type: "simple",
    },
    {
      name: "⊪",
      label: "Triple vertical dash",
      latexFormat: "\\Vvdash",
      value: [],
      type: "simple",
    },
    {
      name: "≖",
      label: "Circle equal",
      latexFormat: "\\eqcirc",
      value: [],
      type: "simple",
    },
    {
      name: "⊴",
      label: "Triangle left equal",
      latexFormat: "\\trianglelefteq",
      value: [],
      type: "simple",
    },
    {
      name: "⊵",
      label: "Triangle right equal",
      latexFormat: "\\trianglerighteq",
      value: [],
      type: "simple",
    },
    {
      name: "∥",
      label: "Double vertical dash",
      latexFormat: "\\shortparallel",
      value: [],
      type: "simple",
    },
    {
      name: "≠",
      label: "Not equal",
      latexFormat: "\\neq",
      value: [],
      type: "simple",
    },
    {
      name: "⊲",
      label: "Triangle left",
      latexFormat: "\\vartriangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "⊳",
      label: "Triangle right",
      latexFormat: "\\vartriangleright",
      value: [],
      type: "simple",
    },
    {
      name: "∦",
      label: "Not parallel",
      latexFormat: "\\nshortparallel",
      value: [],
      type: "simple",
    },
    {
      name: "≆",
      label: "Not congruent",
      latexFormat: "\\ncong",
      value: [],
      type: "simple",
    },
    {
      name: "≰",
      label: "Not less equal",
      latexFormat: "\\nleq",
      value: [],
      type: "simple",
    },
    {
      name: "⊈",
      label: "Not subset equal",
      latexFormat: "\\nsubseteq",
      value: [],
      type: "simple",
    },
    {
      name: "∤",
      label: "Not mid",
      latexFormat: "\\nmid",
      value: [],
      type: "simple",
    },
    {
      name: "≰",
      label: "Not less equal equal",
      latexFormat: "\\nleqq",
      value: [],
      type: "simple",
    },
    {
      name: "≱",
      label: "Not greater equal equal",
      latexFormat: "\\ngeqq",
      value: [],
      type: "simple",
    },
    {
      name: "⊉",
      label: "Not superset equal",
      latexFormat: "\\nsupseteq",
      value: [],
      type: "simple",
    },
    {
      name: "∦",
      label: "Not parallel",
      latexFormat: "\\nparallel",
      value: [],
      type: "simple",
    },
    {
      name: "≰",
      label: "Not less equal slant",
      latexFormat: "\\nleqslant",
      value: [],
      type: "simple",
    },
    {
      name: "≱",
      label: "Not greater equal slant",
      latexFormat: "\\ngeqslant",
      value: [],
      type: "simple",
    },
    {
      name: "⊈",
      label: "Not subset equal equal",
      latexFormat: "\\nsubseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "∤",
      label: "Not short mid",
      latexFormat: "\\nshortmid",
      value: [],
      type: "simple",
    },
    {
      name: "≮",
      label: "Not less",
      latexFormat: "\\nless",
      value: [],
      type: "simple",
    },
    {
      name: "≯",
      label: "Not greater",
      latexFormat: "\\ngtr",
      value: [],
      type: "simple",
    },
    {
      name: "⊉",
      label: "Not superset equal equal",
      latexFormat: "\\nsupseteqq",
      value: [],
      type: "simple",
    },
    {
      name: "∦",
      label: "Not parallel",
      latexFormat: "\\nshortparallel",
      value: [],
      type: "simple",
    },
    {
      name: "⊀",
      label: "Not precedes",
      latexFormat: "\\nprec",
      value: [],
      type: "simple",
    },
    {
      name: "⊁",
      label: "Not succeeds",
      latexFormat: "\\nsucc",
      value: [],
      type: "simple",
    },
    {
      name: "⊊",
      label: "Subset not equal",
      latexFormat: "\\subsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "≁",
      label: "Not similar",
      latexFormat: "\\nsim",
      value: [],
      type: "simple",
    },
    {
      name: "⋠",
      label: "Not precedes equal",
      latexFormat: "\\npreceq",
      value: [],
      type: "simple",
    },
    {
      name: "⋡",
      label: "Not succeeds equal",
      latexFormat: "\\nsucceq",
      value: [],
      type: "simple",
    },
    {
      name: "⊋",
      label: "Superset not equal",
      latexFormat: "\\supsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "⊯",
      label: "Not double turnstile",
      latexFormat: "\\nVDash",
      value: [],
      type: "simple",
    },
    {
      name: "⪹",
      label: "Precedes not approximate",
      latexFormat: "\\precnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪺",
      label: "Succeeds not approximate",
      latexFormat: "\\succnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⫋",
      label: "Subset not equal equal",
      latexFormat: "\\subsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⊭",
      label: "Not double turnstile",
      latexFormat: "\\nvDash",
      value: [],
      type: "simple",
    },
    {
      name: "⋨",
      label: "Not precedes similar",
      latexFormat: "\\precnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⋩",
      label: "Not succeeds similar",
      latexFormat: "\\succnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⫌",
      label: "Superset not equal equal",
      latexFormat: "\\supsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⊬",
      label: "Not double turnstile",
      latexFormat: "\\nvdash",
      value: [],
      type: "simple",
    },
    {
      name: "⪉",
      label: "Less not approximate",
      latexFormat: "\\lnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⪊",
      label: "Greater not approximate",
      latexFormat: "\\gnapprox",
      value: [],
      type: "simple",
    },
    {
      name: "⊊",
      label: "Var subset not equal",
      latexFormat: "\\varsubsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "⋪",
      label: "Not triangle left",
      latexFormat: "\\ntriangleleft",
      value: [],
      type: "simple",
    },
    {
      name: "⪇",
      label: "Less not equal",
      latexFormat: "\\lneq",
      value: [],
      type: "simple",
    },
    {
      name: "⪈",
      label: "Greater not equal",
      latexFormat: "\\gneq",
      value: [],
      type: "simple",
    },
    {
      name: "⪈",
      label: "Var superset not equal",
      latexFormat: "\\varsupsetneq",
      value: [],
      type: "simple",
    },
    {
      name: "⋬",
      label: "Not triangle left equal",
      latexFormat: "\\ntrianglelefteq",
      value: [],
      type: "simple",
    },
    {
      name: "≨",
      label: "Less not equal",
      latexFormat: "\\lneqq",
      value: [],
      type: "simple",
    },
    {
      name: "≩",
      label: "Greater not equal",
      latexFormat: "\\gneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⫋",
      label: "Var subset not equal equal",
      latexFormat: "\\varsubsetneqq",
      value: [],
      type: "simple",
    },
    {
      name: "⋫",
      label: "Not triangle right",
      latexFormat: "\\ntriangleright",
      value: [],
      type: "simple",
    },
    {
      name: "⋦",
      label: "Not less not similar",
      latexFormat: "\\lnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⋧",
      label: "Not greater not similar",
      latexFormat: "\\gnsim",
      value: [],
      type: "simple",
    },
    {
      name: "⫌",
      label: "Var superset not equal equal",
      latexFormat: "\\varsupsetneqq",
      value: [],
      type: "simple",
    },
  ];

  const arrowSymbols = [
    {
      name: "←",
      label: "Left arrow",
      latexFormat: "\\leftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟵",
      label: "Long left arrow",
      latexFormat: "\\longleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↑",
      label: "Up arrow",
      latexFormat: "\\uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇐",
      label: "Left double arrow",
      latexFormat: "\\Leftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟸",
      label: "Long left double arrow",
      latexFormat: "\\Longleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇑",
      label: "Up double arrow",
      latexFormat: "\\Uparrow",
      value: [],
      type: "simple",
    },
    {
      name: "→",
      label: "Right arrow",
      latexFormat: "\\rightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟶",
      label: "Long right arrow",
      latexFormat: "\\longrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↓",
      label: "Down arrow",
      latexFormat: "\\downarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇒",
      label: "Right double arrow",
      latexFormat: "\\Rightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟹",
      label: "Long right double arrow",
      latexFormat: "\\Longrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇓",
      label: "Down double arrow",
      latexFormat: "\\Downarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↔",
      label: "Left right arrow",
      latexFormat: "\\leftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟷",
      label: "Long left right arrow",
      latexFormat: "\\longleftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↕",
      label: "Up down arrow",
      latexFormat: "\\updownarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇔",
      label: "Left right double arrow",
      latexFormat: "\\Leftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⟺",
      label: "Long left right double arrow",
      latexFormat: "\\Longleftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇕",
      label: "Up down double arrow",
      latexFormat: "\\Updownarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↦",
      label: "Right arrow with tail",
      latexFormat: "\\mapsto",
      value: [],
      type: "simple",
    },
    {
      name: "⟼",
      label: "Long right arrow with tail",
      latexFormat: "\\longmapsto",
      value: [],
      type: "simple",
    },
    {
      name: "↗",
      label: "North east arrow",
      latexFormat: "\\nearrow",
      value: [],
      type: "simple",
    },
    {
      name: "↩",
      label: "Left hook arrow",
      latexFormat: "\\hookleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↪",
      label: "Right hook arrow",
      latexFormat: "\\hookrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↘",
      label: "South east arrow",
      latexFormat: "\\searrow",
      value: [],
      type: "simple",
    },
    {
      name: "↼",
      label: "Left harpoon up",
      latexFormat: "\\leftharpoonup",
      value: [],
      type: "simple",
    },
    {
      name: "⇀",
      label: "Right harpoon up",
      latexFormat: "\\rightharpoonup",
      value: [],
      type: "simple",
    },
    {
      name: "↙",
      label: "South west arrow",
      latexFormat: "\\swarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↽",
      label: "Left harpoon down",
      latexFormat: "\\leftharpoondown",
      value: [],
      type: "simple",
    },
    {
      name: "⇁",
      label: "Right harpoon down",
      latexFormat: "\\rightharpoondown",
      value: [],
      type: "simple",
    },
    {
      name: "↖",
      label: "North west arrow",
      latexFormat: "\\nwarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇌",
      label: "Right left harpoons",
      latexFormat: "\\rightleftharpoons",
      value: [],
      type: "simple",
    },
    {
      name: "⇝",
      label: "Leadsto",
      latexFormat: "\\leadsto",
      value: [],
      type: "simple",
    },
    {
      name: "⇢",
      label: "Dashed right arrow",
      latexFormat: "\\dashrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇠",
      label: "Dashed left arrow",
      latexFormat: "\\dashleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇆",
      label: "Left right arrows",
      latexFormat: "\\leftrightarrows",
      value: [],
      type: "simple",
    },
    {
      name: "⇚",
      label: "Left left double arrow",
      latexFormat: "\\Lleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↞",
      label: "Two headed left arrow",
      latexFormat: "\\twoheadleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↢",
      label: "Left arrow with tail",
      latexFormat: "\\leftarrowtail",
      value: [],
      type: "simple",
    },
    {
      name: "↫",
      label: "Loop left arrow",
      latexFormat: "\\looparrowleft",
      value: [],
      type: "simple",
    },
    {
      name: "⇋",
      label: "Left right harpoons",
      latexFormat: "\\leftrightharpoons",
      value: [],
      type: "simple",
    },
    {
      name: "↶",
      label: "Curve left arrow",
      latexFormat: "\\curvearrowleft",
      value: [],
      type: "simple",
    },
    {
      name: "↺",
      label: "Circle left arrow",
      latexFormat: "\\circlearrowleft",
      value: [],
      type: "simple",
    },
    {
      name: "↰",
      label: "Lsh",
      latexFormat: "\\Lsh",
      value: [],
      type: "simple",
    },
    {
      name: "⇈",
      label: "Up up arrows",
      latexFormat: "\\upuparrows",
      value: [],
      type: "simple",
    },
    {
      name: "↿",
      label: "Up harpoon left",
      latexFormat: "\\upharpoonleft",
      value: [],
      type: "simple",
    },
    {
      name: "⇃",
      label: "Down harpoon left",
      latexFormat: "\\downharpoonleft",
      value: [],
      type: "simple",
    },
    {
      name: "⊸",
      label: "Multimap",
      latexFormat: "\\multimap",
      value: [],
      type: "simple",
    },
    {
      name: "↭",
      label: "Left right squig arrow",
      latexFormat: "\\leftrightsquigarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇉",
      label: "Right right arrows",
      latexFormat: "\\rightrightarrows",
      value: [],
      type: "simple",
    },
    {
      name: "⇄",
      label: "Right left arrows",
      latexFormat: "\\rightleftarrows",
      value: [],
      type: "simple",
    },
    {
      name: "↠",
      label: "Two headed right arrow",
      latexFormat: "\\twoheadrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↣",
      label: "Right arrow with tail",
      latexFormat: "\\rightarrowtail",
      value: [],
      type: "simple",
    },
    {
      name: "↬",
      label: "Loop right arrow",
      latexFormat: "\\looparrowright",
      value: [],
      type: "simple",
    },
    {
      name: "⇌",
      label: "Right left harpoons",
      latexFormat: "\\rightleftharpoons",
      value: [],
      type: "simple",
    },
    {
      name: "↷",
      label: "Curve right arrow",
      latexFormat: "\\curvearrowright",
      value: [],
      type: "simple",
    },
    {
      name: "↻",
      label: "Circle right arrow",
      latexFormat: "\\circlearrowright",
      value: [],
      type: "simple",
    },
    {
      name: "↱",
      label: "Rsh",
      latexFormat: "\\Rsh",
      value: [],
      type: "simple",
    },
    {
      name: "⇊",
      label: "Down down arrows",
      latexFormat: "\\downdownarrows",
      value: [],
      type: "simple",
    },
    {
      name: "↾",
      label: "Up harpoon right",
      latexFormat: "\\upharpoonright",
      value: [],
      type: "simple",
    },
    {
      name: "⇂",
      label: "Down harpoon right",
      latexFormat: "\\downharpoonright",
      value: [],
      type: "simple",
    },
    {
      name: "⇝",
      label: "Right squig arrow",
      latexFormat: "\\rightsquigarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↚",
      label: "Not left arrow",
      latexFormat: "\\nleftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↛",
      label: "Not right arrow",
      latexFormat: "\\nrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇍",
      label: "Not left double arrow",
      latexFormat: "\\nLeftarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇏",
      label: "Not right double arrow",
      latexFormat: "\\nRightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "↮",
      label: "Not left right arrow",
      latexFormat: "\\nleftrightarrow",
      value: [],
      type: "simple",
    },
    {
      name: "⇎",
      label: "Not left right double arrow",
      latexFormat: "\\nLeftrightarrow",
      value: [],
      type: "simple",
    },
  ];

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
    console.log("target array 552 ", targetArray, selectedEditArea, lastIdx);
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
      setLengthOfSelectedArea(targetArray?.length);
      setCursorIndex(targetArray?.length - 1);
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
      console.log("event ", event.target.className);
      if (
        editAreaRef.current &&
        !editAreaRef.current.contains(event.target) &&
        !event.target.className.includes("panel-button-ref") &&
        event.target.className !== "panel-button" &&
        !event.target.className.includes("panel-tab")
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
      handleKeyDownOutside(
        event,
        selectedEditArea,
        lengthOfSelectedArea,
        cursorIndex
      );
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
  }, [selectedEditArea, cursorIndex, lengthOfSelectedArea]);

  // equation change use effect handler
  useEffect(() => {
    console.log("equation  uf", equation);
    const result = convertToLatex(equation);
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
    console.log("target array 101", indexes, targetArray, lastIdx);
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
      }
      if (lastIdx === "d") {
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
      }
      if (lastIdx === "v") {
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
  const panelButtonClicked = (buttonInfo) => {
    console.log();
    let splittedIndexes = selectedEditArea.split(",");
    const copy = [...equation];
    const lastIdx = splittedIndexes.pop();
    const targetArray = getValueAtIndex(copy, splittedIndexes);
    console.log("target arrau ", targetArray, lastIdx, splittedIndexes);

    if (selectedEditArea !== "") {
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
        // setEquation((prev) => [...prev, { ...buttonInfo, value: [] }]);
        setEquation((prev) => {
          let finalValue = [...prev];
          // finalValue.splice(cursorIndex + 1, 0, { ...buttonInfo, value: [] });
          finalValue.splice(cursorIndex + 1, 0, {
            ...buttonInfo,
            value: [],
          });
          // console.log("equation uf 934", finalValue, ...buttonInfo);

          return finalValue;
        });

        // plus
        setCursorIndex((prev) => prev + 1);
        console.log("copy before setting", copy);
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

    arr.forEach((item) => {
      if (typeof item === "object") {
        if (item.type === "simple") {
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
        } else if (item.name === "Integral") {
          latex += `\\int{${convertToLatex(item.value)}}`;
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

  // rendering mathml format in output div
  const renderEquation = (convertedLatex) => {
    try {
      const mathOutputDiv = document.getElementById("math-output");
      const html = katex.renderToString(convertedLatex, {
        output: "mathml", // "html"
        throwOnError: false,
      });
      console.log("rendered html ", html);
      // Clear contents of math-output div
      mathOutputDiv.innerHTML = "";
      // Render the equation
      katex.render(convertedLatex, mathOutputDiv, {
        output: "mathml",
        throwOnError: false,
      });
      //       katex.render(convertedLatex, document.getElementById("math-output"), {
      //         throwOnError: false,
      //       });
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes["header-container"]}>
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
                setTimeout(() => {
                  setHoverDetails(true);
                }, [400]);
                // setHoverDetails(true);
              }}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (hoverDetails) {
                    setHoverDetails(false);
                  }
                }, [400]);
                // setHoverDetails(true);

                // setHoverDetails(false);
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
          <h2>Latex Format Output</h2>
          <div className={classes["latex-equation"]}>
            {convertToLatex(equation)}
          </div>
        </div>

        <div className={classes["final-output"]}>
          <h2>Final Equation</h2>
          <div id="math-output" className={classes["final-equation"]}></div>
        </div>
      </div>
      <div className={classes["footer-container"]}></div>

      {hoverDetails && <HoverDetailsModal buttonInfo={hoverButtonInfo} />}
    </div>
  );
};

export default MathEquationEditorOutput;
