
import React, { Component } from 'react';
import { Body,Radio, ListItem,Left,Right  } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import { Text, View } from 'react-native';
import Colors from '../constant/Colors';


export default class CustomRadioButton extends Component {
    render() {
        return (
          

            <View style={{flex:1,flexDirection:'row',marginTop:3,marginBottom:3}}>
                <Radio onPress={this.props.onPress} selectedColor={this.props.selectedColor} selected={this.props.selected} />
                <Body style={{alignItems:'flex-start'}}>
                    <Text style={{ marginLeft:16,fontSize: this.props.fontSize, padding: 3, fontWeight: this.props.fontWeight, }}>{this.props.title}</Text>
                </Body>
            </View>

        );
    }
}

