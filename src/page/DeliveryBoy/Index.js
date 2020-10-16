import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { ScrollView,Keyboard,StyleSheet } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Text,TextInput } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Colors from '../../constants/Colors';

export default class Index extends Component{
    render(){

return(
<Container style={{backgroundColor:'#41415b', justifyContent:'center'}}>
<ScrollView contentContainerStyle={{flexGrow:1}}>
<Icon name="md-close" style={{position: 'absolute',right: 20,top: 20,bottom: 0,color:'white'}} />
<Text style={{fontSize: 32, justifyContent:'center', width: '100%' ,textDecorationLine:'underline', color: Colors.white,textAlign:'center',marginTop:80,fontWeight:'bold'}}>Epex </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:50}}>Dashboard </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:25}}>Delivery </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:25}}>Pickup </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:25}}>Vehicle Scan </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:25}}>Status Update </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:25}}>Self Assign </Text>
<Text style={{fontSize: 18, justifyContent:'center', width: '100%' , color: Colors.white,textAlign:'center',marginTop:25}}>Order Transfer </Text>
<Button onPress={() => this.logout()} style={{backgroundColor:'#3a3954', marginTop: 80,width:330,justifyContent: 'center',height:60,borderRadius:5,left:15,Right:10}}>
                <Text uppercase={false} style={{fontSize:18,color: '#fdfdfd', textAlign: 'center',alignItems: 'center',fontSize:18,fontFamily:'lucida grande'}}>Log out</Text>
              </Button>
</ScrollView>
</Container>

);

    }
}