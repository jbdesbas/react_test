import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


const wfs_endpoint = 'https://www.geo2france.fr/geoserver/odema/ows';
const layername = 'odema:trackdechets_etablissements';
const time_field = 'date_inscription'

/*


TODO Fonction pour formater les dates a passer dans le filter (2020-08 -> 2020-08-01 ou 2020-08-31 ; 2023 -> 2023-01-01 ou 2023-12-31).
Voir avec day.js dayjs().endOf('month')
*/
function WfsDateRange(){

    const base_url = `${wfs_endpoint}?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=${layername}&OUTPUTFORMAT=application%2Fjson`
    const [nfeatures, setNFeatures] = useState(null);

    const changed = (date, datestring) => {
        //utiliser l'objet dayjs + traiter les cas où l'input n'est pas saisie ( ["",""] )
        console.log(date);
        fetchData(datestring[0],datestring[1]).then(data => setNFeatures(data.totalFeatures));
    
    }

    const fetchData = (date_start,date_stop) => {
        return new Promise((resolve, reject)=> {
            fetch(`${base_url}&CQL_FILTER=${time_field}>=${date_start}-01 and ${time_field}<=${date_stop}-01`).then(
                response => {
                    resolve(response.json())
                }
            ).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    
    }

    return (
            <>
            <RangePicker picker="month" onChange={changed} />
            <p>Features : {nfeatures}</p>
            </>
    )
}

export default WfsDateRange;
