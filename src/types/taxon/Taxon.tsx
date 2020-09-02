import React, { Component } from "react";
import ReactDOM from "react-dom";

import TaxonRankSelect from './TaxonRankSelect';

class Taxon extends Component{
    
    selectParentTaxon() {
        const taxonForm = document.getElementById('taxonForm');
        const taxonRankElement = document.getElementById('taxonRank');
        const parentTaxonElement = document.getElementById('parentTaxon') as HTMLSelectElement;
        const parentTaxonElementValue = parentTaxonElement ? parentTaxonElement.value : null;
        const parentTaxonElementName = parentTaxonElement && parentTaxonElement.firstElementChild ? parentTaxonElement.firstElementChild.innerHTML : null;
        const plantIdentificationKeys = document.getElementById('plantIdentificationKeys');

        if (taxonForm) {
            ReactDOM.render(<TaxonRankSelect 
                taxonRankElement={taxonRankElement} 
                parentTaxonElementValue={parentTaxonElementValue}
                parentTaxonElementName={parentTaxonElementName}
                plantIdentificationKeys={plantIdentificationKeys}
                />,parentTaxonElement);
        }
    }
}

export default Taxon;