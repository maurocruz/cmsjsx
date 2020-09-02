import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
    identifier: []
}

const AddExistent = (props: any) => {
    const target = props.target;
    const type = target.getAttribute('data-type');
    const like = target.getAttribute('data-like') ?? 'name';

    const [itemList, setItemList] = useState([]);
    const [keyPress, setKeyPress] = useState([]);

    useEffect(() => {
        if (keyPress.length > 1) {
            api.get<ItemList>(`${type}?format=ItemList&${like}Like=${keyPress}&orderBy=${like}`).then(response => {
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

    function handleSubmit(event: any) {  
        const li = event.target;
        const id = li.getAttribute('data-id')
        
        const ul = li.parentNode;
        const inputId = ul.nextSibling;
        const form = ul.parentNode.parentNode.parentNode;

        form.id.value = id;

        form.submit();
    }

    return (
        <>
            <fieldset style={{width:"80%"}}>
                <legend>Add existent type</legend>
                <input type="text" autoComplete="off" onKeyUp={handleKeyPress} />
                <ul className="list-popup">
                {itemList.map((itemListElement: ItemListElement) => {

                    const item = itemListElement.item;

                    const id = item.identifier.map( (PropertyValue: { name: string, value: string }) => {
                        if (PropertyValue.name == "id") {
                            return PropertyValue.value;
                        }
                        });
                        
                    return (
                        <li key={itemListElement.position} onClick={handleSubmit} data-id={id}>{item.name}</li>
                    )
                })}
                </ul>
                <input name="id" type="hidden" value=""/>
            </fieldset>
        </>
    )
}

export default AddExistent;
