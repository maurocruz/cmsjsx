import React from "react";

export default function GroupOnGrid({listBy, images}) 
{
  const numberOfGroups = images.length;

  return (
    <div className="imageGrid-groupList">
      <p>List {numberOfGroups} groups by {listBy}</p>
      <ul className="imageGrid-groupList-list">
        {images.map(item => {
          const idimageObject = item.idimageObject;
          const contentUrl = item.contentUrl;
          const src = item.thumbnail ?? contentUrl;
          const keywords = item.keywords;
          const href=`/admin/imageObject?listBy=${listBy}&keyword=${keywords}`;

          return (
            <li key={idimageObject} className='imageGrid-groupList-item'>
              <figure className="imageGrid-groupList-figure">
                <a href={href}><img src={src}/></a>
                <figcaption>
                  <a href={href}>{keywords}</a>
                </figcaption>
              </figure>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
