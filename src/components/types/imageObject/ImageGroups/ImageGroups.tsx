import React, { useState } from "react";

import ListGroups from "./ListGroups";

export default function ImageGroups() 
{
  const [ showGroups, setShowGroups ] = useState(false);

  return (
    <div className="imageObjectContainer">
      {showGroups       
        ? <ListGroups />
        : <button className="button" onClick={() => setShowGroups(true)}>Selecionar Imagem no Banco de Dados</button>
      }
    </div>
  )
}
