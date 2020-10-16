import React, { Component } from 'react';

import {
  View,
  Platform,
  TextInput
} from 'react-native';

import { TextField } from 'react-native-material-textfield';

export default class CustomTextInput extends Component {

  render() {
    if(Platform.OS === 'ios') {
      return(
            <TextInput
              textColor={Colors.brandText}
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
    } else {
      return(
          <TextField
            textColor={Colors.brandText}
            style={[CustomTextInputStyle.textInputAndroid,this.props.style ]}
            labelFontSize={12}
            value={this.props.value}
            editable={this.props.editable}
            activeLineWidth={1}
            autoCapitalize={false}
            labelTextStyle={{fontFamily: 'Roboto-Regular'}}
            tintColor={Colors.brandSecondaryText}
            onChangeText={this.props.onChangeText}
            renderAccessory={this.renderIcon.bind(this)}
            label={this.props.placeHolder}
            placeholderTextColor={Colors.placeHolderText}
            autoFocus={this.props.autoFocus} />
      )
    }
  }
}