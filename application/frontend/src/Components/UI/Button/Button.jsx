import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={`${classes.btn} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      style={props.style}
      onSubmit={props.style}
      key={props.key}
    >
      {props.children}
    </button>
  );
};

export const MainContentNavigateButton = (props) => {
  return (
    <button
      className={`${classes["main-content-navigate-btn"]} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
