import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { AppProvider, ImageObjectProvider } from '@contexts';

import { ImageFromDatabase } from '@components';

import FormSearch from './components/formSearch/FormSearch';
import AddExistent from './components/addExistent/AddExistent';
import ChooseType from './components/ChooseType';

declare global {
  var host: string;
  var hostApi: string;
  var apiHost: string;
  var folder: string;
}

globalThis.host =  (window as any).host ? (window as any).host : 'https://'+window.location.hostname+'/';
globalThis.hostApi = (window as any).apiHost 
  ? ((window as any).apiHost.slice(-1) === '/' ? (window as any).apiHost : (window as any).apiHost+'/') 
  : 'https://'+window.location.hostname+'/api/';  
globalThis.folder = (window as any).staticFolder ? (window as any).staticFolder : globalThis.host+"../App/static/cms/";
globalThis.apiHost = globalThis.hostApi;

/**
 * 
 * @param children 
 * @param target 
 */
function AppRender(children: any, target: Element) {
  ReactDOM.render(<AppProvider>{children}</AppProvider>, target)
} 

/**
 * 
 */
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
  Imagesfromdatabase() {
    this.getObjectByClassName("imagesfromdatabase",<ImageObjectProvider><ImageFromDatabase/></ImageObjectProvider>);
  }

  private getObjectByClassName(classname: string, Component: JSX.Element) {        
      const listObjects = document.getElementsByClassName(classname);
      
      if (listObjects) {
          for(const key in listObjects) {
              const object = listObjects[key];
              if (typeof object == 'object') {
                  let cloneComponent = React.cloneElement(Component,{target: HTMLElement});
                  AppRender(cloneComponent, object);
              }
          }
      }
  }
}

export default App;
export { AppRender }
