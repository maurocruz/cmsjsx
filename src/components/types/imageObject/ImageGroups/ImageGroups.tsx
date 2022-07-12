import React, { Fragment, useState } from "react";

import ListGroups from "./ListGroups";

export default function ImageGroups() 
{
  const [ showGroups, setShowGroups ] = useState(false);

  return (
    <Fragment>
      {showGroups       
        ? <ListGroups />
        : <button className="button" onClick={() => setShowGroups(true)}>Selecionar Imagem no Banco de Dados</button>
      }
    </Fragment>
  )
}
