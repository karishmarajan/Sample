/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { Container, Content, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import

import Navbar from '../component/Navbar';
import Strings from '../Strings';

export default class ContactUs extends Component {
  constructor(props) {
      super(props);
      this.state = {
        cartItems: []
      };
  }

  componentWillMount() {
   
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
              <Icon name="ios-cart" size={38} style={{fontSize: 38, color: '#95a5a6', marginBottom: 7}} />
             
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

