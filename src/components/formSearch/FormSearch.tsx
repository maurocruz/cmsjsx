import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

//const querystring = require('node:querystring');

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
    identifier: {
        name: string,
        value: string
    }
}

const searchStyle = {
    cursor: 'pointer',
    width: '30px',
    verticalAlign: 'middle'
}

const FormSearch = (props: any) => {
    const target = props.target;

    const type = target.getAttribute('data-type');
    const params = target.getAttribute('data-params');
    const like = target.getAttribute('data-searchBy') ?? 'name';
    const linkList = target.getAttribute('data-linkList') as string;
    const action = target.getAttribute('data-action') ?? "/admin/"+type;

    // if action has query string
    let queryStringToInput = new Array();
    const split  = action.split('?');
    if (split.length > 1) {
        //const parsedQueryString = querystring.parse(split[1]);
        //queryStringToInput = Object.entries(parsedQueryString);
    }

    const input = useRef<HTMLInputElement>();

    // place holder of input search
    const placeholderText = "Search by "+like;

    const [itemList, setItemList] = useState([]);
    const [keyPress, setKeyPress] = useState([]);

    useEffect(() => {
        if (keyPress.length > 1) {
            let baseurl = `${type}?format=ItemList&properties=name&${like}Like=${keyPress}`;
            axios.get<ItemList>(globalThis.hostApi + baseurl).then(response => {
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

    function handleOnBlur() {
        setItemList([]);
        if (input.current)  input.current.value = '';
    }
    
    return (
        <>
            <form className="navbar-search-form" action={action} method="get">

                <input 
                    ref={input}
                    name="search" 
                    type="text" 
                    className="navbar-search-form-input" 
                    autoComplete="off" 
                    onKeyUp={handleKeyPress} 
                    onBlur={handleOnBlur}
                    placeholder={placeholderText} 
                />

                {queryStringToInput.length >0 && queryStringToInput.map(([key, value]) => {
                    return (
                        <input key={key} name={key} type="hidden" defaultValue={value} />
                    )
                })}
                
                <button type="submit" title="Search" style={searchStyle} onMouseDown={(e)=>{e.preventDefault()}}><Icon icon="ic:round-search" /></button>

                <ul className="list-popup">
                {itemList.map((itemListElement: ItemListElement) => {
                    const item = itemListElement.item;
                    let name = item[like];
                    let href = "";
                    const id = item.identifier.name == 'id' ? item.identifier.value : null;   
                    
                    if (like == "keywords") {
                        href = "/admin/"+type+"/keywords/"+name;
                    } else {
                        href = linkList ? linkList.replace('[idItem]', id) : "/admin/"+type+"/edit/"+id;
                    }
                    
                    return (
                        <li key={itemListElement.position} onMouseDown={(e)=>{e.preventDefault()}}><a href={href}>{name}</a></li>
                    )
                })}
                </ul>
            </form>
        </>
    )
}

export default FormSearch;
