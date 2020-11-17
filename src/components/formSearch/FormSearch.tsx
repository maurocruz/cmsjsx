import React, { useState, useEffect, ChangeEvent, LiHTMLAttributes, DetailedHTMLProps, createRef, useRef, Component, ComponentProps } from 'react';
import api from '../../service/Api';

interface ItemList {
    itemListElement: [];
    numberOfItems: number;
}

interface ItemListElement {
    item: Item,
    position: number
}

interface Item {
    name: string,
    keywords: string,
    identifier: []
}

const FormSearch = (props: any) => {
    const target = props.target;
    const type = target.getAttribute('data-type');
    const params = target.getAttribute('data-params');
    const like = target.getAttribute('data-like') ?? 'name';
    const placeholderText = "Search by "+like;

    const action = "/admin/"+type;
    const form = useRef();

    const [itemList, setItemList] = useState([]);
    const [keyPress, setKeyPress] = useState([]);

    useEffect(() => {
        if (keyPress.length > 1) {
            let baseurl = `${type}?format=ItemList&${like}Like=${keyPress}`;
            let url = params ? baseurl+"&"+params : baseurl;
            api.get<ItemList>(url).then(response => {
                if (response.data.numberOfItems > 0) {
                    setItemList(response.data.itemListElement);
                } else {
                    setItemList([]);
                }
            })
        } else {
            setItemList([]);
        }
    }, [keyPress]);
    

    function handleKeyPress(event: any) {
        setKeyPress(event.target.value);
    }
    
    return (
        <>
            <form className="navbar-search-form" action={action} method="get" ref={form}>
                <input name="q" type="text" autoComplete="off" onKeyUp={handleKeyPress} className="navbar-search-form-input" placeholder={placeholderText} />
                <button type="submit">
                    <img src="/App/static/images/lupa_32x32.png" alt="Search" title="Search" className="navbar-search-form-image" />
                </button>

                <ul className="list-popup">
                {itemList.map((itemListElement: ItemListElement) => {
                    const item = itemListElement.item;
                    let name = item[like];
                    let href = "";
                    let id = '';
                    
                    item.identifier.map( (PropertyValue: { name: string, value: string }) => {
                      if (PropertyValue.name == "id") {
                          id = PropertyValue.value;
                      }
                    });
                    
                    if (like == "keywords") {
                        href = "/admin/"+type+"/keywords/"+name;
                    } else {
                        href = "/admin/"+type+"/edit/"+id;
                    }
                    
                    return (
                        <li key={itemListElement.position}><a href={href}>{name}</a></li>
                    )
                })}
                </ul>
            </form>
        </>
    )
}

export default FormSearch;