import React, { useEffect, useState } from 'react';
import api from '../service/Api';

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

const ChooseType = (props: any) => {
    const target = props.target;
    const types = target.getAttribute('data-types').split(',');
    const property = target.getAttribute('data-property');
    const like = target.getAttribute('data-like');
    const params = target.getAttribute('data-params');

    const currentType = target.getAttribute('data-currentType');
    const currentId = target.getAttribute('data-currentId');
    const currentName = target.getAttribute('data-currentName');

    const chooseTypeSelectId = "choose-type-select-"+property;
    const chooseTypeInputText = "choose-type-input-text-"+property;
    const chooseTypeInputHidden = "choose-type-input-hidden-"+property;

    const initialSelectText = currentType == '' ? "Select type" : currentType;
    const [placeHolderText, setPlaceHolderText] = useState(initialSelectText+' first');

    const [typeSelected, setTypeSelected] = useState('');
    const [itemList, setItemList] = useState([]);
    const [keyPress, setKeyPress] = useState('');


    useEffect(() => {
        if (keyPress.length > 1) {
            let baseurl = `${typeSelected}?format=ItemList&${like}Like=${keyPress}`;
            let url = params ? baseurl+"&"+params : baseurl;
            api.get<ItemList>(url).then(response => {
                if (response.data.numberOfItems > 0) {
                    setItemList(response.data.itemListElement);
                } else {
                    setItemList([]);
                }
            })
        }else {
            setItemList([]);
        }

        if (currentId) {
            const inputHidden = document.getElementById(chooseTypeInputHidden) as HTMLSelectElement;
            inputHidden.value = currentId;
        }


    }, [keyPress]);

    function handleKeyUp(event: any) {        
        setKeyPress(event.target.value);   
    }

    function handleSelectType() {
        const selectForm = document.getElementById(chooseTypeSelectId) as HTMLSelectElement;
        const selected = selectForm.value;
        setTypeSelected(selected);

        const inputForm = document.getElementById(chooseTypeInputText) as HTMLSelectElement;
        inputForm.value = '';

        const placeHolderPreText = selected == initialSelectText ? initialSelectText+' first' : 'Search '+selected;
        setPlaceHolderText(placeHolderPreText);

        const inputHidden = document.getElementById(chooseTypeInputHidden) as HTMLSelectElement;
        inputHidden.value = '';
        
        setItemList([]);
    }

    function handleSelectedItem(event: any) {
        const inputText = event.target.innerText;        
        const inputForm = document.getElementById(chooseTypeInputText) as HTMLSelectElement;
        inputForm.value = inputText;
        
        const inputHidden = document.getElementById(chooseTypeInputHidden) as HTMLSelectElement;        
        inputHidden.value = event.target.getAttribute('data-id');
           
        setItemList([]);        
    }

    function setInputHidden(inputText: string, itemName: string, inputValue: string) {
        const inputHidden = document.getElementById(chooseTypeInputHidden) as HTMLSelectElement;

        if (inputText == itemName) {
            inputHidden.value = inputValue;
        } else {
            inputHidden.value = '';
        }
    }

    return (
        <>
        <select onChange={handleSelectType} id={chooseTypeSelectId} className="choose-type-select" name={property+"Type"}>
            <option value={initialSelectText}>{initialSelectText.charAt(0).toUpperCase()+initialSelectText.slice(1)}</option>
            
            {types.map((type: string) => {
                const typeName = type.charAt(0).toUpperCase() + type.slice(1);
                
                return (
                    <option key={type} value={type}>{typeName}</option>
                )
            })}
        </select> 

        <div className="choose-type-input-container" style={{ flexBasis: '100%', position: 'relative' }}>
            <input id={chooseTypeInputText} type="text" autoComplete="off" className="choose-type-input" onKeyUp={handleKeyUp} placeholder={placeHolderText} defaultValue={currentName} />

            <input id={chooseTypeInputHidden} name={property} type="hidden" />

            <ul id="list-popup" className="list-popup">
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

                    setInputHidden(keyPress, name, id);

                    return (
                        <li key={itemListElement.position} data-id={id} onClick={handleSelectedItem}>{name}</li>
                    )
                })}
            </ul>
        </div>
        </>              
    );
}

export default ChooseType;