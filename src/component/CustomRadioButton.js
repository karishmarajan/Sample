
import React, { Component } from 'react';
import { Body,Radio, ListItem,Left,Right  } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import { Text, View } from 'react-native';
import Colors from '../constants/Colors';


export default class CustomRadioButton extends Component {
    render() {
        return (
          

            <View style={{flex:1,flexDirection:'row',marginTop:3,marginBottom:3,marginLeft:10}}>
                <Radio onPress={this.props.onPress} selectedColor={this.props.selectedColor} selected={this.props.selected} />
                <Body style={{alignItems:'flex-start'}}>
<View></View>
                    <Text style={{ padding:this.props.padding,marginLeft:6,fontSize: this.props.fontSize, padding: 0, fontWeight: this.props.fontWeight, }}>{this.props.title}</Text>
                
                </Body>
            </View>

        );
    }
}

