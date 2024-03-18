import React, { useState, useEffect } from "react";
import classes from "./MatrixInputModal.module.css";
import close from "../../../../Assets/close.png";
import { Input } from "../../Input/InputItem";
import Button from "../../Button/Button";

const MatrixInputModal = (props) => {
  // usestates
  const [rowsCount, setRowsCount] = useState(1);

  const [columnsCount, setColumnsCount] = useState(1);

  // useEffects

  // functions
  const rowsCountHandler = (value) => {
    console.log("inside rowsCOuntHandler ", value);
    setRowsCount(value);
  };

  const columnsCountHandler = (value) => {
    setColumnsCount(value);
  };

  return (
    <div className={classes["details-modal"]}>
      <div className={classes["modal-header"]}>
        <h2>
          Matrix Inputs
          <span className={classes["close-icon"]}>
            {console.log("closemodal ", props)}
            <img
              src={close}
              onClick={props.closeSearchModal}
              width={"30rem"}
            ></img>
          </span>
        </h2>
      </div>
      <div className={classes["modal-body"]}>
        <Input
          type="number"
          label="Rows Count"
          min={1}
          placeholder="Rows Count"
          value={rowsCount}
          onChange={(e) => rowsCountHandler(e)}
          // autoComplete="username"
          required={true}
        />
        <Input
          type="number"
          label="Columns Count"
          placeholder="Columns Count"
          min={1}
          value={columnsCount}
          onChange={(e) => columnsCountHandler(e)}
          // autoComplete="username"
          required={true}
        />
      </div>
      <div className={classes["modal-footer"]}>
        <div>
          <Button
            type={"button"}
            onClick={(e) => {
              if (rowsCount > 0 && columnsCount > 0) {
                console.log("props are ", props);
                props.matrixSubmitHandler(e, rowsCount, columnsCount);
              } else {
                alert("Rows and columns count should be atleast one");
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatrixInputModal;
