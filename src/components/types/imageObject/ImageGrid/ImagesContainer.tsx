import { Icon } from "@iconify/react";
import React, { Fragment } from "react";
import { PageNavigation } from '@components';
import FigureContent from "./FigureContent";

type ImageObjectType = {
  contentSize: number,
  contentUrl: string,
  height: number,
  width: number,
  idimageObject: number,
  thumbnail: string
}

export default function ImagesContainer({numberOfItems, limit, offset, images, listBy, keyword}) 
{
  function _backHistory() {
    window.location.href = `?listBy=${listBy}`;
  }

  return (
    <Fragment>

      <PageNavigation numberOfItems={numberOfItems} limit={limit} offset={offset}/>
      
      {listBy && keyword && 
        <button className="imageGrid-backHistory" onClick={_backHistory}>
          <Icon icon="bx:arrow-back" /> Back to {listBy}
        </button>
      }

      <div id='imageGrid-container' className='imageGrid-container'>
        {images.map((item: ImageObjectType) => {
          const idimageObject = item.idimageObject;
          return <FigureContent key={idimageObject} item={item} />
        })}
      </div>
    </Fragment>
  )
}
