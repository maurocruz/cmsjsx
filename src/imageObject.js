import React from 'react';
import { AppRender } from './App';

import { ImageObjectProvider } from '@contexts';

import { ImageObject } from "@components";

const target = document.getElementById('imageGrid');

if (target) {
  AppRender(<ImageObjectProvider><ImageObject /></ImageObjectProvider>, target)
}
