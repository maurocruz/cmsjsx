
globalThis.host =  window.host ? window.host : 'https://'+window.location.hostname+'/';
globalThis.hostApi = window.apiHost 
  ? (window.apiHost.slice(-1) === '/' ? window.apiHost : window.apiHost+'/') 
  : 'https://'+window.location.hostname+'/api/';
globalThis.folder = window.staticFolder ? window.staticFolder : host+"../App/static/cms/";

globalThis.apiHost = globalThis.hostApi;

import App from './App';

const app = new App();

// NAVBAR
app.formSearch(); // form search auto complete

// IMAGES FORMS
app.Imagesfromdatabase(hostApi, folder); // images from database
app.Imagesfromserver(); // images from server

// ADD EXISTENT
app.addExistent() // search item in input for add type with is part of

// CHOOSE TYPE
app.chooseType(); // Choose type and select item for the relationship one to one