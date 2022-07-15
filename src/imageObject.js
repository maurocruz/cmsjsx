import React from 'react';
import ReactDOM from 'react-dom';
import { ImageObjectProvider } from "@contexts";
import { ImageObject } from './components/index'

const target = document.getElementById('imageGrid');

if (target) {
  ReactDOM.render(<ImageObjectProvider><ImageObject /></ImageObjectProvider>, target);
}
