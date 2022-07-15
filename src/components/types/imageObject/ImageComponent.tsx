import React, { useRef, useState } from "react";

import { useIntersectionObserver } from "@hooks";
import { Icon } from "@iconify/react";

export default function ImageComponent({contentUrl, thumbnail = null, alt = null, title = null, className = null, style = null}) 
{
  const [ src, setSrc ] = useState(thumbnail ?? contentUrl);
  const [ broken, setBroken ] = useState(false);

  const wrapperRef = useRef<HTMLImageElement>(null);

  // OBSERVA SE VISIVEL
  const { isVisible } = useIntersectionObserver(wrapperRef.current, 0.2);
  
  if (isVisible) {
    const image = new Image();
    image.onload = () => {
      setSrc(image.src);
    }
    image.src = src;

    image.onerror = () => {
      if (thumbnail) {
        image.src = contentUrl;
        image.onload = () => {
          setSrc(image.src);
        }
      } else {
        setBroken(true);
      }
    }
  }

  return (
    <div ref={wrapperRef}>
      {isVisible && !broken
        ? <img src={src} alt={alt} title={title} className={className} style={style} />
        : broken 
          ? <Icon className="imageGroup-list-broken" icon="ic:baseline-broken-image" />
          : <Icon className="imageGroup-list-loading" icon="eos-icons:loading" />
      }
    </div>
  )
}
