
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';

// Our custom files and classes import
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import { SECTION_MARGIN_TOP } from '../constants/Dimen';

export default class CustomTitle extends Component {
  render() {
    const styles={
      title: {
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        fontWeight:this.props.fontWeight,
        fontSize:21,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
        textAlign:'center',
      },
      subtitle:{
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        fontWeight:this.props.fontWeight,
        fontSize:16,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
      

      },
      smalltitle:{
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        fontWeight:this.props.fontWeight,
        fontSize:14,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
        fontStyle:'italic',
        textDecorationLine:'underline',
        marginTop:SECTION_MARGIN_TOP,
      }
    };
    return(
          <Text numberOfLines={this.props.numberOfLines} ellipsizeMode={'tail'} style={this.props.fontType==Strings.title ? styles.title :this.props.fontType==Strings.subtitle ? styles.subtitle : styles.smalltitle}>{this.props.title}</Text>
    );
  }
}


