import React, { useRef } from "react";
import PageNumbering from "./PageNumbering";

import './pageNavigation.scss';

const exposedPages = 10;

export default function PageNavigation({numberOfItems, limit, offset}) 
{
  const selectForm = useRef<HTMLFormElement>(null);

  const numberOfPages = Math.ceil(numberOfItems / limit);
  const activedPage = offset == 0 ? 1 : Math.floor((offset / limit) + 1);

  const range = Math.floor((offset / limit) / exposedPages);
  const firstRangePage = range == 0 ? 1: range * exposedPages +1;
  let lastRangePage = firstRangePage + exposedPages - 1;
  if(lastRangePage > numberOfPages) lastRangePage = numberOfPages;
  const lastOffset = (numberOfPages * limit) - limit;

  const textCountPages = numberOfItems < 20 
    ? `Showing ${numberOfItems} occurrences`
    : `Showing ${limit} on page ${activedPage} of ${numberOfItems} occurrences in ${numberOfPages} pages.`;

  function handleSubmit() {
    if (selectForm.current) {
      const value = selectForm.current.limit.value;
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('limit');
      searchParams.append('limit',value);
      window.location.href = location.origin+location.pathname+"/?"+searchParams.toString();
    }
  }

  return (
    <div className="pageNavigation">
      <div className="pageNavigation-countPages">{textCountPages}</div>

      {numberOfItems > 20 &&
        <form ref={selectForm} className="pageNavigation-selectLimit" action="" method="get">
          <input type="hidden" name="offset" value={offset}/>
          <select name="limit" onChange={handleSubmit}>
            <option value={limit}>{limit}</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="80">80</option>
            <option value="120">120</option>
            <option value="160">160</option>
            <option value="200">200</option>
          </select>
        </form>
      }

      {numberOfPages > 1 && 
        <PageNumbering 
          activedPage={activedPage} 
          firstRangePage={firstRangePage} 
          lastOffset={lastOffset} 
          lastRangePage={lastRangePage}
          limit={limit}
          numberOfPages={numberOfPages}
        />
      }
			
    </div>
  )  
}
