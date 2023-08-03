import React from 'react';
import { Table } from 'antd';


//Affiche un tableau avec les données du WFS, en appliquant cqlFilter
// TODO : dynamiser les colonnes, gérer la pagination
export default function WfsTable({features}){


   const data = features.map(c => ({...c.properties, key:c.id }) )
   console.log(data);
    const columns = [
        {key:"siret", title:"Siret", dataIndex:"siret"},
        {key:"nom", title:"Nom", dataIndex:"nom"},
        {key:"date_inscription", title:"Date", dataIndex:"date_inscription"}
    
    ]
    
    
    return (
        <Table columns={columns} dataSource={data} />
    )
}

