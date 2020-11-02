
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import {Text,View} from 'react-native';
import Colors from '../constants/Colors';

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{ marginLeft:this.props.marginLeft ,justifyContent: 'center',width:this.props.width && this.props.width,borderColor:this.props.borderColor && this.props.borderColor,borderWidth:this.props.borderWidth && this.props.borderWidth ,borderRadius: 4,padding:5,marginTop:this.props.marginTop? this.props.marginTop :20,height: this.props.height ? this.props.height : 40, backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.buttonBackgroundColor,}} onPress={this.props.onPress}>
                <Text uppercase={false} style={{alignSelf:'center',textAlign:'center',fontFamily:'lucida grande',color:this.props.text_color ? this.props.text_color: Colors.white,fontSize: this.props.fontSize ? this.props.fontSize:16}}>  {this.props.title}  </Text>
            </TouchableOpacity>

        );
    }
}

const styles = {
    title_style: {
        color: 'white',
        alignSelf:'center',  
        fontSize:18,
        fontFamily:'lucida grande',
    }
};
