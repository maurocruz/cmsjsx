import React, { Fragment } from "react";

import { PageNavigation } from '@components';

import FigureContent from "./FigureContent";
import { useImageObject } from "@hooks";
import { ImageObjectType } from "@types";

export default function ImagesContainer() 
{ 
  const { items, numberOfItems, itemsOnDisplay } = useImageObject();
  
  return (
    <Fragment>
      <PageNavigation numberOfItems={numberOfItems} itemsOnDisplay={itemsOnDisplay} />
      
      <div id='imageGrid-container' className='imageGrid-container'>
        {items.map((item: ImageObjectType) => {
          const idimageObject = item.idimageObject;
          return <FigureContent key={idimageObject} item={item} isPartOf={true}/>
        })}
      </div>

      <PageNavigation numberOfItems={numberOfItems} itemsOnDisplay={itemsOnDisplay} />
    </Fragment>
  )
}
