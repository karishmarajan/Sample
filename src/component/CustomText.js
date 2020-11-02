import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';

// Our custom files and classes import
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';
import { SECTION_MARGIN_TOP } from '../constants/Dimen';

export default class CustomText extends Component {
  render() {
    const styles={
      titlelarge: {
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 0,
        fontWeight:this.props.fontWeight,
        fontSize:28,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
        paddingLeft: 5,
        paddingRight: 5,
      },
      maintext: {
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 0,
        fontWeight:this.props.fontWeight,
        fontSize:this.props.fontSize ? this.props.fontSize :14,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
        paddingLeft: 5,
        paddingRight: 5,
      },
      subtext:{
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        fontWeight:this.props.fontWeight,
        fontSize:12,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.subTextColor,
        paddingLeft: 5,
        fontWeight:this.props.fontWeight,
      },
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
          <Text numberOfLines={this.props.numberOfLines} ellipsizeMode={'tail'} style={this.props.textType==Strings.maintext ? styles.maintext : this.props.textType == Strings.titlelarge?styles.titlelarge :this.props.textType == Strings.subtext ? styles.subtext : this.props.textType == Strings.title?styles.title : this.props.textType == Strings.subtitle?styles.subtitle : styles.smalltitle}>{this.props.text}</Text>
    );
  }
}