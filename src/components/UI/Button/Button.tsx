import React from "react";
import "./Button.scss";

const Button = (props: any) => {
  return (
    <>
      <button
        type={props.type || "button"}
        className={`button ${props.className} ${props.disabled && "disabled"}`}
        disabled={props.disabled}
      >{props.children}</button>
    </>
  )
}
export default Button;