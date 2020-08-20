
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';
import { TextInput } from 'react-native';
// Our custom files and classes import
import Colors from '../constant/Colors';
import { from } from 'rxjs';

export default class CustomInput extends Component {

  render() {
    const styles = {
      input: {
        height: this.props.height ? this.props.height : 50,
        width: this.props.width && this.props.width,
        borderWidth: .5,
        marginTop: 6,
        marginBottom: 6,
        borderRadius: 6,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 0,
        paddingBottom: 0,
        textAlignVertical: 'center',
        borderColor: Colors.accentColor,
        fontSize: this.props.fontSize,
        justifyContent: 'center',
        color:Colors.black
      }
    };
    return (
      <TextInput disableFullscreenUI secureTextEntry={this.props.password} textAlignVertical="top" onSubmitEditing={this.props.onSubmitEditing} ref={this.props.refSubmit} value={this.props.value} maxLength={this.props.maxLength} onChangeText={this.props.onChangeText} returnKeyType={this.props.keyboardType} textContentType={this.props.textContentType} keyboardType={this.props.type} style={styles.input}></TextInput>
    );
  }
}


