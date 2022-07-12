import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ImagesFromDatabase } from '@components';
import Imagesfromserver from './types/imageObject/Imagesfromserver';
import FormSearch from './components/formSearch/FormSearch';
import AddExistent from './components/addExistent/AddExistent';
import ChooseType from './components/ChooseType';

class App extends Component 
{
    // choose type and select item for the relationship one to one
    chooseType() {
        this.getObjectByClassName("choose-type",<ChooseType/>);
    };
    
    // input for search for add existent type with is part of
    addExistent() {
        this.getObjectByClassName("add-existent",<AddExistent/>);
    }

    // navbar form search
    formSearch() {
        this.getObjectByClassName('navbar-search',<FormSearch/>);            
    }

    // get images on data base
    Imagesfromdatabase(hostApi: string, folder: string) {
        this.getObjectByClassName("imagesfromdatabase",<ImagesFromDatabase hostApi={hostApi} folder={folder}/>);
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
