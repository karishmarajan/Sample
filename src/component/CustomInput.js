
import React, { Component } from 'react';
import { Icon,View, } from 'native-base';
import { TextInput, } from 'react-native';

// Our custom files and classes import
import Colors from '../constants/Colors';


export default class CustomInput extends Component {

  render() {
    const styles = {
      input: {
        height: this.props.height ? this.props.height : 40,
        width: this.props.width,
        borderWidth: 0,
        marginTop: this.props.marginTop_text,
        marginLeft:5,
        marginRight:5,
        marginBottom: 5,
        borderRadius: 0,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: this.props.paddingTop,
        paddingBottom: 0,
        textAlign:'left',
        
        borderColor: Colors.borderColor,
        fontSize: this.props.fontSize, 
        color:Colors.black,
        flex:this.props.flex ,
        
        
      },

    };
    return (

      <View  keyboardShouldPersistTaps='handled'  style={{flexDirection:'row',backgroundColor:this.props.backgroundColor ?this.props.backgroundColor: Colors.textBackgroundColor,height: this.props.height ? this.props.height : 40,borderWidth:this.props.borderWidth,borderColor:this.props.borderColor,borderRadius:this.props.borderRadius,marginTop: this.props.marginTop,marginRight:this.props.marginRight,width:this.props.width}}>
        {this.props.showIcon && (<Icon style={{color:this.props.icon_color,alignSelf:'center',fontSize:this.props.icon_fontsize,marginLeft:10}}  name={this.props.icon_name}/>)}
      <TextInput editable={this.props.editable} autofocus={true}  disableFullscreenUI secureTextEntry={this.props.secureTextEntry} textAlignVertical="top" onSubmitEditing={this.props.onSubmitEditing} ref={this.props.refSubmit} value={this.props.value} maxLength={this.props.maxLength} onChangeText={this.props.onChangeText} returnKeyType={this.props.returnKeyType} textContentType={this.props.textContentType} keyboardType={this.props.keyboardType} style={styles.input} placeholder={this.props.placeholder} placeholderTextColor={this.props.placeholderTextColor} ></TextInput>
      </View >
    );
  }
}


