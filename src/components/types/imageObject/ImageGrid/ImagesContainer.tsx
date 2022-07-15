import React, { Fragment } from "react";

import { PageNavigation } from '@components';

import FigureContent from "./FigureContent";
import { useImageObject } from "@hooks";

type ImageObjectType = {
  contentSize: number,
  contentUrl: string,
  height: number,
  width: number,
  idimageObject: number,
  thumbnail: string
}

export default function ImagesContainer() 
{ 
  const { images, numberOfItems, limit, setLimit, offset, setOffset, itemsOnDisplay } = useImageObject();
  
  return (
    <Fragment>

      <PageNavigation numberOfItems={numberOfItems} limit={limit} offset={offset} setLimit={setLimit} setOffset={setOffset} itemsOnDisplay={itemsOnDisplay} />
      
      <div id='imageGrid-container' className='imageGrid-container'>
        {images.map((item: ImageObjectType) => {
          const idimageObject = item.idimageObject;
          return <FigureContent key={idimageObject} item={item} isPartOf={true}/>
        })}
      </div>
    </Fragment>
  )
}
