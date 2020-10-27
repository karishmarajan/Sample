
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';
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
        justifyContent: 'center',
        color:Colors.black,
        backgroundColor:Colors.textBackgroundColor,
      }
    };
    return (
      <TextInput disableFullscreenUI secureTextEntry={this.props.password} textAlignVertical="top" onSubmitEditing={this.props.onSubmitEditing} ref={this.props.refSubmit} value={this.props.value} maxLength={this.props.maxLength} onChangeText={this.props.onChangeText} returnKeyType={this.props.keyboardType} textContentType={this.props.textContentType} keyboardType={this.props.type} style={styles.input}></TextInput>
    );
  }
}


