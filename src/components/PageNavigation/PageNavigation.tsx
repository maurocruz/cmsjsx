import React, { useContext } from "react";
import PageNumbering from "./PageNumbering";

import SelectLimit from "./SelectLimit";

import './pageNavigation.scss';
import { AppContext } from "@contexts";

const exposedPages = 10;

export default function PageNavigation({numberOfItems, itemsOnDisplay}: {
  numberOfItems: number,
  itemsOnDisplay: number
}) 
{
  const { offset, limit } = useContext(AppContext);

  const numberOfPages = Math.ceil(numberOfItems / limit);
  const activedPage = offset == 0 ? 1 : Math.floor((offset / limit) + 1);

  const textCountPages = numberOfItems < 20 
    ? `Showing ${numberOfItems} occurrences`
    : `Showing ${itemsOnDisplay} items on page ${activedPage} of ${numberOfItems} occurrences in ${numberOfPages} pages.`;
    

  return (
      <div className="pageNavigation">
        <p className="pageNavigation-countPages">{textCountPages}</p>

          {numberOfItems > 20 && <SelectLimit />}

          {numberOfPages > 1 && <PageNumbering activedPage={activedPage} numberOfPages={numberOfPages} exposedPages={exposedPages} />}

      </div>
  )  
}
