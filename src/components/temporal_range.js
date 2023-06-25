/**
 * Composant WfsDateRange utilisé pour sélectionner une plage de dates et afficher le nombre de fonctionnalités correspondantes à cette plage à partir d'un service WFS.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.layername - Le nom de la couche du service WFS à interroger.
 * @param {string} props.wfs_endpoint - L'URL de l'endpoint WFS utilisé pour récupérer les données.
 * @param {string} props.time_field - Le champ de date utilisé pour filtrer les fonctionnalités.
 * @returns {React.Component} Composant WfsDateRange.
 */
 
import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';

import { v4 as uuid } from 'uuid';

const { RangePicker } = DatePicker;


/*
TODO Fonction pour formater les dates a passer dans le filter (2020-08 -> 2020-08-01 ou 2020-08-31 ; 2023 -> 2023-01-01 ou 2023-12-31).
Voir avec day.js dayjs().endOf('month')

TODO compatiable avec la dimension T des WFS (&TIME=)
*/


const id = uuid()
function WfsDateRange({layername, wfs_endpoint, time_field, setCql_filter}){

    const base_url = `${wfs_endpoint}?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=${layername}&OUTPUTFORMAT=application%2Fjson`
    
    const changed = (date, datestring) => {
        //utiliser l'objet dayjs + traiter les cas où l'input n'est pas saisie ( ["",""] )
        setCql_filter(id, `${time_field}>=${datestring[0]}-01 and ${time_field}<=${datestring[1]}-01`);
    }


    return (
            <>
            <RangePicker picker="month" onChange={changed} />
            </>
    )
}

export default WfsDateRange;
