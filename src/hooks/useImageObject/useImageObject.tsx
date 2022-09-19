import { useEffect, useState } from "react";
import axios from "axios";

export default function useImageObject(props = {listBy: null, keywords: null }) 
{
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);

  const paramsLimit = searchParams.has('limit') ? parseInt(searchParams.get('limit')) : 40;
  const paramsOffset = searchParams.has('offset') ? parseInt(searchParams.get('offset')) : 0;
  const paramslistBy = searchParams.has('listBy') ? searchParams.get('listBy') : null;
  const paramsKeywords = searchParams.has('keywords') ? searchParams.get('keywords') : null;

  const [ limit, setLimit ] = useState(paramsLimit);
  const [ offset, setOffset ] = useState(paramsOffset); 
  const [ listBy, setListBy ] = useState(paramslistBy ?? props.listBy);
  const [ keywords, setKeywords ] = useState(props.keywords ?? paramsKeywords);
  const [ itemsOnDisplay, setItemsOnDisplay ] = useState(0);

  const [ numberOfItems, setNumberOfItems ] = useState(0);
  const [ images, setImages ] = useState([]);

  searchParams.set('limit',limit.toString());
  searchParams.set('offset',offset.toString());

  if(keywords === null || listBy === null) {
    searchParams.delete('keywords');    
  } else {
    searchParams.set('keywords',keywords);
  } 
  window.history.replaceState(null, null,"?"+searchParams.toString());  
  
  useEffect(() => {
    // CONTA ITENS NO TOTAL
    let queryCount = '';
    if (listBy == 'keywords' && keywords === '') {
      queryCount = `fields=count(*) as countItems&keywords=`;
    } else if (listBy && keywords) {
      queryCount = `fields=count(*) as countItems&keywordsLike=${keywords}`;
    } else if (listBy) {
      queryCount = `fields=count(distinct(${listBy})) as countItems`;
    } else {
      queryCount = 'fields=count(*) as countItems';
    }

    // OBTÉM ITENS CONFORME LIMIT E OFFSET
    const query = listBy == 'keywords' && keywords === ''
      ? `orderBy=uploadDate desc&keywords=`
      : listBy == 'keywords' && !keywords
        ? `groupBy=keywords&orderBy=keywords&fields=distinct(keywords),contentUrl,thumbnail`
        : keywords
          ? `orderBy=uploadDate desc&keywordsLike=${keywords}`
          : `orderBy=uploadDate desc`;

    axios.get(globalThis.apiHost+`imageObject?${queryCount}`)
      .then(response => {
        const noi = response.data[0].countItems;
        setNumberOfItems(response.data[0].countItems);

        let offsetQuery = offset;
        let limitQuery = limit;
        if (offset >= noi || limit >= noi) {
          offsetQuery = 0;
          setOffset(0);
        }        

        axios.get(globalThis.apiHost+`imageObject?limit=${limitQuery}&offset=${offsetQuery}&${query}`)
          .then(response => {
            setImages(response.data);
            setItemsOnDisplay(response.data.length);
          }
        );
      }
    );  

  },[limit, offset, listBy, keywords]);

  return {
    images,
    numberOfItems,
    limit,
    setLimit,
    offset,
    setOffset,
    listBy,
    setListBy,
    keywords,
    setKeywords,
    itemsOnDisplay
  }
}
