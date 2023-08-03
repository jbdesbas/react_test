import React, { useState } from 'react';
import { Card, Col, Row, Input, InputNumber } from 'antd';

const gridStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
  
};

function FormTonnage(){

    return (
        <>
             <Card title="Card Title">
                <Row>
                  <Col span={4}> / </Col>
                  <Col span={4}>Apport volontaire</Col>
                  <Col span={4}>Porte-à-porte</Col>
                </Row>
                <Row>
                  <Col span={4} span={4} style={{'border-right': '1px solid green', 'padding':'10px'}}>  OMR</Col>
                  <Col span={4} style={{'border-right': '1px solid black', 'padding':'10px'}}>     <InputNumber size="small" precision="0" addonAfter="t"/> </Col>
                  <Col span={4} style={{'border-right': '1px solid black', 'padding':'10px'}}>    <InputNumber size="small" addonAfter="t"/> </Col>
                </Row>
             </Card> 
        </>
    )
}


export default FormTonnage;
