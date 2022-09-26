import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AppContext, ImageObjectContext } from "@contexts";

export default function useImageObject() 
{
  const { listBy, keywords } = useContext(ImageObjectContext);
  
  const { offset, setOffset, limit } = useContext(AppContext);
  
  const [ itemsOnDisplay, setItemsOnDisplay ] = useState(0);
  const [ numberOfItems, setNumberOfItems ] = useState(0);
  const [ items, setItems ] = useState([]);

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
    let query = listBy == 'keywords' && keywords === ''
      ? `orderBy=uploadDate desc&keywords=`
      : listBy == 'keywords' && !keywords
        ? `groupBy=keywords&orderBy=keywords&fields=distinct(keywords),contentUrl,thumbnail`
        : keywords
          ? `orderBy=uploadDate desc&keywordsLike=${keywords}`
          : `orderBy=uploadDate desc`;

    axios.get(globalThis.apiHost+`imageObject?${queryCount}`)
      .then(response => {
        const noi = parseInt(response.data[0].countItems);
        setNumberOfItems(response.data[0].countItems);

        let offsetQuery = offset;
        let limitQuery = limit;

        if (offset >= noi || limit >= noi) {
          offsetQuery = 0;
          setOffset(0);
        }

        if (limit) query += '&limit='+limitQuery;
        if (offset) query += '&offset='+offsetQuery;

        axios.get(globalThis.apiHost+`imageObject?${query}`)
          .then(response => {
            setItems(response.data);
            setItemsOnDisplay(response.data.length);
          }
        );
      }
    );  

  },[limit, offset, listBy, keywords]);

  return {
    items,
    numberOfItems,
    itemsOnDisplay
  }
}
