import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver/useIntersectionObserver";

export default function FigureContent({item, apiHost}) 
{
  const idimageObject = item.idimageObject; 
  const thumbnail = item.thumbnail;
  const contentUrl = item.contentUrl;

  const href = "/admin/imageObject/edit/"+idimageObject;

  const figureRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [ src, setSrc ] = useState('');
  const [ spanGrid, setSpanGrid ] = useState(200);
  const [ height, setHeight ] = useState(item.height);
  const [ width, setWidth ] = useState(item.width);
  const [ imageBroken, setImageBroken ] = useState(false);

  const [ countParts, setCountParts ] = useState<number | string>('?');

  const aspectRatio = (height/width) * 100;

  // OBSERVA SE VISIVEL
  const { isVisible } = useIntersectionObserver(figureRef.current);
  
  // COUNT HOW MANY TIMES THIS IMAGE IS REFERENCED
  useEffect(() => {
    axios.get(apiHost+`/imageObject?isPartOf=${idimageObject}`)
    .then(response => {
      setCountParts(response.data.length);
    }).catch(error => {
      console.log(error);
    })
  },[])
  
  // THUMBNAIL
  if (isVisible) {
    const image = new Image();
    image.src = thumbnail ?? contentUrl;  
    image.onload = () => {
    setSrc(image.src);
    if (imgRef.current) {
      setSpanGrid(imgRef.current.offsetHeight + 40);
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
          setSpanGrid(imgRef.current.offsetHeight + 40);
          setWidth(imageOriginal.width);
          setHeight(imageOriginal.height);
        }
      }
      // ORIGINAL IMAGE NOT EXISTS
      imageOriginal.onerror = () => {
        setImageBroken(true);
      }
    }
  }

  return (
    <figure ref={figureRef} className='imageGrid-figure' style={{ gridRowEnd: 'span '+spanGrid }}>     
      
      {src && isVisible
        ? <a href={href}><img ref={imgRef} src={src} /></a>
        : imageBroken 
          ? <a href={href}><Icon className="imageGrid-figure-imageBroken" icon="ic:round-broken-image" /></a> 
          : <Icon className="imageGrid-figure-loading" icon="eos-icons:loading" />
      }

      <figcaption>
        <a href={href} className="imageGrid-edit"><Icon icon="fa-solid:edit" /></a>
        <span className="imageGrid-measures">{width} x {height}</span>
        <span className="imageGrid-countParts"><b style={{color: 'green'}}>{countParts}</b></span>
        <span className="imageGrid-selected"><input type="checkbox" name="idImageObject[]" value={idimageObject}/></span>
      </figcaption>

    </figure>
  )
}
