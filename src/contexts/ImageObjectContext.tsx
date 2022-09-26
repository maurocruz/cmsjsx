import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import  AppContext from "@contexts";

const ImageObjectContext = createContext({} as {
  listBy: string,
  setListBy: Dispatch<SetStateAction<string>>,
  keywords: string,
  setKeywords: Dispatch<SetStateAction<string>>,
});

const ImageObjectProvider = ({children}: {
  children: any
}) => 
{ 
  const { searchParams } = useContext(AppContext);

  const [ listBy, setListBy ] = useState(searchParams.has('listBy') ? searchParams.get('listBy') : null);
  const [ keywords, setKeywords ] = useState(searchParams.has('keywords') ? searchParams.get('keywords') : null);

  return (
    <ImageObjectContext.Provider
      value={{
        listBy,
        setListBy,
        keywords,
        setKeywords
      }}
    >
      {children}
    </ImageObjectContext.Provider>
  )
}

export { ImageObjectProvider };
export default ImageObjectContext;
