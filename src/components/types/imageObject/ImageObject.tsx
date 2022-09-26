import React, { useContext, useEffect } from "react";

import { AppContext, ImageObjectContext } from "@contexts";
import { IconArrowBack } from "@icons";

import GroupOnGrid from "./ImageGroups/GroupOnGrid";
import ImagesContainer from "./ImageGrid/ImagesContainer";

import './imageObject.scss';

export default function ImageObject()
{
  const { replaceState, offset, limit, setLimit, setOffset } = useContext(AppContext);
  const { keywords, setKeywords, listBy } = useContext(ImageObjectContext);

  useEffect(() => {
    if(!limit) setLimit(40);
    if(!offset) setOffset(0);
    replaceState('limit', limit ? limit.toString() : 40);
    replaceState('offset', offset ? offset.toString() : 0);

    return () => {}

  },[offset, limit])

  function _backHistory() {
    setKeywords(null);
    replaceState('keywords');
  }

  return (
    <div className="imageObjectContainer">
      
      {(listBy && (keywords || keywords === '')) && 
        <button className="imageGrid-backHistory" onClick={_backHistory}>
          <IconArrowBack /> Back to {listBy}
        </button>
      }

      {listBy && !keywords
        ? <GroupOnGrid />
        : <ImagesContainer/>
      }
      
    </div>
  )
}