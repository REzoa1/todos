import buttonStyles from "./ButtonForm.module.css";
import React from "react";

export const ButtonForm = ({
  name,
  complete,
  active,
  setIsComplete,
  setIsActive,
}) => {
  return (
    <button
      className={buttonStyles.btn}
      onClick={() => {
        setIsComplete(complete);
        setIsActive(active);
      }}
    >
      {name}
    </button>
  );
};
