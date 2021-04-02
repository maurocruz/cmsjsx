import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Imagesfromdatabase from './types/imageObject/Imagesfromdatabase';
import Imagesfromserver from './types/imageObject/Imagesfromserver';
import FormSearch from './components/formSearch/FormSearch';
import AddExistent from './components/addExistent/AddExistent';

class App extends Component 
{
    // input for search for add existent type with is part of
    addExistent() {
        this.getObjectByClassName("add-existent",<AddExistent/>);
    }

    // navbar form search
    formSearch() {
        this.getObjectByClassName('navbar-search',<FormSearch/>);            
    }

    // get images on data base
    Imagesfromdatabase() {
        this.getObjectByClassName("imagesfromdatabase",<Imagesfromdatabase/>);
    }

    // select image on server - ### UNDER DEVELOPMENT ###
    Imagesfromserver() {
        this.getObjectByClassName("imagesfromserver",<Imagesfromserver/>);
    }

    private getObjectByClassName(classname: string, Component: JSX.Element) {        
        const listObjects = document.getElementsByClassName(classname);
        
        if (listObjects) {
            for(const key in listObjects) {
                const object = listObjects[key];
                if (typeof object == 'object') {
                    let cloneComponent = React.cloneElement(Component,{target: object});
                    ReactDOM.render(cloneComponent, object);
                }
            }
        }
    }
}

export default App;
