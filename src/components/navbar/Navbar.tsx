import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormSearch from '../formSearch/FormSearch';

class Navbar extends Component 
{
    formSearch() {
        const listTarget = document.getElementsByClassName('navbar-search');
        for (const key in listTarget) {
            if (typeof listTarget[key] == "object") {
                const target = listTarget[key];
                ReactDOM.render(<FormSearch target={target} />, target);
            }
        }

    }

}

export default Navbar;