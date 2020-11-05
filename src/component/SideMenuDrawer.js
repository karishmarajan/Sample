/**
* This is the Side Menu Drawer Component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Keyboard,BackHandler, } from 'react-native';
import Drawer from 'react-native-drawer';
import Index from '../page/delivery_boy/Index';
import { Actions } from 'react-native-router-flux';


// Our custom files and classes import
import SideMenu from './SideMenu';


export default class SideMenuDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen:false
    };
  }

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', () =>
    {
      if(Actions.currentScene == "dashboard")
      {
        if(this.state.isOpen)
        {
         this.close();
        }else{
          BackHandler.exitApp();
        }
      }
    }
     );
  };

  render() {
    return(
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<Index onClose={()=> this.close()}/>}
        tapToClose={true}
        type="overlay"
        openDrawerOffset={0.3}
        onCloseStart={() => Keyboard.dismiss()}
        >
          {this.props.children}
      </Drawer>
    );
  }

  close() {
    this._drawer.close();
    this.setState({isOpen:false});
  }

  open() {
    this._drawer.open();
    this.setState({isOpen:true});
  }

}
