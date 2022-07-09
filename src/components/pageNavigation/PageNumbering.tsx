import React from "react";
import { Icon } from "@iconify/react";

const PageNumbering = ({limit, firstRangePage, lastRangePage, activedPage, numberOfPages, lastOffset}) => 
{    
  const buttons = new Array();

  let i = 0;

  // FULL BACKWARD
  if (firstRangePage !== 1) {
    buttons.push({
      key:"backward",
      value: <Icon icon="zondicons:backward" />,
      offsetItem: 0,
      class: 'pageNavigation-ward pageNavigation-backward'
    })
  } 

  // STEP BACKWARD
  const backwardOffset = limit * (firstRangePage - 2);
  if (firstRangePage > 1) {
    buttons.push({
      key: "backwardStep",
      value: <Icon icon="zondicons:backward-step" />,
      offsetItem: backwardOffset,
      class: 'pageNavigation-ward pageNavigation-backwardStep'
    })
  }

  // NUMBER PAGES
  for(i = firstRangePage; i <= lastRangePage; i++ ) {
    const offsetItem = limit * (i-1);
    const classItem = activedPage == i ? "pageNavigation-number pageNavigation-activedPage" : "pageNavigation-number pageNavigation-inactivedPage";
    const styleItem =  activedPage == i ? {fontWeight: 'bold', color: 'yellow'} : {};
    buttons.push({
      key: i,
      value: i,
      offsetItem: offsetItem,
      class: classItem,
      style: styleItem
    })
  }

  // STEP FORWARD
  const forwardOffset = limit * (i-1);
  if (lastRangePage < numberOfPages ) {
    buttons.push({
      key: "forwaedStep",
      value: <Icon icon="zondicons:forward-step" />,
      offsetItem: forwardOffset,
      class: 'pageNavigation-ward pageNavigation-forwardStep'
    })
  }

  // FULL FORWARD
  if (lastRangePage !== numberOfPages) {
    buttons.push({
      key: "forward",
      value: <Icon icon="zondicons:forward" />,
      offsetItem: lastOffset,
      class: 'pageNavigation-ward pageNavigation-forward'
    })
  }

  function handleOnClik(offset) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('limit');
    searchParams.delete('offset');
    searchParams.set('limit',limit);
    searchParams.set('offset', offset);
    window.location.href = location.origin+location.pathname+"?"+searchParams.toString();
  }

  return (
    <nav className="pageNavigation-numbering">
      {buttons.map(item => {          
        return (
          <button key={item.key} onClick={() => handleOnClik(item.offsetItem)} className={item.class} style={item.style}>{item.value}</button>
        )
      })}
    </nav>
  )
}

export default PageNumbering;
