import React, { useState } from 'react';
import {Form} from 'antd';

export default function WfsControl({children, wfs_endpoint}){

    return(
        <>{children.map((child, key) => <div key={key}>{child}</div> )}</>

    )
};

//        {/* wfs_endpoint est undefined dans l enfant, probablement car ils sont trop deep ??! Pas la bonne approche, mieux vaut passer l'url a chaque enfant*/} 
