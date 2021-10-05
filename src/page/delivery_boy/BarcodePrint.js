import React, { Component } from 'react';

import Barcode from "react-native-barcode-builder";
 


export default class PredefinedOrder extends React.Component {
    render(){
        return(
         <Barcode value="Hello World" format="CODE128" />
        );
    }
}

