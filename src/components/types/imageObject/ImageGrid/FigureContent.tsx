import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useIntersectionObserver } from '@hooks'

export default function FigureContent({children = null, item, isPartOf = false}: {
  children?: any,
  item: any,
  isPartOf: boolean
}) 
{
  const idimageObject = item.idimageObject; 
  const thumbnail = item.thumbnail;
  const contentUrl = item.contentUrl;

  const href = "/admin/imageObject/edit/"+idimageObject;

  const figureRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [ src, setSrc ] = useState('');
  const [ spanGrid, setSpanGrid ] = useState(150);
  const [ imageBroken, setImageBroken ] = useState(false);

  const [ countParts, setCountParts ] = useState('?');

  // OBSERVA SE VISIVEL
  const { isVisible } = useIntersectionObserver(figureRef.current);
  
  // COUNT HOW MANY TIMES THIS IMAGE IS REFERENCED
  useEffect(() => {

    let isApiSubscribed = true;

    if (isPartOf) {
      axios.get(global.apiHost+`imageObject?isPartOf=${idimageObject}`)
      .then(response => {
        if (isApiSubscribed) {
          setCountParts(response.data.length);
        }
      }).catch(error => {
        console.log(error);
      })
    }

    return () => {
      isApiSubscribed = false;
    }

  },[isPartOf])
  
  // THUMBNAIL
  if (isVisible) {
    const image = new Image();
    image.src = thumbnail ?? contentUrl;  
    image.onload = () => {
    setSrc(image.src);
    if (imgRef.current) {
      setSpanHeight();
    }
    }

    // THUMBNAIL NOT EXISTS
    image.onerror = () => {
      // ORIGINAL IMAGE
      const imageOriginal = new Image();
      imageOriginal.src = contentUrl;
      imageOriginal.onload = () => {
        setSrc(imageOriginal.src);
        if (imgRef.current) { 
          setSpanHeight();
        }
      }
      // ORIGINAL IMAGE NOT EXISTS
      imageOriginal.onerror = () => {
        setImageBroken(true);
      }
    }
  }

  function setSpanHeight() {
    const figcaption = figureRef.current.lastChild as HTMLElement;
    const imgHeight = imgRef.current.offsetHeight;    
    let spanHeight = imgRef.current.offsetHeight + 40;

    if (figcaption.tagName == 'FIGCAPTION') {
      spanHeight = figcaption.offsetHeight + imgHeight + 10;
    }

    setSpanGrid(spanHeight);
  }

  return (
    <figure ref={figureRef} className='imageGrid-figure' style={{ gridRowEnd: 'span '+spanGrid }}>     
      
      {src && isVisible
        ? <a href={href}><img ref={imgRef} src={src} /><p className="imageGrid-image-label">{item.width} x {item.height}</p></a>
        : imageBroken 
          ? <a href={href}><Icon className="imageGrid-figure-imageBroken" icon="ic:round-broken-image" /></a> 
          : <Icon className="imageGrid-figure-loading" icon="eos-icons:loading" />
      }

      {children ??
        <figcaption>
          <a href={href} className="imageGrid-edit"><Icon icon="fa-solid:edit" /></a>
          <span className="imageGrid-countParts"><b style={{color: 'green'}}>{countParts}</b></span>
        </figcaption>
      }

    </figure>
  )
}
