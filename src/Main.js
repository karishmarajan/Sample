
import React, { Component } from 'react';
import { BackHandler,ToastAndroid } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';

import Home from './page/home/Home';
import Cart from './page/home/Cart';
import Login from './page/login/Login';
import Signup from './page/signup/Signup';
import ContactUs from './page/contact/ContactUs';
import Dashboard from './page/delivery_boy/Dashboard';
import Delivery from './page/delivery_boy/Delivery';
import Index from './page/delivery_boy/Index';
import OrderTransfer1 from './page/delivery_boy/OrderTransfer1';
import PickUp from './page/delivery_boy/PickUp';
import SelfAssign from './page/delivery_boy/SelfAssign';
import StatusUpdate from './page/delivery_boy/StatusUpdate';
import VehicleScan from './page/delivery_boy/VehicleScan';
import DeliveryFirst from './page/delivery_boy/DeliveryFirst';
import DeliveryOutDetails from './page/delivery_boy/DeliveryOutDetails';
import ManualPickup from './page/delivery_boy/ManualPickup';
import StatusUpdateFirst from './page/delivery_boy/StatusUpdateFirst';
import SplashScreen from './page/delivery_boy/SplashScreen';




export default class Main extends Component {


  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene  key="home" component={Home} hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene  key="login" component={Login} hideNavBar />
            <Scene key="signup" component={Signup} hideNavBar />
            <Scene key="contactus" component={ContactUs} hideNavBar />
            <Scene  key="index" component={Index} hideNavBar />
            <Scene  key="dashboard" component={Dashboard} hideNavBar />
            <Scene   key="vehiclescan" component={VehicleScan} hideNavBar />
            <Scene  key="pickup" component={PickUp} hideNavBar />
            <Scene  key="statusupdate" component={StatusUpdate} hideNavBar />
            <Scene  key="ordertransfer1" component={OrderTransfer1} hideNavBar />
            <Scene  key="selfassign" component={SelfAssign} hideNavBar />
            <Scene  key="delivery" component={Delivery} hideNavBar />
            <Scene  key="deliveryfirst" component={DeliveryFirst} hideNavBar />
            <Scene  key="deliveryoutdetails" component={DeliveryOutDetails} hideNavBar />
            <Scene  key="manualpickup" component={ManualPickup} hideNavBar />
            <Scene  key="statusupdatefirst" component={StatusUpdateFirst} hideNavBar />
            <Scene  initial key="splashscreen" component={SplashScreen} hideNavBar />
          </Scene>
        </Router>
      </Root>
    );
  }

}
