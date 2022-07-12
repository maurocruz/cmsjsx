import { useEffect, useState } from "react";
import axios from "axios";

export default function useImageObject(
  limit: string | number = 40,
  offset: string | number = 0,
  listBy: string | null = null, 
  keyword: string | null = null
) {
  const [ numberOfItems, setNumberOfItems ] = useState(0);
  const [ images, setImages ] = useState([]);
  
  useEffect(() => {
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

    axios.get(globalThis.apiHost+`/imageObject?limit=${limit}&offset=${offset}&${query}`)
    .then(response => {
      setImages(response.data);
    });

    if (!listBy || (listBy && keyword)) {
      axios.get(globalThis.apiHost+`/imageObject?fields=count(*) as q&${query2}`)
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
