import React from 'react';
import ReactDOM from 'react-dom'
import { ImageGrid } from './components/index'

const target = document.getElementById('imageGrid');
const apiHost = target.getAttribute('data-apiHost');

if (target) {
  ReactDOM.render(<ImageGrid apiHost={apiHost}/>, target);
}
