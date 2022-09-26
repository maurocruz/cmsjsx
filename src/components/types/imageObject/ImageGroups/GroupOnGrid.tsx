import React, { useContext } from "react";
import AppContext, { ImageObjectContext } from "@contexts";
import ImageComponent from "../ImageComponent";

import { PageNavigation } from "@components";
import { useImageObject } from "@hooks";
import { ImageObjectType } from "@types";

/**
 * EXPÕE GRUPOS DE FOTOS NA ABA "IMAGEOBJECT > KEYWORDS"
 * DA PÁGINA DO CMS
 * 
 * @param param0 
 * @returns 
 */
export default function GroupOnGrid() 
{
  const { replaceState } = useContext(AppContext);
  const { setKeywords, listBy } = useContext(ImageObjectContext);

  const { items, numberOfItems, itemsOnDisplay } = useImageObject();

  /**
   * OPEN GALLERY
   * @param keywords
   */
  function handleOnClick(keywords: string) {
    setKeywords(keywords);
    replaceState('keywords',keywords);
  }

  return (
    <div className="imageGroup">
      <p>List {numberOfItems} groups list by {listBy}</p>

      <PageNavigation numberOfItems={numberOfItems} itemsOnDisplay={itemsOnDisplay} />

      <ul className="imageGroup-list">
        {items.map((item: ImageObjectType) => {
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

      <PageNavigation numberOfItems={numberOfItems} itemsOnDisplay={itemsOnDisplay} />

    </div>
  )
}
