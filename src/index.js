import React from "react";
import ReactDOM from "react-dom";

import Imagesfromdatabase from './components/Imagesfromdatabase';
import Imagesfromserver from "./components/Imagesfromserver";

const imagesfromdatabase = document.getElementsByClassName("imagesfromdatabase");
const imagesfromserver = document.getElementsByClassName("imagesfromserver");

if (imagesfromdatabase) {
    for(const key in imagesfromdatabase) {
        const container = imagesfromdatabase[key];
        if (typeof container == 'object') {            
            ReactDOM.render(<Imagesfromdatabase target={container} />, container);
        }
    }
}

if (imagesfromserver) {
    for(const key in imagesfromserver) {
        const container = imagesfromserver[key];
        if (typeof container == 'object') {
            ReactDOM.render(<>{Imagesfromserver(container)}</>, container);
        }
    }
}