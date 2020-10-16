
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Home from './page/home/Home';
import Cart from './page/home/Cart';
import Login from './page/login/Login';
import Signup from './page/signup/Signup';
import ContactUs from './page/contact/ContactUs';
import Index from './page/DeliveryBoy/Index';
import Dashboard from './page/DeliveryBoy/Dashboard';

export default class Main extends Component {
  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  };

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene initial key="home" component={Home} hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene  key="login" component={Login} hideNavBar />
            <Scene key="signup" component={Signup} hideNavBar />
            <Scene key="contactus" component={ContactUs} hideNavBar />
            <Scene  key="index" component={Index} hideNavBar />
            <Scene  key="dashboard" component={Dashboard} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
