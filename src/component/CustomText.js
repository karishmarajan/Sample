import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';

// Our custom files and classes import
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

export default class CustomText extends Component {
  render() {
    const styles={
      maintext: {
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 0,
        fontWeight:this.props.fontWeight,
        fontSize:14,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
        paddingLeft: 5,
        paddingRight: 5,
      },
      subtext:{
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        fontWeight:this.props.fontWeight,
        fontSize:14,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.subTextColor,
        paddingLeft: 5,
      },

    };
    return(
          <Text numberOfLines={this.props.numberOfLines} ellipsizeMode={'tail'} style={this.props.textType==Strings.maintext ? styles.maintext : styles.subtext}>{this.props.text}</Text>
    );
  }
}