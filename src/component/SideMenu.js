/**
* This is the SideMenu component used in the navbar
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Linking,Text,SafeAreaView } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Item, Input, Button, Grid, Col } from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

export default class SideMenu extends Component {
  constructor(props) {
      super(props);
      this.state = {
        search: "",
        searchError: false,
        subMenu: false,
        subMenuItems: [],
        clickedItem: ''
      };

      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  render() {
    return(
     
    
          <ScrollView style={styles.container}>
              {this.renderMenu()}
          </ScrollView>
         
    );
  }

  renderMenu() {
   
      return(
        <View>
          <SafeAreaView></SafeAreaView>
          <View style={{paddingLeft: 15, paddingRight: 15,paddingTop:15}}>
             
          </View>
          <View style={{paddingRight: 15}}>
           <Text style={{fontSize:24,fontWeight:'bold',paddingRight: 15,paddingLeft:15,color:Colors.navbarBackgroundColor}}>{Strings.appName}</Text>
          </View>
          {/* <View style={styles.line} />
          <View style={{paddingRight: 15}}>
            <List>
              {this.renderMenuItems()}
            </List>
          </View>
         
          <View>
          <View style={styles.line} />
          <View style={{paddingRight: 15, paddingLeft: 15}}>
            <Text style={{marginBottom: 7}}>Follow us</Text>
            <Grid>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18,color:Colors.navbarBackgroundColor}} name='logo-facebook' onPress={() => Linking.openURL('http://www.facebook.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18,color:Colors.navbarBackgroundColor}} name='logo-instagram' onPress={() => Linking.openURL('http://www.instagram.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18,color:Colors.navbarBackgroundColor}} name='logo-twitter' onPress={() => Linking.openURL('http://www.twitter.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18,color:Colors.navbarBackgroundColor}} name='logo-youtube' onPress={() => Linking.openURL('http://www.youtube.com/').catch(err => console.error('An error occurred', err))} /></Col>
              <Col style={{alignItems: 'center'}}><Icon style={{fontSize: 18,color:Colors.navbarBackgroundColor}} name='logo-snapchat' onPress={() => Linking.openURL('http://www.snapchat.com/').catch(err => console.error('An error occurred', err))} /></Col>
            </Grid>
          </View>
          </View> */}
         
        </View>
      );
  }

  
  itemClicked(item) {
   alert("clicked");
  }

  back() {
    var animationConfig = {
        duration: 150,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
        },
      };
    LayoutAnimation.configureNext(animationConfig);
    this.setState({subMenu: false, subMenuItems: [], clickedItem: ''})
  }

 

  renderMenuItems() {
    let secondaryItems = [];
    menusItems.map((item, i) => {
      secondaryItems.push(
        // <ListItem
        // style={{height:70,justifyContent:'center'}}
        //   last
        //   icon
        //   key={item.id}
        //   button={true}
        //   onPress={Actions[item.key]}
        // >
        //  <Left>
        //     <Icon style={{fontSize: 20,color:Colors.navbarBackgroundColor}} name={item.icon} />
        //   </Left>
        //   <Body style={{marginLeft: -15}}>
        //     <Text style={{fontSize: 18,marginLeft:6}}>{item.title}</Text>
        //   </Body>
        //   <Right style={{alignSelf:'center'}}>
        //     <Icon style={{color:Colors.navbarBackgroundColor}} name="ios-arrow-forward" />
        //   </Right>
        // </ListItem>
      );
    });
    return secondaryItems;
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};



const menusItems = [
  {
    id: 190,
    title: 'Login',
    icon: 'ios-person',
    key: 'login'
  },
  {
    id: 519,
    title: 'Index',
    icon: 'ios-person-add',
    key: 'index'
  },
  {
    id: 21,
    title: 'Dashboard',
    icon: 'md-phone-portrait',
    key: 'dashboard'
  },
  {
    id: 22,
    title: 'VehicleScan',
    icon: 'md-phone-portrait',
    key: 'vehiclescan'
  },
  {
    id: 23,
    title: 'PickUp',
    icon: 'md-phone-portrait',
    key: 'pickup'
  },
];
