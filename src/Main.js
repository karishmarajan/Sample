
import React, { Component } from 'react';
import { BackHandler,ToastAndroid } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

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

let backPressed = 0;

export default class Main extends Component {


  
  // componentWillMount = () => {
  //   BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
  // };
//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
// }

// constructor(){
//     super();
//     this.state={
//         isloggedin: false,
//         backPressed: 1,
//     }
// }

// handleBackButton(){
//     if(Actions.currentScene === 'delivery' || Actions.currentScene === 'vehiclescan' || Actions.currentScene === 'dashboard' || Actions.currentScene === 'login'|| Actions.currentScene === 'pickup'|| Actions.currentScene === 'statusupdate'|| Actions.currentScene === 'ordertransfer1' || Actions.currentScene === 'selfassign'){
//         if(backPressed > 0){
//             BackHandler.exitApp();
//             backPressed = 0;
//         }else {
//             backPressed++;
//             ToastAndroid.show("Please logout to exit", ToastAndroid.SHORT);
//             setTimeout( () => { backPressed = 0}, 2000);
//             return true;
//         }
//     }
// }

  render() {
    return(
      <Root>
        <Router>
          <Scene key="root">
            <Scene  key="home" component={Home} hideNavBar />
            <Scene key="cart" component={Cart} modal hideNavBar />
            <Scene  initial key="login" component={Login} hideNavBar />
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
          </Scene>
        </Router>
      </Root>
    );
  }

}
