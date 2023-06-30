import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import {queryWFS} from '../utils';

//Affiche un tableau avec les données du WFS, en appliquant cqlFilter
// TODO : dynamiser les colonnes, gérer la pagination
export default function WfsTable({layername, wfs_endpoint,cqlFilter}){

    const [data, setData] = useState();

    
    const columns = [
        {key:"siret", title:"Siret", dataIndex:"siret"},
        {key:"nom", title:"Nom", dataIndex:"nom"},
        {key:"date_inscription", title:"Date", dataIndex:"date_inscription"}
    
    ]
    
    
    const fetchData = () => {

    queryWFS(wfs_endpoint, layername, {CQL_FILTER:cqlFilter, COUNT:10})
    .then(data =>
           {setData(data.features.map(c => ({...c.properties, key:c.id }) ) ) }
    );
    }

    useEffect( () => {fetchData()}, [layername, wfs_endpoint, cqlFilter]) //Pour ne lancer qu'une fois la requete WFS (a adapter avec la pagination)
    
    return (
        <Table columns={columns} dataSource={data} />
    )
}

