import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import api from '../../service/Api';

interface itemList {
    itemListElement: [];
    numberOfItems: string;
}

interface listItem {
    item: imageObject,
    position: number
}

interface imageObject {
    identifier: {
        name: string,
        value: string
    },
    contentUrl: string,
    thumbnail: string;
    position: number,
    keywords: string,
    width: number,
    height: number
}

const Imagesfromdatabase = (props: any) => {
    const target = props.target;
    const imageOk = folder+"/images/ok_64x64.png";
    
    const [listGroups, setListGroups] = useState([]);
    const [numberOfGroups, setNumberOfGroups] = useState('');
    const [imageWidth, setImageWidth] = useState(Number);

    useEffect(() => {
        api.get<itemList>(`${hostApi}imageObject?groupBy=keywords&orderBy=keywords&format=ItemList`).then(response => {
            setNumberOfGroups(response.data.numberOfItems);
            setListGroups(response.data.itemListElement);
        })
    }, []);

    const index = (
        <button className="button" onClick={showGroups}>Selecionar Imagem no Banco de Dados</button>
    );
    
    const back = (
        <>
            <p>Mostrando {numberOfGroups} grupos no banco de imagens</p>   
            <button className="button" onClick={showIndex} type="button">Voltar</button> 
        </>
    );

    const groups = (
        <>
            {back}
            
            {listGroups.map((items: listItem) => (                
                <button 
                    key={items.position}
                    className="button" 
                    onClick={() => showImages(items.item.keywords)} 
                    type="button"
                >
                    {items.item.keywords == "" || items.item.keywords == null ? "Geral" : items.item.keywords}
                </button>
            ))}        
        </>        
    );

    const images = (keywords: string, itemsList: itemList) => {

        let itemListElement = itemsList.itemListElement;

        function activeCheckbox(event: React.MouseEvent) {
            const target = event.currentTarget.previousElementSibling
            target.setAttribute('checked','1');
        }

        return (
            <>     
                <p>Selecionando imagens no banco de imagens</p>           
                <button className="button" onClick={showGroups} type="button">Voltar</button> 
                <p>{itemsList.numberOfItems} itens - grupo {keywords}</p>

                <div className="admin-images-grid">
                    {itemListElement.map((listItem: { item: imageObject, position: number })  => {
                        const item = listItem.item;
                        const id = item.identifier.name == 'id' ? item.identifier.value : null;   
                        const imageSrc = item.thumbnail;
                        const w = item.width;
                        const h = item.height;
                        const ratio = w/h;
                        const span = Math.ceil(((h/w)*11)+5);

                        return (
                            <figure key={listItem.position} className="admin-images-grid-figure" style={{ gridRowEnd: `span ${span}` }}>

                                <img src={imageSrc} title={item.keywords} />
                                
                                <figcaption className="admin-image-grid-buttons">
                                    <p>Tamanho {w} x {h}</p>
                                    <input type="checkbox" name="id[]" defaultValue={id} />
                                    <button type="submit" onClick={(event) => activeCheckbox(event)} className="form-submit-button-send"><span className="material-icons">send</span></button>
                                </figcaption>
                            </figure>
                        )
                    })}   
                </div>
                
            </>
        );
    };

    function showIndex() {
        ReactDOM.render(index,target);
    }

    function showGroups() {
        ReactDOM.render(groups, target);
    }

    function showImages(keywords: string) {
        api.get(`${hostApi}imageObject?keywords=${keywords}&format=ItemList&properties=*&limit=none&orderBy=uploadDate&ordering=desc&thumbnail=on`).then(response => {
            const element = images(keywords,response.data);
            ReactDOM.render(element, target);
        });
    }

    return index;
};

export default Imagesfromdatabase;
