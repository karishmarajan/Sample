import React, { Component } from 'react';
import { ScrollView,Picker } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import SideMenuDrawer from '../../component/SideMenuDrawer';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import { black } from 'color-name';


export default class OrderTransfer1 extends React.Component {

    render(){
        var left = (
            <Left style={{ flex: 1 }}>
                <Icon style={{ color: Colors.navbarIconColor }} name='ios-menu' />
            </Left>
          );
          var right = (
            <Right style={{ flex: 1 }}>
              <Button onPress={() => Actions.cart()} transparent>
                <Icon style={{ color: Colors.navbarIconColor }} name='ios-chatbubbles' />
              </Button>
              <Button onPress={() => Actions.cart()} transparent>
                <Icon style={{ color: Colors.navbarIconColor }} name='ios-notifications' />
              </Button>
            </Right>
          );
        return(
          <Container>
        <Navbar left={left} right={right} title="Order Transfer" />
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{flex: 1, flexDirection: 'column',backgroundColor:'#f0f0f6'}}>
        <View style={{ backgroundColor:'white',marginTop:40,height:400,width:320,left:20,Right:20,padding:20}}>
        <Text style={{fontSize:14,fontWeight:'bold'}}>Request Order Transfer</Text>
        <Text style={{fontSize:16,marginTop:20,fontFamily:'lucida grande',color:black}}>Requested To</Text>
        <Picker 
        selectedValue="Select a Status"
        style={{ height: 50, width: 300,backgroundColor:Colors.backgroundColor,borderColor:'black',borderWidth:1 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        <Picker.Item label="Cochin Regional Office" value="java" />
        <Picker.Item label="a" value="js" />
        <Picker.Item label="b" value="js" />
        <Picker.Item label="c" value="js" />
      </Picker>
      <Text style={{fontSize:16,marginTop:20,fontFamily:'lucida grande',color:black}}>Reason</Text>
      <View style={{ borderColor:Colors.borderColor,height:150,width:280,Right:20,borderRadius:5,padding:10,borderWidth:1}}>
</View>
<Button style={{height:40,justifyContent: 'center',borderRadius:5,width:280,padding:5,marginTop:20,backgroundColor:'#3a3954'}}>
          <Text uppercase={false} style={{color: '#fdfdfd',fontSize:14,fontFamily:'lucida grande'}}>Request Order Transfer</Text></Button>
        </View>
        </View>
        </ScrollView>
        </Container>
        );
    }


}