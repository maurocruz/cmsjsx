import axios from 'axios';
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
    identifier: {
        name: string,
        value: string
    }
}

const AddExistent = (props: any) => {
    const target = props.target;
    const type = target.getAttribute('data-type');
    const propertyName = target.getAttribute('data-propertyName');
    const idHasPart = target.getAttribute('data-idHasPart');
    const like = target.getAttribute('data-like') ?? 'name';

    const [itemList, setItemList] = useState([]);
    const [keyPress, setKeyPress] = useState([]);

    useEffect(() => {
        if (keyPress.length > 1) {

            axios.get<ItemList>(hostApi + `${type}?format=ItemList&${like}Like=${keyPress}&orderBy=${like}`)
            .then(response => {
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

        if (propertyName) {
            document.getElementById("idValue").setAttribute('value',id);
        } else {
            form.id.value = id;
        }

        form.submit();
    }

    const InputsHidden = () => {
        if (propertyName) {
            return (
                <>
                    <input name="id" type="hidden" value={idHasPart} />
                    <input id="idValue" name={propertyName} type="hidden" value="" />
                </>
            );
        } else {
            return (
                <input name="id" type="hidden" value="" />
            );
        }
    };

    return (
        <>
            <fieldset style={{width:"80%"}}>
                <legend>Add {propertyName || type}</legend>
                <input type="text" autoComplete="off" onKeyUp={handleKeyPress} />
                <ul className="list-popup">
                {itemList.map((itemListElement: ItemListElement) => {
                    const item = itemListElement.item;
                    const id = item.identifier.name == 'id' ? item.identifier.value : null;                        
                    return (
                        <li key={itemListElement.position} onClick={handleSubmit} data-id={id}>{item.name}</li>
                    )
                })}
                </ul>
                <InputsHidden/>
            </fieldset>
        </>
    )
}

export default AddExistent;
