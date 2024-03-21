import React from "react";
import classes from "./HoverDetailsModal.module.css";

const HoverDetailsModal = (props) => {
  return (
    <div className={classes["details-modal"]}>
      <div className={classes["modal-header"]}>
        <h2>Button Info</h2>
      </div>
      <div className={classes["modal-body"]}>
        <div
          className={
            props?.buttonInfo.image
              ? classes["modal-symbol-image"]
              : classes["modal-symbol"]
          }
        >
          {props?.buttonInfo.image ? (
            <img
              src={props?.buttonImages[props?.buttonInfo.image]}
              width="55px"
              height="50px"
            ></img>
          ) : (
            props?.buttonInfo.name
          )}
        </div>
        <div className={classes["modal-name"]}>
          <span className={classes["value-header"]}>Name</span> &nbsp; : &nbsp;
          {props?.buttonInfo?.label}
        </div>
        <div className={classes["modal-latex"]}>
          <span className={classes["value-header"]}>Latex</span> &nbsp; : &nbsp;
          <span className={classes["value-latex"]}>
            {props?.buttonInfo?.latexFormat}{" "}
          </span>
        </div>
      </div>
      <div className={classes["modal-footer"]}></div>
    </div>
  );
};

export default HoverDetailsModal;
