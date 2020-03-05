/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Container, Content, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import

import Navbar from '../../component/Navbar';
import Strings from '../../constants/Strings';
import CustomActivityIndicator from '../../component/CustomActivityIndicator';

export default class ContactUs extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: []
      };
  }

  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button transparent onPress={() => Actions.pop()}>
          <Icon name="ios-close" size={38} style={{fontSize: 38}} />
        </Button>
      </Left>
    );
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
          <Navbar left={left} title={Strings.contactus} />
        
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <CustomActivityIndicator animation={true}/>
             
            </View>
      </Container>
    );
  }
  
}
const styles={
  title: {
    fontFamily: 'Roboto',
    fontWeight: '100'
  }
};

