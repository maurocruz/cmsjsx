import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ImageGroups } from '@components';
import Imagesfromserver from './types/imageObject/Imagesfromserver';
import FormSearch from './components/formSearch/FormSearch';
import AddExistent from './components/addExistent/AddExistent';
import ChooseType from './components/ChooseType';
import { ImageObjectProvider } from './contexts/ImageObjectContext';

globalThis.host =  (window as any).host ? (window as any).host : 'https://'+window.location.hostname+'/';

globalThis.hostApi = (window as any).apiHost 
  ? ((window as any).apiHost.slice(-1) === '/' ? (window as any).apiHost : (window as any).apiHost+'/') 
  : 'https://'+window.location.hostname+'/api/';
  
globalThis.folder = (window as any).staticFolder ? (window as any).staticFolder : globalThis.host+"../App/static/cms/";

globalThis.apiHost = globalThis.hostApi;

class App extends Component 
{
  imageGrid(target: HTMLDivElement) {    
    ReactDOM.render(<ImageObjectProvider/>, target);
  }

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
  Imagesfromdatabase() {
    this.getObjectByClassName("imagesfromdatabase",<ImageGroups/>);
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
