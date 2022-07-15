import React, { useContext } from "react";
import { ImageObjectContext } from "@contexts";
import ImageComponent from "../ImageComponent";

import { PageNavigation } from "@components";

/**
 * EXPÕE GRUPOS DE FOTOS NA ABA "IMAGEOBJECT > KEYWORDS"
 * DA PÁGINA DO CMS
 * 
 * @param param0 
 * @returns 
 */
export default function GroupOnGrid({listBy}) 
{
  const { images, numberOfItems, itemsOnDisplay, limit, setLimit, offset, setOffset, setKeywords } = useContext(ImageObjectContext);

  function handleOnClick(keywords: string) {
    setKeywords(keywords)
  }
  
  return (
    <div className="imageGroup">
      <p>List {numberOfItems} groups by {listBy}</p>

      <PageNavigation 
        numberOfItems={numberOfItems} 
        itemsOnDisplay={itemsOnDisplay} 
        limit={limit} 
        setLimit={setLimit} 
        offset={offset} 
        setOffset={setOffset} 
      />

      <ul className="imageGroup-list">
        {images.map(item => {
          const idimageObject = item.idimageObject;
          const contentUrl = item.contentUrl;
          const thumbnail = item.thumbnail;
          const keywords = item.keywords;

          return (
            <li key={idimageObject} className='imageGroup-list-item'>
              <figure className="imageGroup-list-figure" onClick={() => handleOnClick(keywords)}>
                <ImageComponent contentUrl={contentUrl} thumbnail={thumbnail} />
                <figcaption>{keywords}</figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
