import React, { Component } from 'react';
import { ScrollView,Picker } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';

export default class SelfAssign extends React.Component {
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
        <Navbar left={left} right={right} title="Self Assign" titleStyle={{ color: '#57b0fc'}} />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#f0f0f6'}}>
        <View style={{ backgroundColor:'white',marginTop:30,width:320,left:15,Right:15,padding:10,height:160,borderRadius:5}}>
        <View style={{padding:10}}>
        <Button style={{justifyContent:'center',width:120,height:30,backgroundColor:'#165bd6'}}><Text uppercase={false} style={{ fontSize:14}}>Barcode Scan</Text></Button>
        <Text style={{marginTop:15}}>Enter Order Id:</Text>
        <View style={{borderWidth:1,borderColor:Colors.borderColor,height:40,width:280,flexDirection:'row',borderRadius:5,}}>
        <Text style={{color:'#808080',paddingLeft:10,paddingTop:10}}>#12345</Text>
        <Button style={{backgroundColor:'#3a3954',height:30,left:150,marginTop:5}}><Text>ADD</Text></Button>
        </View>
        </View>
        </View>
        <View style={{flexDirection:'row',flex:1,width:300,marginTop:10,paddingLeft:20,justifyContent:'space-evenly'}}>
        <Button style={{backgroundColor:'#f0f0f6',height:30,marginTop:5,borderColor:'blue',borderWidth:1,width:80,justifyContent:'center'}}><Text uppercase={false}  style={{color:'blue'}}>Delete</Text></Button>
        <Button style={{backgroundColor:'#f0f0f6',height:30,marginTop:5,borderColor:'blue',borderWidth:1,width:80,justifyContent:'center'}}><Text uppercase={false} style={{color:'blue'}}>Save</Text></Button>
        <Button style={{backgroundColor:'wh#f0f0f6ite',height:30,marginTop:5,borderColor:'blue',borderWidth:1,width:80,justifyContent:'center'}}><Text uppercase={false} style={{color:'blue'}}>Submit</Text></Button>
            </View>
        </View>
        </ScrollView>
        </SideMenuDrawer>
    );
}


}