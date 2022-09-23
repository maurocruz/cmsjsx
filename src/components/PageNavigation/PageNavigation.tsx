import React from "react";
import PageNumbering from "./PageNumbering";

import SelectLimit from "./SelectLimit";

import './pageNavigation.scss';

const exposedPages = 10;

export default function PageNavigation({numberOfItems, itemsOnDisplay, limit, setLimit, offset, setOffset}) 
{
  const numberOfPages = Math.ceil(numberOfItems / limit);
  const activedPage = offset == 0 ? 1 : Math.floor((offset / limit) + 1);

  const textCountPages = numberOfItems < 20 
    ? `Showing ${numberOfItems} occurrences`
    : `Showing ${itemsOnDisplay} items on page ${activedPage} of ${numberOfItems} occurrences in ${numberOfPages} pages.`;
    

  return (
      <div className="pageNavigation">
        <p className="pageNavigation-countPages">{textCountPages}</p>

          {numberOfItems > 20 && <SelectLimit limit={limit} setLimit={setLimit} offset={offset} />}

          {numberOfPages > 1 && <PageNumbering activedPage={activedPage} numberOfPages={numberOfPages} exposedPages={exposedPages} limit={limit} offset={offset} setOffset={setOffset} />}

      </div>
  )  
}
