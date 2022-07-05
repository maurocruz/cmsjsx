import React from 'react';
import ReactDOM from 'react-dom'
import ImageGrid from '../src/components/imageGrid/ImageGrid'

const target = document.getElementById('imageGrid');
const apiHost = target.getAttribute('data-apiHost');

if (target) {
  ReactDOM.render(<ImageGrid apiHost={apiHost}/>, target);
}
