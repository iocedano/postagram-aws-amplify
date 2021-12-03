import { css } from '@emotion/css';

export const buttonStyle = type => css`
    background-color: ${type === "action" ? "black" : "red"};
    height: 40px;
    width: 160px;
    font-weight: 600;
    font-size: 16px;
    color: white;
    outline: none;
    border: none;
    margin-top: 5px;
    cursor: pointer;
    :hover {
    background-color: #363636;
 }
`