import AppContext, { ImageObjectContext } from "@contexts";
import React, { useContext, useEffect, useRef, useState } from "react";

import ListGroups from "./ListGroups";

export default function ImageFromDatabase() 
{
  const { setListBy } = useContext(ImageObjectContext);

  const [ showGroups, setShowGroups ] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if(containerRef) {
      setListBy('keywords');
      containerRef.current.parentNode.style.width = '100%';
    }
  },[containerRef])

  return (
    <div ref={containerRef} className="imageObjectContainer">
      {showGroups       
        ? <ListGroups />
        : <button className="button" onClick={() => setShowGroups(true)}>Selecionar Imagem no Banco de Dados</button>
      }
    </div>
  )
}
