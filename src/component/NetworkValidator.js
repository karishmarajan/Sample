/**
* This is the Main file
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage,Modal,Image } from 'react-native';
import { Container, Content, View, Header, Icon, Button, Left, Right, Body, Title, List, ListItem, Thumbnail, Grid, Col, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import NetInfo from "@react-native-community/netinfo";
// Our custom files and classes import

import Navbar from '../component/Navbar';
import Strings from '../Strings';
import Colors from '../Colors';


export default class NetworkValidator extends Component {
    constructor() {
        super();
        this.state = {
          connection_Status: ""
        }
      }
      componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        NetInfo.isConnected.fetch().done((isConnected) => {
          if (isConnected == true) {
            this.setState({ connection_Status: "Online" })
          }
          else {
            this.setState({ connection_Status: "Offline" })
          }
        });
      }
    
      componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
      }
    
      handleConnectivityChange = (isConnected) => {
        if (isConnected == true) {
          this.setState({ connection_Status: "Online" })
        }
        else {
          this.setState({ connection_Status: "Offline" })
        }
      };
    
        render() {
          
          return (
             this.state.connection_Status == 'Offline' &&
            <Modal visible={true}
              transparent={false}
            >
    
              <View style={{flex:1,backgroundColor:'white',justifyContent:'center'}}>
                 <Image style={{width:100,height:100,alignSelf:'center',marginBottom:16}} source={require('../../assets/icons/offline.png')}/>
                 <Text style={{alignSelf:'center',fontWeight:'bold',color:Colors.navbarBackgroundColor}}>{Strings.no_internet}</Text>
                 <Text style={{alignSelf:'center',fontSize:12,color:Colors.navbarBackgroundColor}}>{Strings.no_internet_check}</Text>
              </View>
              </Modal>
          );
        }
    
};

