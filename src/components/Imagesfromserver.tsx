import React from 'react';
import ReactDom from 'react-dom';
import '../App.css'

const Imagesfromserver = (target: HTMLElement) => {
    const index = (
        <button className="button" onClick={showServer}>Selecionar imagem no servidor</button>
    );
    
    const server = (
        <>
            <p>Mostrando imagens no servidor</p>   
            <button className="button" onClick={showIndex} type="button">Voltar</button> 
            <button className="button">UNDER DEVELOPMENT!</button>
        </>
    );
    
    function showIndex() {
        ReactDom.render(index,target);
    }

    function showServer() {
        ReactDom.render(server,target);
    }

    return index;
}

export default Imagesfromserver;