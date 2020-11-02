import React, { Component } from 'react';
import { ScrollView,Picker } from 'react-native';
import { Container, Content, View, Button, Left, Right,Icon,Text, Input,TextInput} from 'native-base';

import Navbar from '../../component/Navbar';
import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import { black } from 'color-name';
import CustomDropdown from '../../component/CustomDropdown';
import CustomInput from '../../component/CustomInput';
import CustomButton from '../../component/CustomButton';

const myArray1=[{name:"Cochin Regional Office" , value:"Cochin Regional Office"},{name:"a" , value:"a"},{name:"b" , value:"b"}];


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

 {/*////////////////////// Request Order Transfer Details //////////////////////////////////////////////// */}

        <Text style={{fontSize:14,fontWeight:'bold'}}>Request Order Transfer</Text>
        <Text style={{fontSize:16,marginTop:20,fontFamily:'lucida grande',color:black}}>Requested To</Text>

        <CustomDropdown data={myArray1} height={35} backgroundColor={Colors.textBackgroundColor} fontSize={16} borderWidth={.5} borderColor={Colors.borderColor}/>
   
      <Text style={{fontSize:16,marginTop:20,fontFamily:'lucida grande',color:black}}>Reason</Text>

      <CustomInput borderRadius={5} borderColor={Colors.borderColor} borderWidth={1} backgroundColor={Colors.white} height={150} />
      <CustomButton title={'Request Order Transfer'} fontSize={14}/>
        </View>
        </View>
        </ScrollView>
        </Container>
        );
    }


}