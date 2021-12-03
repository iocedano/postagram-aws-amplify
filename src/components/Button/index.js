import React from "react";
import { buttonStyle } from "./styles";

const Button = ({
    title,
    onClick,
    type = "action"
}) => {
    return (
        <button className={buttonStyle(type)} onClick={onClick}>
            { title }
        </button>
    );
};

export default Button;