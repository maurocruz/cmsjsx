import React, { useEffect, useRef, useState } from "react";

import ListGroups from "./ListGroups";

export default function ImageGroups() 
{
  const [ showGroups, setShowGroups ] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if(containerRef) {
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
