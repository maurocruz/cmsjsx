
import React, { Fragment, useState } from "react";
import { Icon } from '@iconify/react';

import { PageNavigation } from "@components";

import FigureContent from "../ImageGrid/FigureContent";
import ListGroups from "./ListGroups";
import { useImageObject } from "@hooks";


type ImageObjectType = {
  idimageObject: number,
  contentUrl: string,
  thumbnail: string;
  position: number,
  keywords: string,
  width: number,
  height: number
}

export default function ShowGroup({groupName}) 
{
  const [ showGroups, setShowGroups ] = useState(false);

  const { images, numberOfItems, limit, offset, setLimit, setOffset, itemsOnDisplay } = useImageObject({listBy: 'keyword', keywords: groupName});

  function activeCheckbox(event: React.MouseEvent) {
    if (event.currentTarget.previousElementSibling) {
        const target = event.currentTarget.previousElementSibling
        target.setAttribute('checked','1');
    }
  }

  return (
    <Fragment>
      {showGroups
        ? <ListGroups />
        : <div className="imageGrid">
            <p>Selecionando imagens no banco de imagens</p>           
            <button className="button" onClick={() => setShowGroups(true)} type="button">Voltar</button> 
            <p>{numberOfItems} itens - grupo {groupName}</p>

            <PageNavigation 
              numberOfItems={numberOfItems}
              itemsOnDisplay={itemsOnDisplay} 
              limit={limit} 
              offset={offset} 
              setLimit={setLimit} 
              setOffset={setOffset} 
            />

            <div className="imageGrid-container">
              {images.map((item: ImageObjectType)  => {
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
