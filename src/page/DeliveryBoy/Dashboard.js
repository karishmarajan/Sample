import React, { Component } from 'react';
import { Image, SafeAreaView,TouchableOpacity,StyleSheet } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Text,Input,Item } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Grid from 'react-native-grid-component';
// import ReactTableContainer from "react-table-container";

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import NetworkValidator from '../../component/NetworkValidator'
import CustomAlertComponent from '../../component/CustomAlertComponent';
import CustomButton from '../../component/CustomButton';
import CustomCheckBox from '../../component/CustomCheckBox';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);
    this.onPressAlertNegativeButton = this.onPressAlertNegativeButton.bind(this);
    var date = new Date();
    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];

    var formatedDate = `${date.getDate()}th ${monthNames[date.getMonth()]} ${date.getFullYear()}`
    this.state = {
      alert_title: 'Alert',
      alert_message: 'Message',
      alert_visible: false,
      startingDate: formatedDate,
    };


}
  onPressAlertPositiveButton() {
    alert('Positive Button Clicked');

  }
  onPressAlertNegativeButton() {
  this.setState({alert_visible:false})
  }
  renderRow() {
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }} /> { /* Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
        </View>
    );
  }

  render() {
  
    var left = (
      <Left style={{ flex: 1 }}>
        <Button onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon style={{ color: '#bdbcca' }} name='ios-menu' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1 }}>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon style={{ color: '#bdbcca' }} name='ios-chatbubbles' />
        </Button>
        <Button onPress={() => Actions.cart()} transparent>
          <Icon style={{ color: '#bdbcca' }} name='ios-notifications' />
        </Button>
      </Right>
    );

   
    const data = [1, 2, 3, 4, 5];
  
   
    return (
      
      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container>
          <Navbar left={left} right={right} title="Dashboard" titleStyle={{ color: '#57b0fc'}} />
          <Content contentContainerStyle={{justifyContent:'center',flex:1}}>

          <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#f0f0f6'}}>

          <View style={{ backgroundColor:'white',marginTop:25,height:120,width:320,left:20,Right:20,borderRadius:10,padding:10}}>
           <Text style={{}}>Amount collected today</Text>
           <Text style={{fontSize:20,fontWeight:'bold',marginTop:35}}>Rs:1,00,000</Text>
          </View>
          <View style={{ backgroundColor:'white',marginTop:15,height:120,width:320,left:20,Right:20,borderRadius:10,padding:10}}>
          <Text style={{}}>Order Transfer Status:</Text>
          <Text style={{fontSize:14}}>Wait for your Approval</Text>
          
            <View style={{marginTop:20,flex:1,flexDirection:'row'}}>
            <TouchableOpacity
                  style={{backgroundColor:'red',width:80,height:30,justifyContent:'center',borderRadius:5}} >
                  <Text style={{color:'white',textAlign:'center'}}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor:'#1bda2e',width:80,height:30,justifyContent:'center',left:20,borderRadius:5}} >
                  <Text style={{color:'white',textAlign:'center'}}>Accept</Text>
                </TouchableOpacity>
            </View>
    
          </View>
          <View >
          <Item>
            <Text style={{left:10,fontSize:19,fontFamily:'normal'}}>Today</Text>
          <Input style={{fontWeight:'bold',left:15}} type="date" name="startDate"value={this.state.startingDate}onChange={this.handleChange}/>
          </Item>
          </View>
        
          <View style={{ backgroundColor:'white',height:250,width:320,left:20,Right:20,borderRadius:10,flex: 1,  flexDirection: 'row',justifyContent:'center'}}>

           <View style={{height:240,fontSize:22,borderColor:'#c4c4cb',borderWidth:1,marginTop:10,marginBottom:10}}>
             <View style={{backgroundColor:'#f4f4f4',padding:20,width:150}}><Text>{'Pending Orders'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text>{'Rejected Orders'}</Text></View>
             <View style={{backgroundColor:'#f4f4f4',padding:20}}><Text>{'Delivered Orders'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text>{'Total Orders'}</Text></View>
        </View>
        <View style={{height:240,fontSize:22,borderColor:'#c4c4cb',borderWidth:1,marginTop:10}}>
             <View style={{backgroundColor:'#f4f4f4',padding:20,width:150}}><Text style={{textAlign:'center'}}>{'23'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text style={{textAlign:'center'}}>{'5'}</Text></View>
             <View style={{backgroundColor:'#f4f4f4',padding:20}}><Text style={{textAlign:'center'}}>{'71'}</Text></View>
             <View style={{backgroundColor:'white',padding:20}}><Text style={{textAlign:'center'}}>{'100'}</Text></View>
        </View>

          </View>

              </View>
          
     
          </Content>
        </Container>
      </SideMenuDrawer>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item :{
    flex: 0.5, //why this doesnt work???
    // width: 150, //using fixed item width instead of flex: 0.5 works
    height: 50,
    padding: 10,
    backgroundColor: '#57b0fc',
    // flexGrow: 1,
    // flexShrink: 0,
  },
  column1 :{
    height: 100,
  },
  column2 :{

  }
});