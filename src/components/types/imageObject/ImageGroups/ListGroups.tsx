import React, { Fragment, useState } from "react";

import { useImageGroups } from "@hooks";

import ImageGroups from './ImageGroups';
import ShowGroup from "./ShowGroup";
import { IconLoading } from "@components/icons"


interface listItem {
  item: imageObject,
  position: number
}

interface imageObject {
  identifier: {
      name: string,
      value: string
  },
  contentUrl: string,
  thumbnail: string;
  position: number,
  keywords: string,
  width: number,
  height: number
}

export default function ListGroups() 
{
  const { listGroups, numberOfGroups } = useImageGroups();

  const [ showIndex, setShowIndex ] = useState(false);
  const [ showImages, setShowImages ] = useState(false);

  const [ groupName, setGroupName ] = useState(null);

  function handleShowImages(item) 
  {
    setGroupName(item);
    setShowImages(true);      
  }

  return (
    <Fragment>
      {showImages 
        
        ? <ShowGroup groupName={groupName} /> // mostra as imagens do grup

        : showIndex
          
          ? <ImageGroups /> //botao inicial

          : <div className="imageGroups-list">
              <p>Mostrando {numberOfGroups} grupos no banco de imagens</p>  

              <button className="button" onClick={() => setShowIndex(true)} type="button">Voltar</button> 

              {listGroups 
               ? listGroups.map((items: listItem) => (                
                  <button key={items.position} className="button" onClick={() => handleShowImages(items.item.keywords)} type="button">
                    {items.item.keywords == "" || items.item.keywords == null ? "Geral" : items.item.keywords}
                  </button>
                ))
                : <IconLoading />
              }  
      
            </div>
      }
    </Fragment>
  )
}