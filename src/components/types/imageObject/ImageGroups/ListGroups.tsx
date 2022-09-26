import React, { Fragment, useContext, useState } from "react";

import { useImageObject } from "@hooks";

import { ImageFromDatabase } from '@components';
import ShowGroup from "./ShowGroup";
import { IconLoading } from "@icons"

import { ImageObjectType } from "@types"
import AppContext, { ImageObjectContext } from "@contexts";

export default function ListGroups() 
{
  const { setLimit, setOffset } = useContext(AppContext);

  const { setKeywords } = useContext(ImageObjectContext);

  const { items, numberOfItems } = useImageObject();

  const [ showIndex, setShowIndex ] = useState(false);
  const [ showImages, setShowImages ] = useState(false);

  const [ groupName, setGroupName ] = useState(null);

  function handleShowImages(item: string) {
    setGroupName(item);
    setShowImages(true);
    setKeywords(item);
    setLimit(40);
    setOffset(0);
  }

  function handleGoBack() {
    setShowIndex(true);
    setKeywords(null);
  }

  return (
    <Fragment>
      {showImages 
        
        ? <ShowGroup groupName={groupName} /> // mostra as imagens do grupo

        : showIndex          
          ? <ImageFromDatabase /> //botao inicial
          : <div className="imageGroups-list">
              <p>Mostrando {numberOfItems} grupos no banco de imagens</p>  

              <button key="back" className="button" onClick={handleGoBack} type="button">Voltar</button> 

              {items 
               ? items.map((item: ImageObjectType) => (                             
                  <button key={item.keywords} className="button" onClick={() => handleShowImages(item.keywords)} type="button">
                    {item.keywords == "" || item.keywords == null ? "Geral" : item.keywords}
                  </button>
                ))
                : <IconLoading />
              }  
      
            </div>
      }
    </Fragment>
  )
}