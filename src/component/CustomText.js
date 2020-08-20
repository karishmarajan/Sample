
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, Text } from 'native-base';

// Our custom files and classes import
import Colors from '../constant/Colors';

export default class CustomText extends Component {
  render() {
    const styles={
      title: {
        marginTop:this.props.mTop ? this.props.mTop : 6,
        marginBottom:this.props.mBottom ? this.props.mBottom : 6,
        fontWeight:this.props.fontWeight,
        fontSize:this.props.fontSize,
        fontFamily:this.props.fontFamily,
        color:this.props.color ? this.props.color : Colors.primaryColor,
        textAlign:'center',
      }
    };
    return(
          <Text numberOfLines={this.props.numberOfLines} ellipsizeMode={'tail'} style={styles.title}>{this.props.title}</Text>
    );
  }
}


