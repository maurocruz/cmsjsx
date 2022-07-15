import React from "react";
import { Icon } from "@iconify/react";
import { IconBackward, IconForward, IconForwardStep } from "@components/icons";

const PageNumbering = ({activedPage, exposedPages, numberOfPages, limit, offset, setOffset}) => 
{
  const range = Math.floor((offset / limit) / exposedPages);
  const firstRangePage = range == 0 ? 1: range * exposedPages +1;
  let lastRangePage = firstRangePage + exposedPages - 1;
  if(lastRangePage > numberOfPages) lastRangePage = numberOfPages;
  const lastOffset = (numberOfPages * limit) - limit;

  const buttons = new Array();

  let i = 0;

  // FULL BACKWARD
  if (firstRangePage !== 1) {
    buttons.push({
      key:"backward",
      value: <IconBackward />,
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
      value: <IconForwardStep />,
      offsetItem: forwardOffset,
      class: 'pageNavigation-ward pageNavigation-forwardStep'
    })
  }

  // FULL FORWARD
  if (lastRangePage !== numberOfPages) {
    buttons.push({
      key: "forward",
      value: <IconForward />,
      offsetItem: lastOffset,
      class: 'pageNavigation-ward pageNavigation-forward'
    })
  }

  function handleOnClik(e,offset: number) {
    setOffset(offset);
    e.preventDefault();
  }

  return (
    <nav className="pageNavigation-numbering">
      {buttons.map(item => {          
        return (
          <button key={item.key} onClick={(e) => handleOnClik(e,item.offsetItem)} className={item.class} style={item.style}>{item.value}</button>
        )
      })}
    </nav>
  )
}

export default PageNumbering;
