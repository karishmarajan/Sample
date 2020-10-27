import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput
} from 'react-native';

import { TextField } from 'react-native-material-textfield';

export default class CustomTextInput extends Component {

  render() {

    const styles=StyleSheet.create({
      textinput :{
        fontSize:14,
        color:'#696969',
        backgroundColor:Colors.textBackgroundColor,
        paddingLeft:10,
        paddingTop:5,
        height:30,
        borderRadius:5,
        
      },
    });

    return(
            <TextInput
              textColor={this.props.textColor}
              style={[CustomTextInputStyle.textInput,this.props.style]}
              labelFontSize={12}
              autoCapitalize={false}
              editable={this.props.editable}
              value={this.props.value}
              onChangeText={this.props.onChangeText}
              placeholder={this.props.placeHolder}
              placeholderTextColor={Colors.placeHolderText}
              autoFocus={this.props.autoFocus} />
      )
   

  }
}