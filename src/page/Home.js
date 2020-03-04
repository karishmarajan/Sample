import React, { Component } from 'react';
import { Image,SafeAreaView } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';

import { Actions } from 'react-native-router-flux';

import Navbar from '../component/Navbar';
import SideMenuDrawer from '../component/SideMenuDrawer';
import Colors from '../Colors';
import Strings from '../Strings';
import NetworkValidator from '../component/NetworkValidator'

export default class Home extends Component {
  render() {
    var left = (
      <Left style={{flex:1}}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon style={{color:'white'}} name='ios-menu' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{flex:1}}>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon style={{color:'white'}} name='ios-cart' />
        </Button>
      </Right>
    );
    return(
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
          <Container>
            <NetworkValidator></NetworkValidator>
            <Navbar left={left} right={right} title={Strings.appName} />
            <Content>

            </Content>
          </Container>
      </SideMenuDrawer>
    );
  }

}

