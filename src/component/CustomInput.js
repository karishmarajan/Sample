
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text,View } from 'native-base';
import { TextInput } from 'react-native';
// Our custom files and classes import
import Colors from '../constants/Colors';


export default class CustomInput extends Component {

  render() {
    const styles = {
      input: {
        height: this.props.height ? this.props.height : 40,
        width: this.props.width && this.props.width,
        borderWidth: 0,
        marginTop: 0,
        marginLeft:5,
        marginRight:5,
        marginBottom: 5,
        borderRadius: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'center',
        borderColor: Colors.borderColor,
        fontSize: this.props.fontSize, 
        color:Colors.black,
        
      },

    };
    return (

      <View style={{flexDirection:'row',backgroundColor:this.props.backgroundColor ?this.props.backgroundColor: Colors.textBackgroundColor,height: this.props.height ? this.props.height : 40,borderWidth:this.props.borderWidth,borderColor:this.props.borderColor,borderRadius:this.props.borderRadius,marginTop: this.props.marginTop,}}>
        {this.props.showIcon && (<Icon style={{color:this.props.icon_color,paddingLeft:10,paddingTop:5,}} size={14} name={this.props.icon_name}/>)}
      <TextInput disableFullscreenUI secureTextEntry={this.props.secureTextEntry} textAlignVertical="top" onSubmitEditing={this.props.onSubmitEditing} ref={this.props.refSubmit} value={this.props.value} maxLength={this.props.maxLength} onChangeText={this.props.onChangeText} returnKeyType={this.props.keyboardType} textContentType={this.props.textContentType} keyboardType={this.props.keyboardType} style={styles.input} placeholder={this.props.placeholder} placeholderTextColor={this.props.placeholderTextColor}></TextInput>
      </View>
    );
  }
}


