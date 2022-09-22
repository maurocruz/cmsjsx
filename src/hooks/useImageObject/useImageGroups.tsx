import React, { useEffect, useState } from "react";
import { Api } from "@services"

interface itemList {
  itemListElement: [];
  numberOfItems: string;
}

export default function useImageGroups()
{
  const [ listGroups, setListGroups ] = useState([]);
  const [ numberOfGroups, setNumberOfGroups ] = useState('');

  useEffect(() => {
    console.log(globalThis);
    Api.get<itemList>(`${globalThis.hostApi}imageObject?groupBy=keywords&orderBy=keywords&format=ItemList&fields=distinct(keywords)`)
      .then(response => {
        setNumberOfGroups(response.data.numberOfItems);
        setListGroups(response.data.itemListElement);
    })    
  },[]);

  return {
    listGroups,
    numberOfGroups
  }
}