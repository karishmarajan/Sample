import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';

// Our custom files and classes import
import {Text,View} from 'react-native';
import Colors from '../constants/Colors';

export default class CustomSubButton extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center',
            width:this.props.width && this.props.width,
            borderColor:this.props.borderColor && this.props.borderColor,
            borderWidth:1 ,
            borderRadius: 0,
            height: this.props.height ? this.props.height : 30,
            backgroundColor:Colors.textBackgroundColor,
            marginTop:5,
            borderColor:'blue',
            width:80,}}>
                <Text uppercase={false} style={{alignSelf:'center',textAlign:'center',color:this.props.text_color ? this.props.text_color: Colors.blue,fontSize: this.props.fontSize && this.props.fontSize}}>  {this.props.title}  </Text>
            </View>

        );
    }
}



