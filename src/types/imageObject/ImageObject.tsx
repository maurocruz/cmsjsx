import React from 'react';
import ReactDOM from 'react-dom';

import Imagesfromdatabase from './Imagesfromdatabase';
import Imagesfromserver from "./Imagesfromserver";

class ImageObject {

    Imagesfromdatabase() {
        const imagesfromdatabase = document.getElementsByClassName("imagesfromdatabase");

        if (imagesfromdatabase) {
            for(const key in imagesfromdatabase) {
                const container = imagesfromdatabase[key];
                if (typeof container == 'object') {            
                    ReactDOM.render(<Imagesfromdatabase target={container} />, container);
                }
            }
        }
    }

    Imagesfromserver() {
        const imagesfromserver = document.getElementsByClassName("imagesfromserver");

        if (imagesfromserver) {
            for(const key in imagesfromserver) {
                const container = imagesfromserver[key];
                if (typeof container == 'object') {
                    ReactDOM.render(<Imagesfromserver target={container} />, container);
                }
            }
        }

    }
}

export default ImageObject;
