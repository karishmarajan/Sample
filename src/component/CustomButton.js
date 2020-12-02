
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
// Our custom files and classes import
import {Text,View} from 'react-native';
import Colors from '../constants/Colors';

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableOpacity style={{marginRight:this.props.marginRight, marginLeft:this.props.marginLeft ,justifyContent: 'center',width:this.props.width && this.props.width,borderColor:this.props.borderColor && this.props.borderColor,borderWidth:this.props.borderWidth && this.props.borderWidth ,borderRadius:this.props.borderRadius,paddingLeft:this.props.paddingLeft ? this.props.paddingLeft:5,paddingRight:this.props.paddingRight ? this.props.paddingRight:5, paddingBottom:this.props.paddingBottom ? this.props.paddingBottom:5, paddingTop:this.props.paddingTop ? this.props.paddingTop:5 ,marginTop:this.props.marginTop? this.props.marginTop :20,height: this.props.height ? this.props.height : 40, backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.buttonBackgroundColor,marginBottom:this.props.marginBottom,flexDirection:'row'}} onPress={this.props.onPress} >
                  {  (<Icon style={{color:this.props.icon_color,alignSelf:'center',fontSize:this.props.icon_fontsize,marginLeft:10}}  name={this.props.icon_name}/>)}
                <Text uppercase={false} style={{alignSelf:'center',textAlign:'center',fontFamily:'lucida grande',color:this.props.text_color ? this.props.text_color: Colors.white,fontSize: this.props.fontSize ? this.props.fontSize:16,marginBottom:this.props.text_marginbottom,marginTop:this.props.text_margintop,textDecorationLine:this.props.textDecorationLine,}}>  {this.props.title}  </Text>
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
