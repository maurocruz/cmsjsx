import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Api } from "@services"
import AppContext from "@contexts";

interface itemList {
  itemListElement: [];
  numberOfItems: string;
}

export default function useImageGroups({
  groupBy,
  keywords,
}: {
  groupBy?: string,
  keywords?: string
})
{
  const { limit, offset} = useContext(AppContext);

  const [ items, setItems ] = useState([]);
  const [ numberOfItems, setNumberOfItems ] = useState(0);
  const [ itemsOnDisplay, setItemsOnDisplay ] = useState(0);

  useEffect(() => {

    axios.get(`${globalThis.hostApi}imageObject?fields=count(distinct keywords) as count`)
      .then(response => {
        setNumberOfItems(parseInt(response.data[0].count));

        axios.get(`${globalThis.hostApi}imageObject?groupBy=${groupBy}&orderBy=${groupBy}&limit=${limit}&offset=${offset}`)
          .then(response => {
            setItems(response.data);
            setItemsOnDisplay(response.data.length);
          })
      })
  },[limit, offset]);

  return {
    items,
    numberOfItems,
    itemsOnDisplay
  }
}