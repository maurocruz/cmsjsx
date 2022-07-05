import { Icon } from "@iconify/react";
import React, { Fragment } from "react";
import PageNavigation from "../pageNavigation/PageNavigation";
import FigureOnGrid from "./FigureOnGrid";

type ImageObjectType = {
  contentSize: number,
  contentUrl: string,
  height: number,
  width: number,
  idimageObject: number,
  thumbnail: string
}

export default function ListImages({numberOfItems, limit, offset, images, apiHost, listBy, keyword}) 
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
          return <FigureOnGrid key={idimageObject} item={item} apiHost={apiHost} />
        })}
      </div>
    </Fragment>
  )
}
