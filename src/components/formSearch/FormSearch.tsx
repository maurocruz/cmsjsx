import React, { useState, useEffect, ChangeEvent, LiHTMLAttributes, DetailedHTMLProps, createRef, useRef } from 'react';
import api from '../../service/Api';

interface ItemList {
    itemListElement: [];
    numberOfItems: string;
}

interface ItemListElement {
    item: Item,
    position: number
}

interface Item {
    name: string,
    identifier: []
}

const FormSearch = (props: any) => {
    const target = props.target;
    const type = target.getAttribute('data-type');
    const like = target.getAttribute('data-like') ?? 'name';
    const action = "/admin/"+type;
    const form = useRef();

    const [itemList, setItemList] = useState([]);
    const [keyPress, setKeyPress] = useState([]);

    useEffect(() => {
        if (keyPress.length > 1) {
            api.get<ItemList>(`${type}?format=ItemList&${like}Like=${keyPress}`).then(response => {
                setItemList(response.data.itemListElement);
            })
        } else {
            setItemList([]);
        }
    }, [keyPress]);
    

    function handleKeyPress(event: any) {
        setKeyPress(event.target.value);
    }

    function formSubmit(event: any) {
        event.preventDefault();
    }

    return (
        <>
            <form className="navbar-search-form" action={action} method="get" ref={form}>
                <input name="q" type="text" autoComplete="off" onKeyUp={handleKeyPress} className="navbar-search-form-input" />
                <button type="submit">
                    <img src="/App/static/images/lupa_32x32.png" alt="Search" title="Search" className="navbar-search-form-image" />
                </button>

                <ul>
                {itemList.map((itemListElement: ItemListElement) => {

                    const item = itemListElement.item;

                    const id = item.identifier.map( (PropertyValue: { name: string, value: string }) => {
                        if (PropertyValue.name == "id") {
                            return PropertyValue.value;
                        }
                      });

                    const href = "/admin/"+type+"/edit/"+id;
                      
                    return (
                        <li key={itemListElement.position}><a href={href}>{item.name}</a></li>
                    )
                })}
                </ul>
            </form>
        </>
    )
}

export default FormSearch;