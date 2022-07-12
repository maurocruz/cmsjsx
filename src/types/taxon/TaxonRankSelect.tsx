import React, { useState, useEffect, ChangeEvent } from 'react';
import { Api } from '@services';

interface itemList {
    name: string,
    identifier: []
}

interface list{
    id: number,
    value: string
}

const TaxonRankSelect = (props: any) => {
    const taxonRankElement = props.taxonRankElement;
    const plantIdentificationKeys = props.plantIdentificationKeys;

    const taxonRankInitialValue = taxonRankElement.value;
    const parentTaxonRankInitialValue = taxonRankInitialValue == "genus" ? "family" : (taxonRankInitialValue == "species" ? "genus" : null );

    const parentTaxonValue = props.parentTaxonElementValue;
    const parentTaxonName = props.parentTaxonElementName;

    const [taxonRankParent, setTaxonRankParent] = useState(parentTaxonRankInitialValue)

    const [parentTaxonList, setParentTaxonList] = useState([]);

    useEffect(() => {        
        Api.get(`taxon?taxonRank=${taxonRankParent}&orderBy=name`).then(response => {
            if (response.data.message !== "No data founded") {
                setParentTaxonList(response.data);
            } else {
                setParentTaxonList([]);
            }
        });
    }, [taxonRankParent]);

    taxonRankElement.onchange = (event: any) => {
        const taxonRank = event.target.value;
        
        const parentTaxonRank = taxonRank == "genus" ? "family" : (taxonRank == "species" ? "genus" : null );
        setTaxonRankParent(parentTaxonRank);

        plantIdKeysVisibility(taxonRank);
    };
    
    function plantIdKeysVisibility(tr: string) {
        if (tr !== 'species') {
            plantIdentificationKeys.style.display = 'none';
        } else {
            plantIdentificationKeys.style.display = 'block';
        }
    }

    plantIdKeysVisibility(taxonRankInitialValue);
 

    const optionWithValue = parentTaxonValue ? <option value={parentTaxonValue}>{parentTaxonName}</option> : null;

    return (        
        <>
            {optionWithValue}   
            <option value="">Choose...</option>
            {parentTaxonList.map((item) => {
                var id = item.identifier.map( (PropertyValue: { name: string, value: string }) => {
                    if (PropertyValue.name == "id") {
                        return PropertyValue.value;
                    }
                });
                return (
                    <option key={id} value={id}>{item.name}</option>
                )
            })}
        </>
    )         
}

export default TaxonRankSelect;