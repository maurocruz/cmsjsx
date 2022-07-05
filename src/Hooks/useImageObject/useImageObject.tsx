import { useEffect, useState } from "react";
import axios from "axios";

export default function useImageObject(apiHost: string, limit: string | number, offset: string | number, listBy, keyword) 
{
  const [ numberOfItems, setNumberOfItems ] = useState(0);
  const [ images, setImages ] = useState([]);

  let query2 = '';  

  const query = 
    listBy == 'keywords' && !keyword
    ? `groupBy=keywords&orderBy=keywords&fields=distinct(keywords),contentUrl,thumbnail`
    : keyword 
      ? `orderBy=uploadDate desc&keywordsLike=${keyword}`
      : `orderBy=uploadDate desc`;

  if (listBy && keyword) {
    query2 = `keywordsLike=${keyword}`;
  } 
  
  useEffect(() => {
    axios.get(apiHost+`/imageObject?limit=${limit}&offset=${offset}&${query}`)
    .then(response => {
      setImages(response.data);
    } )

    if (!listBy || (listBy && keyword)) {
      console
    axios.get(apiHost+`/imageObject?fields=count(*) as q&${query2}`)
      .then(response => {
        setNumberOfItems(response.data[0].q);
      })
    }

  },[])

  return {
    images,
    numberOfItems
  }
}
