import React, { useState, useEffect } from "react";
import classes from "./SearchModal.module.css";
import add from "../../Assets/add.png";
import close from "../../Assets/close.png";
import buttonInfos from "../Infos/buttonInfos.json";

const SearchModal = (props) => {
  const all = buttonInfos.all;

  // usestates
  const [searchQuery, setSearchQuery] = useState("");
  const [finalSymbols, setFinalSymbols] = useState(all);

  // useEffects
  useEffect(() => {
    if (searchQuery) {
      setFinalSymbols(
        all.filter(
          (symbol) =>
            (symbol.label &&
              symbol?.label
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (symbol.latexFormat &&
              symbol?.latexFormat
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
          //  ||
          // (goal.assign_by &&
          //   goal?.assign_by
          //     .toLowerCase()
          //     .includes(searchQuery.toLowerCase())) ||
          // (goal.approve_reject_manager &&
          //   goal?.approve_reject_manager
          //     .toLowerCase()
          //     .includes(searchQuery.toLowerCase())) ||
          // (goal.approve_reject_admin &&
          //   goal?.approve_reject_admin
          //     .toLowerCase()
          //     .includes(searchQuery.toLowerCase())) ||
          // (goal.assign_date && goal?.assign_date.includes(searchQuery))
        )
      );
    }
    if (!searchQuery) {
      setFinalSymbols(all);
    }
  }, [searchQuery]);

  // functions
  const globalSearchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const insertClickHandler = (symbol) => {
    console.log("symbol insert", symbol);
    props.panelButtonClicked(symbol);
  };

  return (
    <div className={classes["details-modal"]}>
      <div className={classes["modal-header"]}>
        <h2>
          Search
          <span className={classes["close-icon"]}>
            {console.log("closemodal ", props)}
            <img
              src={close}
              onClick={props.closeSearchModal}
              width={"30rem"}
            ></img>
          </span>
        </h2>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => globalSearchHandler(e)}
            className={`${classes.searchInput} ${classes.animatedInput}`}
          />
        </div>
      </div>
      <div className={classes["modal-body"]}>
        <div className={classes["modal-table"]}>
          <ul className={classes["table-title"]}>
            <li>S.No</li>
            <li>Symbol</li>
            <li>Name</li>
            <li>Latex</li>
            <li>Action</li>
          </ul>
          <div className={classes["table-contents-container"]}>
            {finalSymbols.map((symbol, index) => (
              <ul className={classes["table-content"]}>
                <li>{index + 1}</li>
                <li>{symbol.name}</li>
                <li>{symbol.label}</li>
                <li>{symbol.latexFormat}</li>
                <li>
                  <img
                    src={add}
                    width={"25rem"}
                    title="Insert"
                    className={classes["insert-icon"]}
                    onClick={() => insertClickHandler(symbol)}
                  ></img>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className={classes["modal-footer"]}></div>
    </div>
  );
};

export default SearchModal;
