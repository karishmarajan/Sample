
import React, { Component } from 'react';
import { Root } from 'native-base';
import { Scene, Router, } from 'react-native-router-flux';

import SplashScreen from './page/SplashScreen';
import Login from './page/login/Login';
import Profile from './page/Profile'
export default class Main extends Component {


  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
           
          <Scene initial key="splashscreen" component={SplashScreen} hideNavBar />
          <Scene  key="login" component={Login} hideNavBar />
          <Scene  key="profile" component={Profile} hideNavBar />

          </Scene>
        </Router>
      </Root>
    );
  }

}
