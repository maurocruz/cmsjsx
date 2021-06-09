# cmsjsx
Developer javascript React for plinct/cms

## Install
- Make dir for development in root domain
- npm install react react-dom
- npm install axios
- npm install -D @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/preset-typescript
- npm install -D webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader

## Setting
configure production file location in package.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development",
    "build-dev": "webpack --mode development && cp ./dist/bundle.js ../../www/App/static/cms/js/cmsjsx.js",
    "build": "webpack --mode production && cp ./dist/bundle.js ../../www/App/static/cms/js/cmsjsx.js*"
  }
```
  
