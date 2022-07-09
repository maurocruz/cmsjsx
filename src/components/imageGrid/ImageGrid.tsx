import React from 'react';

import useImageObject from '../../Hooks/useImageObject/useImageObject';
import GroupOnGrid from './GroupOnGrid';
import ImagesContainer from './ImagesContainer';

import './imageGrid.scss'

export default function ImageGrid({apiHost}) 
{
  const search = window.location.search;
  const params = new URLSearchParams(search);  
  const limit = params.get('limit') ?? 40;
  const offset = params.get('offset') ?? 0; 
  const listBy = params.get('listBy') ?? null
  const keyword = params.get('keyword') ?? null

  const { images, numberOfItems } = useImageObject(apiHost, limit, offset, listBy, keyword);

  return (
    <div className='imageGrid'>
        {listBy && !keyword
          ? <GroupOnGrid listBy={listBy} images={images} />
          : <ImagesContainer numberOfItems={numberOfItems} limit={limit} offset={offset} apiHost={apiHost} images={images} listBy={listBy} keyword={keyword} />
        }
    </div>
  )
}
