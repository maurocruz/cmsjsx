import React from 'react';
import ReactDOM from 'react-dom'
import ImageGrid from '../src/components/imageGrid/ImageGrid'

const target = document.getElementById('imageGrid');
const apiHost = target.getAttribute('data-apiHost');
const keywords = target.getAttribute('data-keywords');


if (target) {
  ReactDOM.render(<ImageGrid apiHost={apiHost} keywords={keywords}/>, target);
}
