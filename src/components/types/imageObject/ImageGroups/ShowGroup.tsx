
import React, { Fragment, useContext, useState } from "react";
import { Icon } from '@iconify/react';

import { PageNavigation } from "@components";

import FigureContent from "../ImageGrid/FigureContent";
import ListGroups from "./ListGroups";
import { useImageObject } from "@hooks";
import AppContext, { ImageObjectContext } from "@contexts";


type ImageObjectType = {
  idimageObject: number,
  contentUrl: string,
  thumbnail: string;
  position: number,
  keywords: string,
  width: number,
  height: number
}

export default function ShowGroup({groupName}: {
  groupName: string
}) {
  const { setLimit, setOffset } = useContext(AppContext);
  const { setKeywords } = useContext(ImageObjectContext);

  const [ showGroups, setShowGroups ] = useState(false);

  const { items, numberOfItems, itemsOnDisplay } = useImageObject();

  function activeCheckbox(event: React.MouseEvent) {
    if (event.currentTarget.previousElementSibling) {
        const target = event.currentTarget.previousElementSibling
        target.setAttribute('checked','1');
    }
  }

  function handleGoBack() {
    setShowGroups(true);
    setKeywords(null);
    setLimit(null);
    setOffset(null);
  }

  return (
    <Fragment>
      {showGroups
        ? <ListGroups />
        : <div className="imageGrid">
            <p>Selecionando imagens no banco de imagens</p>           
            <button className="button" onClick={handleGoBack} type="button">Voltar</button> 
            <p>{numberOfItems} itens - grupo {groupName}</p>

            <PageNavigation numberOfItems={numberOfItems} itemsOnDisplay={itemsOnDisplay} />

            <div className="imageGrid-container">
              {items.map((item: ImageObjectType)  => {
                  const id = item.idimageObject; 

                  return <FigureContent key={id} item={item}>
                    <figcaption className="imageGrid-figure-figcaption">
                      <input type="checkbox" name="idimageObject[]" defaultValue={id} />
                      <button type="submit" onClick={(event) => activeCheckbox(event)}>
                        <Icon icon="mdi:send" color="#84f7ba" />
                      </button>
                    </figcaption>
                  </FigureContent>
              })}   
            </div>
          </div>
      }

    </Fragment>
  )
}
