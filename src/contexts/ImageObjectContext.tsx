import { useImageObject } from "@hooks";
import React, { createContext, Dispatch, SetStateAction } from "react";

const ImageObjectContext = createContext({} as {
  limit: number,
  setLimit: Dispatch<SetStateAction<number>>,
  offset: number,
  setOffset: Dispatch<SetStateAction<number>>,
  images: any[],
  numberOfItems: number,
  listBy: string,
  setListBy: Dispatch<SetStateAction<string>>,
  keywords: string,
  setKeywords: Dispatch<SetStateAction<string>>,
  searchParams: URLSearchParams,
  itemsOnDisplay: number
});

const ImageObjectProvider = ({children}) => 
{  
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);

  const { images, numberOfItems, limit, setLimit, offset, setOffset, listBy, setListBy, keywords, setKeywords, itemsOnDisplay } = useImageObject();

  return (
    <ImageObjectContext.Provider
      value={{
        limit,
        setLimit,
        offset,
        setOffset,
        images,
        numberOfItems,
        listBy,
        setListBy,
        keywords,
        setKeywords,
        searchParams,
        itemsOnDisplay
      }}
    >
      {children}
    </ImageObjectContext.Provider>
  )
}

export { ImageObjectProvider };
export default ImageObjectContext;
