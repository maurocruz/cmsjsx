import React from "react";
import ReactDOM from "react-dom";

import Imagesfromdatabase from './components/Imagesfromdatabase';
import Imagesfromserver from "./components/Imagesfromserver";

const imagesfromdatabase = document.getElementById("imagesfromdatabase");
const imagesfromserver = document.getElementById("imagesfromserver");

if (imagesfromdatabase) {
    ReactDOM.render(<Imagesfromdatabase />, imagesfromdatabase);
}

if (imagesfromserver) {
    ReactDOM.render(<>{Imagesfromserver(imagesfromserver)}</>, imagesfromserver);
}