import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';


export default class VehicleScan extends React.Component {

render(){
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

    return(
        <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Navbar left={left} right={right} title="Vehicle Scan" titleStyle={{ color: '#57b0fc'}} />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#f0f0f6'}}>
        <View style={{ backgroundColor:'white',marginTop:40,height:200,width:320,left:20,Right:20,borderRadius:10,padding:10}}>
        <Text style={{paddingLeft:10,paddingTop:10,fontSize:18}}>Vehicle Details</Text>
        <Text style={{paddingLeft:10,paddingTop:10,fontSize:14}}>Vehicle Number</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>
          <Text style={{paddingLeft:10,paddingTop:10,fontSize:14}}>Vehicle Type</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',backgroundColor:'#f0f0f6'}}/></View>
          </View>
          <View style={{ backgroundColor:'white',marginTop:25,height:160,width:320,left:20,Right:20,borderRadius:10,padding:10}}>
          <Text style={{paddingLeft:10,paddingTop:10,fontSize:18}}>Departed Time</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',borderWidth:1,borderRadius:5}}/></View>
          <View style={{width:300,padding:5}}><Button style={{borderColor:'#c4c4cb',height:40,backgroundColor:'#3b3954',justifyContent: 'center',borderRadius:5}}>
          <Text uppercase={false} style={{color: '#fdfdfd',fontSize:14}}>Set Departed Time</Text>
          </Button></View>
          </View>
          <View style={{ backgroundColor:'white',marginTop:25,height:160,width:320,left:20,Right:20,borderRadius:10,padding:10}}>
          <Text style={{paddingLeft:10,paddingTop:10,fontSize:18}}>Arrival Time</Text>
          <View style={{height:45,width:300,padding:5}}><Input style={{borderColor:'#c4c4cb',borderWidth:1,borderRadius:5}}/></View>
          <View style={{width:300,padding:5}}><Button style={{borderColor:'#c4c4cb',height:40,backgroundColor:'#3b3954',justifyContent: 'center',borderRadius:5}}>
          <Text uppercase={false} style={{color: '#fdfdfd',fontSize:14}}>Set Arrival Time</Text>
          </Button></View>
          </View>
        </View>
        </ScrollView>
        </SideMenuDrawer>
    );
}

}