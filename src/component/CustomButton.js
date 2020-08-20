
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import {Text,View} from 'react-native';
import Colors from '../constants/Colors';

export default class CustomButton extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center',width:this.props.width && this.props.width,borderColor:this.props.borderColor && this.props.borderColor,borderWidth:this.props.borderWidth && this.props.borderWidth ,borderRadius: 6,height: this.props.height ? this.props.height : 50,backgroundColor:this.props.color ? this.props.color : Colors.primaryColor}}>
                <Text style={{alignSelf:'center',textAlign:'center',color:this.props.text_color ? this.props.text_color: Colors.white,fontSize: this.props.fontSize && this.props.fontSize}}>  {this.props.title}  </Text>
            </View>

        );
    }
}

const styles = {
    title_style: {
        color: 'white',
        alignSelf:'cennter',
        
    }
};
