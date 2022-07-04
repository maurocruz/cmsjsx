import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PageNavigation from '../pageNavigation/PageNavigation';
import FigureOnGrid from './FigureOnGrid';

import './imageGrid.scss'

type ImageObjectType = {
  contentSize: number,
  contentUrl: string,
  height: number,
  width: number,
  idimageObject: number,
  thumbnail: string
}

export default function ImageGrid({apiHost, keywords}) 
{
  const search = window.location.search;
  const params = new URLSearchParams(search);
  
  const limit = params.get('limit') ?? 40;
  const offset = params.get('offset') ?? 0;

  const [ numberOfItems, setNumberOfItems ] = useState(0);
  const [ images, setImages ] = useState([]);

  useEffect(() => {
    axios.get(apiHost+`/imageObject?fields=count(*) as q`)
    .then(response => {
      setNumberOfItems(response.data[0].q);
    })
  },[])

  useEffect(() => {
    axios.get(apiHost+`/imageObject?limit=${limit}&offset=${offset}&orderBy=uploadDate desc`)
    .then(response => {
      setImages(response.data);
    } )
  },[keywords])

  return (
    <div className='imageGrid'>

      <PageNavigation numberOfItems={numberOfItems} limit={limit} offset={offset}/>
      
      <div id='imageGrid-container' className='imageGrid-container'>

        {images.map((item: ImageObjectType) => {

          const idimageObject = item.idimageObject;
          
          return <FigureOnGrid key={idimageObject} item={item} apiHost={apiHost} />
          
        })}
      </div>
    </div>
  )
}
