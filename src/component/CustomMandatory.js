import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';

// Our custom files and classes import
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import { SECTION_MARGIN_TOP } from '../constants/Dimen';
import { TouchableOpacity } from 'react-native';

export default class CustomMandatory extends Component {
  render() {
    const styles={
    
      smalltitle:{
        marginTop:14,
        marginLeft:4,
        // marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        // paddingBottom:6,
        fontWeight:this.props.fontWeight,
        fontSize:this.props.fontSize ? this.props.fontSize:14,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : 'red',
        fontStyle:this.props.fontStyle ? this.props.fontStyle :'bold',
        textDecorationLine:this.props.textDecorationLine ,
        textAlignVertical:this.props.textAlignVertical,
        
      }
    };
    return(
      <TouchableOpacity onPress={this.props.onPress}>
          <Text numberOfLines={this.props.numberOfLines} ellipsizeMode={'tail'} style={styles.smalltitle}>*</Text>
          </TouchableOpacity>
    );
  }
}