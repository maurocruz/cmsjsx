
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

const AppContext = createContext({} as {
  searchParams: URLSearchParams,
  limit: number|null,
  setLimit: Dispatch<SetStateAction<number>>
  offset: number|null,
  setOffset: Dispatch<SetStateAction<number>>,
  replaceState: Function
});

const AppProvider = ({children}:
{
  children: any 
}) => 
{
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);

  const [ limit, setLimit ] = useState<number|null>(null);
  const [ offset, setOffset ] = useState<number|null>(searchParams.has('offset') ? parseInt(searchParams.get('offset')) : null);
  
  function replaceState(name: string, value: string|null) {
    if (value !== null) {
      searchParams.set(name,value.toString());
    } else {
      searchParams.delete(name);
    }
    window.history.replaceState(null, null, searchParams.toString() !== '' ? "?"+searchParams.toString() : null)
  }

  return (
    <AppContext.Provider value={{
      searchParams,
      limit,
      setLimit,
      offset,
      setOffset,
      replaceState
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;
export { AppProvider };
