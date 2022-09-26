
export type ItemListType = {
  itemListElement: [];
  numberOfItems: string;
}

export type ListItemType = {
  item: ImageObjectType,
  position: number
}

export type ImageObjectType = {
  idimageObject: string,
  contentUrl: string,
  thumbnail: string;
  position: number,
  keywords: string,
  width: number,
  height: number
}
