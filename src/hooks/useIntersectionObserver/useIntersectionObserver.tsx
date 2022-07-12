import React, { useState } from "react";

const useIntersectionObserver = (target: Element | null, threshold = 0.1, rootMargin = "0px") => 
{

  const [isVisible, setIsVisible] = useState(false);

  const callback = ([{ isIntersecting }]: any, ObserverElement: { unobserve: (arg0: any) => void; }) => { 
    if (isIntersecting) { 
      setIsVisible(true); 
      ObserverElement.unobserve(target); 
    } 
  } 
  
  React.useEffect(() => {
    if (target) {
      const observer = new IntersectionObserver(callback, {
        rootMargin,
        threshold
      });
      
      observer.observe(target);
      
      return () => {
        observer.unobserve(target);
      };
    }
  });

  return {
    isVisible
  }
};

export default useIntersectionObserver;