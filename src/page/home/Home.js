import React, { Component } from 'react';
import { Image, SafeAreaView } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Text } from 'native-base';

import { Actions } from 'react-native-router-flux';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import NetworkValidator from '../../component/NetworkValidator'
import CustomAlertComponent from '../../component/CustomAlertComponent';


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
    this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
    this.state = {
      alert_title: 'Alert',
      alert_message: 'Message',
      alert_visible: false,
    };
}
  onPressAlertPositiveButton() {
    alert('Positive Button Clicked');

  }
  onPressAlertNegativeButton() {
  this.setState({alert_visible:false})
  }
  render() {
  
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon style={{ color: 'white' }} name='ios-menu' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon style={{ color: 'white' }} name='ios-cart' />
        </Button>
      </Right>
    );
    return (
      
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <NetworkValidator></NetworkValidator>
          <Navbar left={left} right={right} title={Strings.appName} />
          <Content contentContainerStyle={{justifyContent:'center',flex:1}}>
          <Button onPress={()=>this.setState({alert_visible:true})} style={{width:200,alignSelf:'center',justifyContent:'center'}}>
              <Text style={{alignSelf:'center'}}>show alert</Text>
            </Button>
            <CustomAlertComponent
              displayAlert={this.state.alert_visible}
              displayAlertIcon={true}
              alertTitleText={this.state.alert_title}
              alertMessageText={this.state.alert_message}
              displayPositiveButton={true}
              positiveButtonText={'OK'}
              displayNegativeButton={true}
              negativeButtonText={'CANCEL'}
              onPressPositiveButton={this.onPressAlertPositiveButton}
              onPressNegativeButton={this.onPressAlertNegativeButton}
            />
        
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

}

