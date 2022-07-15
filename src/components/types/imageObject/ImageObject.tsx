import React, { useContext } from "react";

import { ImageObjectContext } from "@contexts";
import { IconArrowBack } from "@components/icons";

import GroupOnGrid from "./ImageGroups/GroupOnGrid";
import ImagesContainer from "./ImageGrid/ImagesContainer";

import './imageObject.scss';

export default function ImageObject()
{
  const { listBy, keywords, setKeywords } = useContext(ImageObjectContext);

  function _backHistory() {
    setKeywords(null);
  }

  return (
    <div className="imageObjectContainer">
      
      {(listBy && (keywords || keywords === '')) && 
        <button className="imageGrid-backHistory" onClick={_backHistory}>
          <IconArrowBack /> Back to {listBy}
        </button>
      }

      {listBy && !keywords
        ? <GroupOnGrid listBy={listBy} />
        : <ImagesContainer/>
      }
      
    </div>
  )
}